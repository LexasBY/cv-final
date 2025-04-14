import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { SearchInput } from "../../../shared/ui/SearchInput";
import { useCvContext } from "../../../pages/cv/model/useCvContext";
import { ProjectsTable } from "./CVProjectTable";
import { Cv, CvProject } from "../../../shared/api/graphql/generated";
import { AddProjectModal } from "../ui/AddProjectModal";
import { GET_PROJECTS } from "../../../shared/api/projects/projects.api";
import { useAddCvProject } from "../model/useAddCvProject";
import { useDeleteCvProject } from "../model/useDeleteCvProject";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

export const CVProjectsPage: React.FC = () => {
  const { cv, refetch, setCv } = useCvContext();

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

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<CvProject | null>(null);
  const [deletingProject, setDeletingProject] = useState<CvProject | null>(
    null
  );

  const {
    data: projectsData,
    loading: loadingProjects,
    error: errorProjects,
  } = useQuery(GET_PROJECTS);

  const { addProject } = useAddCvProject();
  const { deleteProject } = useDeleteCvProject();

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

    return [...filtered].sort((a, b) => {
      const aValue = a[sortColumn] || "";
      const bValue = b[sortColumn] || "";

      const aStr = typeof aValue === "string" ? aValue : String(aValue ?? "");
      const bStr = typeof bValue === "string" ? bValue : String(bValue ?? "");

      if (aStr < bStr) return sortDirection === "asc" ? -1 : 1;
      if (aStr > bStr) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [searchTerm, cv?.projects, sortColumn, sortDirection]);

  const handleAddSubmit = async (data: {
    projectId: string;
    start_date: string;
    end_date?: string;
    roles: string[];
    responsibilities: string[];
  }) => {
    try {
      if (!cv?.id) throw new Error("Missing CV ID");

      await addProject({
        variables: {
          project: {
            cvId: cv.id,
            projectId: data.projectId,
            start_date: data.start_date,
            end_date: data.end_date,
            roles: data.roles,
            responsibilities: data.responsibilities,
          },
        },
      });

      setIsAddOpen(false);
      refetch();
      setSnackbar({
        open: true,
        message: "Project successfully added!",
        severity: "success",
      });
    } catch (e) {
      console.error("Add project error:", e);
      setSnackbar({
        open: true,
        message: "Failed to add project",
        severity: "error",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!cv?.id || !deletingProject) throw new Error("Missing data");

      const projectId = deletingProject.project?.id || deletingProject.id;
      if (!projectId) throw new Error("Missing project ID");

      const { data } = await deleteProject({
        variables: {
          project: {
            cvId: cv.id,
            projectId,
          },
        },
      });

      setCv((prev: Cv | null) => {
        if (!prev) return prev;
        return {
          ...prev,
          projects:
            data?.removeCvProject?.projects?.map((p) => ({
              ...p,
              project: p.project ?? { id: p.id, __typename: "Project" },
            })) || [],
        };
      });

      setDeletingProject(null);
      setSnackbar({
        open: true,
        message: "Project removed successfully",
        severity: "success",
      });
    } catch (e) {
      console.error("Delete project error:", e);
      setSnackbar({
        open: true,
        message: "Failed to remove project",
        severity: "error",
      });
    }
  };

  if (loadingProjects)
    return (
      <Box sx={{ p: 3 }}>
        <CircularProgress />
      </Box>
    );
  if (errorProjects)
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Failed to load projects</Typography>
      </Box>
    );

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
            onClick={() => setIsAddOpen(true)}
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
          onEditClick={(project) => setEditingProject(project)}
          onDeleteClick={(project) => setDeletingProject(project)}
        />
      </Box>

      <AddProjectModal
        open={isAddOpen || !!editingProject}
        onClose={() => {
          setIsAddOpen(false);
          setEditingProject(null);
        }}
        onSubmit={handleAddSubmit}
        projects={projectsData?.projects || []}
        defaultValues={
          editingProject
            ? {
                projectId: editingProject.project.id,
                start_date: editingProject.start_date,
                end_date: editingProject.end_date ?? undefined,
                responsibilities: editingProject.responsibilities,
                roles: editingProject.roles,
              }
            : undefined
        }
      />

      <ConfirmDeleteModal
        open={!!deletingProject}
        onClose={() => setDeletingProject(null)}
        onConfirm={handleDeleteConfirm}
        title="Remove Project"
        description={`Are you sure you want to remove project "${deletingProject?.name}"?`}
      />

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
