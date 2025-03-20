import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Tab,
  Tabs,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { useUserProfile } from "../model/useUserProfile";
import { ProfileForm } from "./ProfileForm";
import { SkillsList } from "./SkillsList";
import { useUserSkills } from "../model/useUserSkills";

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
  } = useUserProfile();

  // Табы
  const [tabIndex, setTabIndex] = useState(0);

  // Загружаем SKILLS, когда пользователь переключается на вкладку SKILLS
  const {
    skills,
    loading: skillsLoading,
    error: skillsError,
  } = useUserSkills(
    user?.id,
    tabIndex === 1 // активна ли вкладка SKILLS
  );

  // Аналогичный хук можно сделать для LANGUAGES:
  // const { languages, loading: languagesLoading, error: languagesError } = useUserLanguages(
  //   user?.id,
  //   tabIndex === 2
  // );

  if (loading)
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  if (error || !user) return <Box>Error fetching user</Box>;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // Форматируем дату
  const joinedDate = new Date(user.created_at).toLocaleDateString();

  // Кнопка доступна, если профиль редактируемый и есть изменения
  const canUpdate = isEditable && hasChanges;

  return (
    <Box sx={{ p: 3 }}>
      {/* Хлебные крошки / заголовок */}
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Typography
          variant="body2"
          component={Link}
          to="/employees"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          Employees
        </Typography>
        <Typography variant="body2">{" > "}</Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {user.profile.first_name} {user.profile.last_name}
        </Typography>
      </Box>

      {/* Табы */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="PROFILE" />
          <Tab label="SKILLS" />
          <Tab label="LANGUAGES" />
        </Tabs>
      </Box>

      {/* Вкладка PROFILE */}
      {tabIndex === 0 && (
        <Box display="flex" mt={3} gap={4}>
          {/* Левая колонка – аватар и краткая инфо */}
          <Box
            flex="0 0 250px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Avatar
              src={user.profile.avatar || ""}
              sx={{ width: 100, height: 100, bgcolor: "gray" }}
            >
              {!user.profile.avatar &&
                user.profile.first_name &&
                user.profile.first_name.charAt(0).toUpperCase()}
            </Avatar>

            {/* Кнопка загрузки аватара (только если isEditable) */}
            {isEditable && (
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton color="primary" component="label">
                  <UploadFileIcon />
                  <input hidden accept="image/*" type="file" />
                </IconButton>
                <Typography variant="body2">Upload avatar image</Typography>
              </Box>
            )}

            <Typography variant="h6" mt={2}>
              {user.profile.first_name} {user.profile.last_name}
            </Typography>
            <Typography variant="body2">{user.email}</Typography>
            <Typography variant="body2">A member since {joinedDate}</Typography>
          </Box>

          {/* Правая колонка – Форма для редактирования */}
          <Box flex="1">
            <ProfileForm
              firstName={firstName}
              lastName={lastName}
              departmentId={departmentId}
              positionId={positionId}
              departments={departments}
              positions={positions}
              isEditable={isEditable}
              onFirstNameChange={setFirstName}
              onLastNameChange={setLastName}
              onDepartmentChange={setDepartmentId}
              onPositionChange={setPositionId}
            />

            {/* Кнопка UPDATE (видна только если пользователь редактирует свой профиль) */}
            {isEditable && (
              <Box mt={3}>
                <Button
                  variant="contained"
                  disabled={!canUpdate}
                  onClick={handleUpdate}
                >
                  UPDATE
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* Вкладка SKILLS */}
      {tabIndex === 1 && (
        <Box mt={3}>
          <Typography variant="h6" mb={2}>
            Skills
          </Typography>
          <SkillsList
            skills={skills}
            loading={skillsLoading}
            error={skillsError}
          />
        </Box>
      )}

      {/* Вкладка LANGUAGES */}
      {tabIndex === 2 && (
        <Box mt={3}>
          <Typography variant="h6" mb={2}>
            Languages
          </Typography>
          <Typography variant="body2">
            Здесь может быть список языков...
          </Typography>
          {/* Аналогично можно вызвать useUserLanguages */}
        </Box>
      )}
    </Box>
  );
};
