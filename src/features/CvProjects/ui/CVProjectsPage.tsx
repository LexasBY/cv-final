import React, { useMemo, useState } from "react";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SearchInput } from "../../../shared/ui/SearchInput";
import { useCvContext } from "../../../pages/cv/model/useCvContext";
import { ProjectsTable } from "./CVProjectTable";
import { CvProject } from "../../../shared/api/graphql/generated";

export const CVProjectsPage: React.FC = () => {
  const { cv } = useCvContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<
    "name" | "domain" | "start_date" | "end_date"
  >("end_date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleSort = (
    column: "name" | "domain" | "start_date" | "end_date"
  ) => {
    setSortDirection((prev) =>
      sortColumn === column ? (prev === "asc" ? "desc" : "asc") : "asc"
    );
    setSortColumn(column);
  };

  const filteredProjects = useMemo(() => {
    if (!cv?.projects) return [];

    const filtered = cv.projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.internal_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filtered].sort((a: CvProject, b: CvProject) => {
      const aValue = a[sortColumn] || "";
      const bValue = b[sortColumn] || "";

      const aStr = typeof aValue === "string" ? aValue : String(aValue ?? "");
      const bStr = typeof bValue === "string" ? bValue : String(bValue ?? "");

      if (aStr < bStr) return sortDirection === "asc" ? -1 : 1;
      if (aStr > bStr) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [searchTerm, cv?.projects, sortColumn, sortDirection]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
          </Box>
          <Button
            onClick={() => {}}
            sx={{
              color: "error.main",
              textTransform: "uppercase",
              fontWeight: "bold",
              borderRadius: "50px",
              px: 4,
              py: 1.1,
              minWidth: 250,
              transition: "background-color 0.2s",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.05)",
              },
            }}
            startIcon={<AddIcon />}
          >
            Add Project
          </Button>
        </Box>

        <ProjectsTable
          projects={filteredProjects}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </Box>

      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
