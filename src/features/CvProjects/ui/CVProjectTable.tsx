import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  TableSortLabel,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CvProject } from "../../../shared/api/graphql/generated";
import { useTranslation } from "react-i18next";

interface ProjectsTableProps {
  projects: CvProject[];
  sortColumn: "name" | "domain" | "start_date" | "end_date";
  sortDirection: "asc" | "desc";
  onSort: (column: "name" | "domain" | "start_date" | "end_date") => void;
  onEditClick?: (project: CvProject) => void;
  onDeleteClick?: (project: CvProject) => void;
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  sortColumn,
  sortDirection,
  onSort,
  onEditClick,
  onDeleteClick,
}) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<CvProject | null>(
    null
  );

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    project: CvProject
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const createSortHandler =
    (column: "name" | "domain" | "start_date" | "end_date") => () => {
      onSort(column);
    };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sortDirection={sortColumn === "name" ? sortDirection : false}
            >
              <TableSortLabel
                active={sortColumn === "name"}
                direction={sortColumn === "name" ? sortDirection : "asc"}
                onClick={createSortHandler("name")}
              >
                {t("Name")}
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={sortColumn === "domain" ? sortDirection : false}
            >
              <TableSortLabel
                active={sortColumn === "domain"}
                direction={sortColumn === "domain" ? sortDirection : "asc"}
                onClick={createSortHandler("domain")}
              >
                {t("Domain")}
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={
                sortColumn === "start_date" ? sortDirection : false
              }
            >
              <TableSortLabel
                active={sortColumn === "start_date"}
                direction={sortColumn === "start_date" ? sortDirection : "asc"}
                onClick={createSortHandler("start_date")}
              >
                {t("Start Date")}
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={sortColumn === "end_date" ? sortDirection : false}
            >
              <TableSortLabel
                active={sortColumn === "end_date"}
                direction={sortColumn === "end_date" ? sortDirection : "asc"}
                onClick={createSortHandler("end_date")}
              >
                {t("End Date")}
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow sx={{ "& td": { borderBottom: "none" } }}>
              <TableCell colSpan={5} align="center">
                <Typography variant="h6" sx={{ my: 3 }}>
                  {t("No results found")}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project) => (
              <React.Fragment key={project.id}>
                <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                  <TableCell>
                    <Typography fontWeight="bold">{project.name}</Typography>
                  </TableCell>
                  <TableCell>{project.domain}</TableCell>
                  <TableCell>{formatDate(project.start_date)}</TableCell>
                  <TableCell>{formatDate(project.end_date)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, project)}
                      size="small"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ whiteSpace: "pre-wrap" }}
                    >
                      {project.description}
                    </Typography>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            if (selectedProject) {
              onEditClick?.({
                ...selectedProject,
                project: selectedProject.project ?? {
                  id: String(selectedProject.id),
                  __typename: "Project",
                },
              });
            }
            handleMenuClose();
          }}
        >
          {t("Update project")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedProject) onDeleteClick?.(selectedProject);
            handleMenuClose();
          }}
        >
          {t("Remove project")}
        </MenuItem>
      </Menu>
    </Box>
  );
};
