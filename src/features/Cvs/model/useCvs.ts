import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { Cv } from "../../../shared/api/graphql/generated";
import { GET_ALL_CVS } from "../../../shared/api/cvs/cvs.api";

export type SortColumn = "name" | "education" | "employee";

export const useCvs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<SortColumn>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const { data, loading, error } = useQuery<{ cvs: Cv[] }>(GET_ALL_CVS);

  const sortedCvs = useMemo(() => {
    if (!data?.cvs) return [];

    return [...data.cvs]
      .filter(
        (cv) =>
          cv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cv.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        let aVal = "";
        let bVal = "";

        if (sortColumn === "name") {
          aVal = a.name;
          bVal = b.name;
        } else if (sortColumn === "education") {
          aVal = a.description;
          bVal = b.description;
        } else if (sortColumn === "employee") {
          aVal = a.user?.profile?.full_name || a.user?.email || "";
          bVal = b.user?.profile?.full_name || b.user?.email || "";
        }

        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
  }, [data, searchTerm, sortColumn, sortDirection]);

  return {
    loading,
    error,
    sortedCvs,
    searchTerm,
    setSearchTerm,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
  };
};
