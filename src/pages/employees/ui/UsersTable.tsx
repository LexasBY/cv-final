import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Avatar,
  IconButton,
  Paper,
  useTheme,
} from "@mui/material";
import { MoreVert, ChevronRight } from "@mui/icons-material";
import { SortColumn } from "../model/useUsers";
import { User } from "../../../shared/api/graphql/generated";
import { useTranslation } from "react-i18next";

export type UsersTableProps = {
  users: User[];
  sortColumn: SortColumn;
  sortDirection: "asc" | "desc";
  onSort: (column: SortColumn) => void;
  onUserClick: (user: User) => void;
  onMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, user: User) => void;
};

export const UsersTable = ({
  users,
  sortColumn,
  sortDirection,
  onSort,
  onUserClick,
  onMenuOpen,
}: UsersTableProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "80vh" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <TableSortLabel
                active={sortColumn === "first_name"}
                direction={sortDirection}
                onClick={() => onSort("first_name")}
              >
                {t("First Name")}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortColumn === "last_name"}
                direction={sortDirection}
                onClick={() => onSort("last_name")}
              >
                {t("Last Name")}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortColumn === "email"}
                direction={sortDirection}
                onClick={() => onSort("email")}
              >
                {t("Email")}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortColumn === "department"}
                direction={sortDirection}
                onClick={() => onSort("department")}
              >
                {t("Department")}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortColumn === "position"}
                direction={sortDirection}
                onClick={() => onSort("position")}
              >
                {t("Position")}
              </TableSortLabel>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            const isCurrentUser = user.id === localStorage.getItem("userId");
            const userInitials =
              user.profile.first_name?.charAt(0).toUpperCase() ||
              user.email.charAt(0).toUpperCase();

            return (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar
                    src={user.profile.avatar || undefined}
                    sx={{
                      bgcolor: user.profile.avatar
                        ? "transparent"
                        : theme.palette.grey[500],
                      width: theme.spacing(4),
                      height: theme.spacing(4),
                    }}
                  >
                    {!user.profile.avatar && userInitials}
                  </Avatar>
                </TableCell>
                <TableCell>{user.profile.first_name ?? "—"}</TableCell>
                <TableCell>{user.profile.last_name ?? "—"}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.department?.name ?? "—"}</TableCell>
                <TableCell>{user.position?.name ?? "—"}</TableCell>
                <TableCell>
                  {isCurrentUser ? (
                    <IconButton onClick={(e) => onMenuOpen(e, user)}>
                      <MoreVert />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => onUserClick(user)}>
                      <ChevronRight />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
