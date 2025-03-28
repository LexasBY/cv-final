import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { User } from "../../../shared/api/graphql/generated";
import { GET_USERS } from "../../../shared/api/user/user.api";

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

  const users = useMemo(() => data?.users || [], [data]);

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
