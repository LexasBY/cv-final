import React, { useState } from "react";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUsers } from "./model/useUsers";
import { UsersTable } from "./ui/UsersTable";
import { SortColumn } from "./model/useUsers";
import { User } from "../../shared/api/graphql/generated";
import { SearchInput } from "../../shared/ui/SearchInput";
import { useTranslation } from "react-i18next";
import { UpdateUserModal } from "../../shared/ui/Modals/UpdateUserModal";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_DEPARTMENTS,
  GET_POSITIONS,
  UPDATE_PROFILE,
  UPDATE_USER,
} from "../../shared/api/user/user.api";

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
    refetchUsers,
  } = useUsers();

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessageKey, setSnackbarMessageKey] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const currentUserId = localStorage.getItem("userId");

  const { data: departmentsData } = useQuery(GET_DEPARTMENTS);
  const { data: positionsData } = useQuery(GET_POSITIONS);

  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [updateUser] = useMutation(UPDATE_USER);

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
  };

  const handleUpdateUser = async (values: {
    firstName: string;
    lastName: string;
    departmentId: string;
    positionId: string;
  }) => {
    if (!selectedUser) return;

    const { id, profile, department, position } = selectedUser;

    try {
      if (
        values.firstName !== profile.first_name ||
        values.lastName !== profile.last_name
      ) {
        await updateProfile({
          variables: {
            profile: {
              userId: id,
              first_name: values.firstName,
              last_name: values.lastName,
            },
          },
        });
      }

      if (
        values.departmentId !== department?.id ||
        values.positionId !== position?.id
      ) {
        await updateUser({
          variables: {
            user: {
              userId: id,
              departmentId: values.departmentId || null,
              positionId: values.positionId || null,
            },
          },
        });
      }

      await refetchUsers();
      handleMenuClose();
      setIsUpdateModalOpen(false);

      setSnackbarMessageKey("User updated successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Update failed", err);
      setSnackbarMessageKey("Failed to update user");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  if (loading) return <Box>{t("Loading")}...</Box>;
  if (error) return <Box>{t("Error fetching users")}</Box>;

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
        {selectedUser && [
          <MenuItem
            key="profile"
            onClick={() => {
              navigate(`/users/${selectedUser.id}`);
              handleMenuClose();
            }}
          >
            {t("Profile")}
          </MenuItem>,

          selectedUser.id === currentUserId && (
            <MenuItem
              key="update"
              onClick={() => {
                setIsUpdateModalOpen(true);
                handleMenuClose();
              }}
            >
              {t("Update User")}
            </MenuItem>
          ),
        ]}
      </Menu>

      {selectedUser && isUpdateModalOpen && (
        <UpdateUserModal
          open={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          user={selectedUser}
          onSubmit={handleUpdateUser}
          departments={departmentsData?.departments || []}
          positions={positionsData?.positions || []}
        />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {t(snackbarMessageKey)}
        </Alert>
      </Snackbar>
    </Box>
  );
};
