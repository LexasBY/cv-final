import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import {
  GET_USER,
  GET_DEPARTMENTS,
  GET_POSITIONS,
  UPDATE_PROFILE,
  UPDATE_USER,
  UPLOAD_AVATAR,
  DELETE_AVATAR,
} from "../../../shared/api/user/user.api";

import { Department, Position } from "../../../shared/api/graphql/generated";
import { fileToBase64 } from "../../../shared/lib/fileToBase64";

export const useUserProfile = () => {
  const { userId } = useParams();
  const currentUserId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isSelf = userId === currentUserId;

  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch,
  } = useQuery(GET_USER, {
    variables: { userId },
    skip: !userId,
  });

  const { data: departmentsData, loading: deptLoading } = useQuery(
    GET_DEPARTMENTS,
    {
      skip: !isSelf,
    }
  );
  const { data: positionsData, loading: posLoading } = useQuery(GET_POSITIONS, {
    skip: !isSelf,
  });

  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [updateUser] = useMutation(UPDATE_USER);
  const [uploadAvatar] = useMutation(UPLOAD_AVATAR);
  const [deleteAvatar] = useMutation(DELETE_AVATAR);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departmentId, setDepartmentId] = useState<string | null>(null);
  const [positionId, setPositionId] = useState<string | null>(null);

  const [originalFirstName, setOriginalFirstName] = useState("");
  const [originalLastName, setOriginalLastName] = useState("");
  const [originalDepartmentId, setOriginalDepartmentId] = useState<
    string | null
  >(null);
  const [originalPositionId, setOriginalPositionId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (userData?.user) {
      const u = userData.user;
      setFirstName(u.profile.first_name ?? "");
      setLastName(u.profile.last_name ?? "");
      setDepartmentId(u.department?.id ?? null);
      setPositionId(u.position?.id ?? null);

      setOriginalFirstName(u.profile.first_name ?? "");
      setOriginalLastName(u.profile.last_name ?? "");
      setOriginalDepartmentId(u.department?.id ?? null);
      setOriginalPositionId(u.position?.id ?? null);
    }
  }, [userData]);

  const isEditable = useMemo(
    () => !!userId && (isAdmin || isSelf),
    [userId, isAdmin, isSelf]
  );

  const hasChanges = useMemo(() => {
    return (
      firstName !== originalFirstName ||
      lastName !== originalLastName ||
      departmentId !== originalDepartmentId ||
      positionId !== originalPositionId
    );
  }, [
    firstName,
    originalFirstName,
    lastName,
    originalLastName,
    departmentId,
    originalDepartmentId,
    positionId,
    originalPositionId,
  ]);

  const handleUpdate = async () => {
    if (!userData?.user) return;

    const userId = userData.user.id;

    if (firstName !== originalFirstName || lastName !== originalLastName) {
      await updateProfile({
        variables: {
          profile: {
            userId,
            first_name: firstName,
            last_name: lastName,
          },
        },
      });
    }

    if (
      departmentId !== originalDepartmentId ||
      positionId !== originalPositionId
    ) {
      await updateUser({
        variables: {
          user: {
            userId,
            departmentId,
            positionId,
          },
        },
      });
    }

    await refetch();
  };

  const handleAvatarUpload = async (file: File) => {
    if (!userData?.user) return;

    const base64 = await fileToBase64(file);
    await uploadAvatar({
      variables: {
        avatar: {
          userId: userData.user.id,
          base64,
          size: file.size,
          type: file.type,
        },
      },
    });

    await refetch();
  };

  const handleAvatarRemove = async () => {
    if (!userData?.user) return;

    await deleteAvatar({
      variables: {
        avatar: {
          userId: userData.user.id,
        },
      },
    });

    await refetch();
  };

  const user = userData?.user;
  const departments: Department[] = isSelf
    ? departmentsData?.departments || []
    : [];
  const positions: Position[] = isSelf ? positionsData?.positions || [] : [];

  const loading = userLoading || (isSelf && (deptLoading || posLoading));
  const error = userError;

  return {
    user,
    loading,
    error,
    isEditable,
    hasChanges,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    departmentId,
    setDepartmentId,
    positionId,
    setPositionId,
    departments,
    positions,
    handleUpdate,
    handleAvatarUpload,
    handleAvatarRemove,
  };
};
