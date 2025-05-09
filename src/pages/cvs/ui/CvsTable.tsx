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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: "70vh", maxWidth: "1330px" }}
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
                {t("Name")}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortColumn === "education"}
                direction={sortDirection}
                onClick={() => onSort("education")}
              >
                {t("Education")}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortColumn === "employee"}
                direction={sortDirection}
                onClick={() => onSort("employee")}
              >
                {t("Employee")}
              </TableSortLabel>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {cvs.map((cv) => (
            <React.Fragment key={cv.id}>
              <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                <TableCell sx={{ fontWeight: "bold" }}>{cv.name}</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {cv.education || "—"}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
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
