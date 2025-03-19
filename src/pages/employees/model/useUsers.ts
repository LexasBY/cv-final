import { useState, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { User } from "../../../shared/api/types";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      profile {
        first_name
        last_name
        avatar
      }
      department {
        name
      }
      position {
        name
      }
    }
  }
`;

// Определяем тип сортировки
export type SortColumn =
  | "first_name"
  | "last_name"
  | "email"
  | "department"
  | "position";

export const useUsers = () => {
  const { data, loading, error } = useQuery<{ users: User[] }>(GET_USERS);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<SortColumn>("email");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Мемоизируем массив пользователей, чтобы не создавать новую ссылку при каждом рендере
  const users = useMemo(() => data?.users || [], [data]);

  // Фильтрация по имени и email
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.profile.first_name ?? ""} ${
        user.profile.last_name ?? ""
      }`;
      return (fullName + " " + user.email)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [users, searchTerm]);

  // Сортировка пользователей
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      let valA = "";
      let valB = "";

      switch (sortColumn) {
        case "first_name":
          valA = a.profile.first_name ?? "";
          valB = b.profile.first_name ?? "";
          break;
        case "last_name":
          valA = a.profile.last_name ?? "";
          valB = b.profile.last_name ?? "";
          break;
        case "email":
          valA = a.email;
          valB = b.email;
          break;
        case "department":
          valA = a.department?.name || "";
          valB = b.department?.name || "";
          break;
        case "position":
          valA = a.position?.name || "";
          valB = b.position?.name || "";
          break;
        default:
          return 0;
      }
      return sortDirection === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }, [filteredUsers, sortColumn, sortDirection]);

  return {
    loading,
    error,
    sortedUsers,
    searchTerm,
    setSearchTerm,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
  };
};
