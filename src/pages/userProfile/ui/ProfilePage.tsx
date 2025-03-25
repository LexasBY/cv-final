import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Tab,
  Tabs,
  CircularProgress,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";

import { useUserProfile } from "../model/useUserProfile";
import { AvatarDropzone } from "../model/AvatarDropzone";
import { SkillsPage } from "../../../features/Skills/ui/SkillsPage";
export const ProfilePage: React.FC = () => {
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

  const [tabIndex, setTabIndex] = useState(0);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) return <Box>Error fetching user</Box>;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const joinedDate = new Date(parseInt(user.created_at, 10)).toDateString();
  const canUpdate = isEditable && hasChanges;
  const displayDepartment = isEditable
    ? departmentId
    : user.department?.id || "";
  const displayPosition = isEditable ? positionId : user.position?.id || "";

  return (
    <Box sx={{ px: 4, py: 3, mx: "auto" }}>
      {/* Хлебные крошки */}
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Typography
          variant="body2"
          component={Link}
          to="/users"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          Employees
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <ChevronRight />
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {user.profile.first_name} {user.profile.last_name}
        </Typography>
        {tabIndex !== 0 && (
          <>
            <Typography variant="body2" color="text.secondary">
              <ChevronRight />
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {tabIndex === 1 ? "Skills" : "Languages"}
            </Typography>
          </>
        )}
      </Box>

      {/* Табы */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="PROFILE" />
          <Tab label="SKILLS" />
          <Tab label="LANGUAGES" />
        </Tabs>
      </Box>

      {tabIndex === 0 && (
        <Box>
          {/* Центрированный блок аватара и загрузки */}
          <Box display="flex" justifyContent="center" mb={4}>
            <AvatarDropzone
              avatarUrl={user.profile.avatar}
              firstName={user.profile.first_name}
              isEditable={isEditable}
              onUpload={handleAvatarUpload}
              onRemove={handleAvatarRemove}
            />
          </Box>

          {/* Информация */}
          <Typography variant="h5" mt={2} align="center">
            {user.profile.first_name} {user.profile.last_name}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            {user.email}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            mt={1}
            align="center"
          >
            A member since {joinedDate}
          </Typography>

          {/* Поля профиля */}
          <Box maxWidth={900} mx="auto" mt={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  disabled={!isEditable}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
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
                    <InputLabel>Department</InputLabel>
                    <Select
                      label="Department"
                      value={displayDepartment || ""}
                      onChange={(e) =>
                        setDepartmentId(e.target.value as string)
                      }
                    >
                      <MenuItem value="" disabled hidden>
                        Select Department
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
                    label="Department"
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
                    <InputLabel>Position</InputLabel>
                    <Select
                      label="Position"
                      value={displayPosition || ""}
                      onChange={(e) => setPositionId(e.target.value as string)}
                    >
                      <MenuItem value="" disabled hidden>
                        Select Position
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
                    label="Position"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={user.position?.name || "—"}
                  />
                )}
              </Grid>
            </Grid>

            {isEditable && (
              <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button
                  variant="contained"
                  disabled={!canUpdate}
                  onClick={handleUpdate}
                  sx={{ borderRadius: "20px", px: 4 }}
                >
                  UPDATE
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}

      {tabIndex === 1 && (
        <Box>
          <SkillsPage userId={user.id} />
        </Box>
      )}

      {tabIndex === 2 && (
        <Box>
          <Typography variant="h6" mb={2}>
            Languages
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Languages...
          </Typography>
        </Box>
      )}
    </Box>
  );
};
