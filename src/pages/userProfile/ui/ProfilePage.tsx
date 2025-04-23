import React from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserProfile } from "../model/useUserProfile";
import { AvatarDropzone } from "../model/AvatarDropzone";

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();

  const {
    user,
    loading,
    error,
    isEditable,
    hasChanges,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    departmentId,
    setDepartmentId,
    positionId,
    setPositionId,
    departments,
    positions,
    handleUpdate,
    handleAvatarUpload,
    handleAvatarRemove,
  } = useUserProfile();

  const tabRoutes = [
    `/users/${userId}`,
    `/users/${userId}/skills`,
    `/users/${userId}/languages`,
  ];
  const currentTab = tabRoutes.findIndex((path) => location.pathname === path);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(tabRoutes[newValue]);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) return <Box>{t("Error fetching user")}</Box>;

  const joinedDate = new Date(parseInt(user.created_at, 10)).toDateString();
  const canUpdate = isEditable && hasChanges;
  const displayDepartment = isEditable
    ? departmentId
    : user.department?.id || "";
  const displayPosition = isEditable ? positionId : user.position?.id || "";

  return (
    <Box sx={{ px: 4, py: 3, mx: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Typography
          variant="body2"
          component={Link}
          to="/users"
          sx={{ textDecoration: "none", color: "text.primary" }}
        >
          {t("Employees")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <ChevronRight />
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          {user.profile.first_name} {user.profile.last_name}
        </Typography>
        {currentTab > 0 && (
          <>
            <Typography variant="body2" color="text.secondary">
              <ChevronRight />
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {currentTab === 1 ? t("Skills") : t("Languages")}
            </Typography>
          </>
        )}
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label={t("Profile")} />
          <Tab label={t("Skills")} />
          <Tab label={t("Languages")} />
        </Tabs>
      </Box>

      {currentTab === 0 ? (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <AvatarDropzone
              avatarUrl={user.profile.avatar}
              firstName={user.profile.first_name}
              isEditable={isEditable}
              onUpload={handleAvatarUpload}
              onRemove={handleAvatarRemove}
            />
          </Box>

          <Typography
            variant="h5"
            sx={{ mt: 2, textAlign: "center", color: "text.primary" }}
          >
            {user.profile.first_name} {user.profile.last_name}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            {user.email}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1 }}
            align="center"
          >
            {t("A member since")} {joinedDate}
          </Typography>

          <Box sx={{ maxWidth: 900, mx: "auto", mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("First Name")}
                  variant="outlined"
                  fullWidth
                  disabled={!isEditable}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("Last Name")}
                  variant="outlined"
                  fullWidth
                  disabled={!isEditable}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {isEditable ? (
                  <FormControl fullWidth>
                    <InputLabel>{t("Department")}</InputLabel>
                    <Select
                      label={t("Department")}
                      value={displayDepartment}
                      onChange={(e) =>
                        setDepartmentId(e.target.value as string)
                      }
                    >
                      <MenuItem value="" disabled hidden>
                        {t("Select Department")}
                      </MenuItem>
                      {departments.map((dept) => (
                        <MenuItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    label={t("Department")}
                    variant="outlined"
                    fullWidth
                    disabled
                    value={user.department?.name || "—"}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {isEditable ? (
                  <FormControl fullWidth>
                    <InputLabel>{t("Position")}</InputLabel>
                    <Select
                      label={t("Position")}
                      value={displayPosition}
                      onChange={(e) => setPositionId(e.target.value as string)}
                    >
                      <MenuItem value="" disabled hidden>
                        {t("Select Position")}
                      </MenuItem>
                      {positions.map((pos) => (
                        <MenuItem key={pos.id} value={pos.id}>
                          {pos.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    label={t("Position")}
                    variant="outlined"
                    fullWidth
                    disabled
                    value={user.position?.name || "—"}
                  />
                )}
              </Grid>
            </Grid>

            {isEditable && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button
                  variant="contained"
                  disabled={!canUpdate}
                  onClick={handleUpdate}
                  sx={{ borderRadius: "20px", px: 4 }}
                >
                  {t("Update")}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Outlet />
      )}
    </Box>
  );
};
