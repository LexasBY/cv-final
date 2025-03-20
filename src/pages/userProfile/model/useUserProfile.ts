import { useQuery, gql, useMutation } from "@apollo/client";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Department, Position } from "../../../shared/api/graphql/generated";

const GET_USER = gql`
  query getUser($userId: ID!) {
    user(userId: $userId) {
      id
      email
      created_at
      profile {
        id
        first_name
        last_name
        avatar
      }
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`;

const GET_DEPARTMENTS = gql`
  query getDepartments {
    departments {
      id
      name
    }
  }
`;

const GET_POSITIONS = gql`
  query getPositions {
    positions {
      id
      name
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation updateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      first_name
      last_name
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`;

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

  // Выполняем запросы департаментов и позиций только для своего профиля
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

  const isEditable = useMemo(() => {
    if (!userId) return false;
    return isAdmin || isSelf;
  }, [userId, isAdmin, isSelf]);

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
    const profileId = userData.user.profile.id;

    if (firstName !== originalFirstName || lastName !== originalLastName) {
      await updateProfile({
        variables: {
          profile: {
            id: profileId,
            firstName,
            lastName,
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
            id: userData.user.id,
            departmentId,
            positionId,
          },
        },
      });
    }

    refetch();
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
  };
};
