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

interface ProjectsTableProps {
  projects: CvProject[];
  sortColumn: "name" | "domain" | "start_date" | "end_date";
  sortDirection: "asc" | "desc";
  onSort: (column: "name" | "domain" | "start_date" | "end_date") => void;
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  sortColumn,
  sortDirection,
  onSort,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    projectId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedProjectId(projectId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProjectId(null);
  };

  const createSortHandler =
    (column: "name" | "domain" | "start_date" | "end_date") => () => {
      onSort(column);
    };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB"); // format: DD/MM/YYYY
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
                Name
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
                Domain
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
                Start Date
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
                End Date
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
                  No results found
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
                      onClick={(e) => handleMenuOpen(e, project.id)}
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
            console.log("Update project", selectedProjectId);
            handleMenuClose();
          }}
        >
          Update project
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log("Remove project", selectedProjectId);
            handleMenuClose();
          }}
        >
          Remove project
        </MenuItem>
      </Menu>
    </Box>
  );
};
