import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Cv } from "../../../shared/api/graphql/generated";

type SortColumn = "name" | "education" | "employee";

type CvsTableProps = {
  cvs: Cv[];
  sortColumn: SortColumn;
  sortDirection: "asc" | "desc";
  onSort: (column: SortColumn) => void;
  onMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, cv: Cv) => void;
};

export const CvsTable: React.FC<CvsTableProps> = ({
  cvs,
  sortColumn,
  sortDirection,
  onSort,
  onMenuOpen,
}) => {
  return (
    <TableContainer
      sx={{ maxHeight: "70vh", maxWidth: "1200px" }}
      component={Paper}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortColumn === "name"}
                direction={sortDirection}
                onClick={() => onSort("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortColumn === "education"}
                direction={sortDirection}
                onClick={() => onSort("education")}
              >
                Education
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortColumn === "employee"}
                direction={sortDirection}
                onClick={() => onSort("employee")}
              >
                Employee
              </TableSortLabel>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {cvs.map((cv) => (
            <React.Fragment key={cv.id}>
              <TableRow>
                <TableCell>{cv.name}</TableCell>
                <TableCell>{cv.education || "—"}</TableCell>
                <TableCell>
                  {cv.user?.profile?.full_name || cv.user?.email || "—"}
                </TableCell>
                <TableCell align="right" sx={{ width: "15%" }}>
                  <IconButton onClick={(e) => onMenuOpen(e, cv)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
                  >
                    {cv.description}
                  </Typography>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
