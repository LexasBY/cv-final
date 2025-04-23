import React, { useState } from "react";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUsers } from "./model/useUsers";
import { UsersTable } from "./ui/UsersTable";
import { SortColumn } from "./model/useUsers";
import { User } from "../../shared/api/graphql/generated";
import { SearchInput } from "../../shared/ui/SearchInput";
import { useTranslation } from "react-i18next";

export const UsersPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    loading,
    error,
    sortedUsers,
    searchTerm,
    setSearchTerm,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
  } = useUsers();

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (loading) return <Box>{t("Loading")}...</Box>;
  if (error) return <Box>{t("Error fetching users")}</Box>;

  const handleSort = (column: SortColumn) => {
    setSortDirection((prev) =>
      sortColumn === column ? (prev === "asc" ? "desc" : "asc") : "asc"
    );
    setSortColumn(column);
  };

  const handleUserClick = (user: User) => {
    navigate(`/users/${user.id}`);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    user: User
  ) => {
    setSelectedUser(user);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        {t("Employees")}
      </Typography>

      <Box sx={{ mb: 2, maxWidth: 400 }}>
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
      </Box>

      <UsersTable
        users={sortedUsers}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        onUserClick={handleUserClick}
        onMenuOpen={handleMenuOpen}
      />

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        {selectedUser && (
          <>
            <MenuItem
              onClick={() => {
                navigate(`/users/${selectedUser.id}`);
                handleMenuClose();
              }}
            >
              {t("Profile")}
            </MenuItem>
            <MenuItem>{t("Update User")}</MenuItem>
            <MenuItem>{t("Delete User")}</MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};
