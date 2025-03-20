// userProfile/model/useUserProfile.ts

import { useQuery, gql, useMutation } from "@apollo/client";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Department, Position } from "../../../shared/api/types";

// Запрос пользователя
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

// Запрос списков департаментов и позиций
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

// Мутации обновления
const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $profileId: ID!
    $firstName: String!
    $lastName: String!
  ) {
    updateProfile(
      profileId: $profileId
      first_name: $firstName
      last_name: $lastName
    ) {
      id
      first_name
      last_name
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $departmentId: ID, $positionId: ID) {
    updateUser(
      userId: $id
      departmentId: $departmentId
      positionId: $positionId
    ) {
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
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Условная проверка

  // Запрос данных о пользователе
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch,
  } = useQuery(GET_USER, {
    variables: { userId },
    skip: !userId,
  });

  // Запрос департаментов и позиций
  const { data: departmentsData, loading: deptLoading } =
    useQuery(GET_DEPARTMENTS);
  const { data: positionsData, loading: posLoading } = useQuery(GET_POSITIONS);

  // Мутации
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [updateUser] = useMutation(UPDATE_USER);

  // Локальные стейты для полей формы
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departmentId, setDepartmentId] = useState<string | null>(null);
  const [positionId, setPositionId] = useState<string | null>(null);

  // "Оригинальные" значения (чтобы отслеживать изменения)
  const [originalFirstName, setOriginalFirstName] = useState("");
  const [originalLastName, setOriginalLastName] = useState("");
  const [originalDepartmentId, setOriginalDepartmentId] = useState<
    string | null
  >(null);
  const [originalPositionId, setOriginalPositionId] = useState<string | null>(
    null
  );

  // Когда данные о пользователе загрузились – заполняем поля
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

  // Можно ли редактировать? (либо свой профиль, либо админ)
  const isEditable = useMemo(() => {
    if (!userId) return false;
    return isAdmin || userId === currentUserId;
  }, [userId, currentUserId, isAdmin]);

  // Проверяем, есть ли изменения
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

  // Обработчик обновления
  const handleUpdate = async () => {
    if (!userData?.user) return;
    const profileId = userData.user.profile.id;

    // Обновляем профиль (если изменилось имя/фамилия)
    if (firstName !== originalFirstName || lastName !== originalLastName) {
      await updateProfile({
        variables: {
          profileId,
          firstName,
          lastName,
        },
      });
    }

    // Обновляем юзера (департамент/позиция)
    if (
      departmentId !== originalDepartmentId ||
      positionId !== originalPositionId
    ) {
      await updateUser({
        variables: {
          id: userData.user.id,
          departmentId,
          positionId,
        },
      });
    }

    // Можно вызвать refetch() или обновить локально стейт
    refetch();
  };

  // Итоговые данные
  const user = userData?.user;
  const departments: Department[] = departmentsData?.departments || [];
  const positions: Position[] = positionsData?.positions || [];

  // Общий флаг загрузки и ошибка
  const loading = userLoading || deptLoading || posLoading;
  const error = userError; // при желании можно объединять ошибки

  return {
    user,
    loading,
    error,
    isEditable,
    hasChanges,

    // поля формы
    firstName,
    setFirstName,
    lastName,
    setLastName,
    departmentId,
    setDepartmentId,
    positionId,
    setPositionId,

    // списки
    departments,
    positions,

    // операции
    handleUpdate,
  };
};
