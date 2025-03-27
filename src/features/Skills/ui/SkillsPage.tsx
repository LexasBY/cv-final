import React, { useState, useMemo } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useQuery, useMutation, ApolloCache } from "@apollo/client";
import { useParams } from "react-router-dom";

import {
  GET_USER_SKILLS,
  GET_SKILL_CATEGORIES,
  GET_SKILLS,
  ADD_PROFILE_SKILL,
  UPDATE_PROFILE_SKILL,
  DELETE_PROFILE_SKILL,
} from "../../../shared/api/user/skills.api";

import { SkillsList } from "./SkillsList";
import { GenericModal } from "../../../shared/api/ui/GenericModal";
import {
  Skill,
  SkillMastery,
  Mastery,
} from "../../../shared/api/graphql/generated";

interface UserProfile {
  skills: SkillMastery[];
}

interface UserSkillsData {
  profile: UserProfile;
}

interface AddProfileSkillResponse {
  addProfileSkill: SkillMastery;
}

interface UpdateProfileSkillResponse {
  updateProfileSkill: SkillMastery;
}

interface DeleteProfileSkillResponse {
  deleteProfileSkill: SkillMastery;
}

export const SkillsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillMastery | null>(null);
  const [skillsToDelete, setSkillsToDelete] = useState<string[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "error" | "success";
  }>({ open: false, message: "", severity: "error" });

  const {
    data: skillsData,
    loading: skillsLoading,
    error: skillsError,
  } = useQuery<UserSkillsData>(GET_USER_SKILLS, {
    variables: { userId },
    skip: !userId,
  });
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GET_SKILL_CATEGORIES);
  const {
    data: allSkillsData,
    loading: allSkillsLoading,
    error: allSkillsError,
  } = useQuery(GET_SKILLS);

  const [addSkill] = useMutation<
    AddProfileSkillResponse,
    {
      skill: {
        userId: string;
        name: string;
        mastery: Mastery;
        categoryId?: string;
      };
    }
  >(ADD_PROFILE_SKILL, {
    update: (cache: ApolloCache<AddProfileSkillResponse>, { data }) => {
      if (!data) return;
      const addedSkill = data.addProfileSkill;
      const existing = cache.readQuery<UserSkillsData>({
        query: GET_USER_SKILLS,
        variables: { userId },
      });
      if (existing) {
        cache.writeQuery({
          query: GET_USER_SKILLS,
          variables: { userId },
          data: {
            profile: {
              ...existing.profile,
              skills: [...existing.profile.skills, addedSkill],
            },
          },
        });
      }
    },
  });

  const [updateSkill] = useMutation<
    UpdateProfileSkillResponse,
    {
      skill: {
        userId: string;
        name: string;
        mastery: Mastery;
        categoryId?: string;
      };
    }
  >(UPDATE_PROFILE_SKILL, {
    update: (cache: ApolloCache<UpdateProfileSkillResponse>, { data }) => {
      if (!data) return;
      const updatedSkill = data.updateProfileSkill;
      const existing = cache.readQuery<UserSkillsData>({
        query: GET_USER_SKILLS,
        variables: { userId },
      });
      if (existing) {
        cache.writeQuery({
          query: GET_USER_SKILLS,
          variables: { userId },
          data: {
            profile: {
              ...existing.profile,
              skills: existing.profile.skills.map((s: SkillMastery) =>
                s.name === updatedSkill.name ? updatedSkill : s
              ),
            },
          },
        });
      }
    },
  });

  const [deleteSkill] = useMutation<
    DeleteProfileSkillResponse,
    { skill: { userId: string; name: string } }
  >(DELETE_PROFILE_SKILL, {
    update: (cache: ApolloCache<DeleteProfileSkillResponse>, { data }) => {
      if (!data) return;
      const deletedSkill = data.deleteProfileSkill;
      const existing = cache.readQuery<UserSkillsData>({
        query: GET_USER_SKILLS,
        variables: { userId },
      });
      if (existing) {
        cache.writeQuery({
          query: GET_USER_SKILLS,
          variables: { userId },
          data: {
            profile: {
              ...existing.profile,
              skills: existing.profile.skills.filter(
                (s: SkillMastery) => s.name !== deletedSkill.name
              ),
            },
          },
        });
      }
    },
  });

  const currentUserId = localStorage.getItem("userId");
  const isOwner = userId === currentUserId;

  const availableSkillsToAdd = useMemo(() => {
    if (!skillsData || !allSkillsData) return [];
    const existingNames = skillsData.profile.skills.map((s) => s.name);
    return allSkillsData.skills.filter(
      (s: Skill) => !existingNames.includes(s.name)
    );
  }, [skillsData, allSkillsData]);

  const masteryOptions = useMemo(() => {
    return Object.values(Mastery).map((m) => ({
      label: m,
      value: m,
    }));
  }, []);

  if (skillsLoading || categoriesLoading || allSkillsLoading || !userId)
    return <CircularProgress />;
  if (skillsError || categoriesError || allSkillsError)
    return <Typography color="error">Error loading data</Typography>;
  if (!skillsData?.profile || !categoriesData || !allSkillsData)
    return <Typography color="error">No profile data found</Typography>;

  const handleAddSkill = async (skillName: string, mastery: string) => {
    const fullSkill = allSkillsData.skills.find(
      (s: Skill) => s.name === skillName
    );
    const categoryId = fullSkill?.category?.id;

    try {
      await addSkill({
        variables: {
          skill: {
            userId,
            name: skillName,
            mastery: mastery as Mastery,
            categoryId,
          },
        },
      });
      setSnackbar({
        open: true,
        message: "Skill added successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to add skill:", error);
      setSnackbar({
        open: true,
        message: "Failed to add skill",
        severity: "error",
      });
    } finally {
      setOpenAdd(false);
    }
  };

  const handleUpdateSkill = async (mastery: string) => {
    if (!selectedSkill) return;
    const fullSkill = allSkillsData.skills.find(
      (s: Skill) => s.name === selectedSkill.name
    );
    const categoryId = fullSkill?.category?.id;

    try {
      await updateSkill({
        variables: {
          skill: {
            userId,
            name: selectedSkill.name,
            mastery: mastery as Mastery,
            categoryId,
          },
        },
      });
      setSnackbar({
        open: true,
        message: "Skill updated successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to update skill:", error);
      setSnackbar({
        open: true,
        message: "Failed to update skill",
        severity: "error",
      });
    } finally {
      setSelectedSkill(null);
    }
  };

  const handleDeleteSkills = async () => {
    try {
      await Promise.all(
        skillsToDelete.map((name) =>
          deleteSkill({
            variables: { skill: { userId, name } },
          })
        )
      );
      setSnackbar({
        open: true,
        message: "Skills deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to delete skills:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete skills",
        severity: "error",
      });
    } finally {
      setIsDeleteMode(false);
      setSkillsToDelete([]);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ px: 4, py: 3, mx: "auto", maxWidth: 1200 }}>
      <SkillsList
        skills={skillsData.profile.skills}
        allSkills={allSkillsData.skills}
        categories={categoriesData.skillCategories}
        loading={false}
        error={null}
        onAdd={() => setOpenAdd(true)}
        onEdit={(skill) => isOwner && setSelectedSkill(skill)}
        isDeleteMode={isDeleteMode}
        selectedForDelete={skillsToDelete}
        onToggleDeleteMode={() => {
          setIsDeleteMode((prev) => !prev);
          setSkillsToDelete([]);
        }}
        onToggleSkillDelete={(name) => {
          setSkillsToDelete((prev) =>
            prev.includes(name)
              ? prev.filter((n) => n !== name)
              : [...prev, name]
          );
        }}
        onConfirmDelete={handleDeleteSkills}
        isOwner={isOwner}
      />

      {isOwner && (
        <GenericModal
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          onConfirm={handleAddSkill}
          title="Add skill"
          itemLabel="Skill"
          levelLabel="Skill mastery"
          options={availableSkillsToAdd.map((s: Skill) => ({
            label: s.name,
            value: s.name,
          }))}
          levels={masteryOptions}
        />
      )}

      {selectedSkill && (
        <GenericModal
          open
          onClose={() => setSelectedSkill(null)}
          onConfirm={(_, mastery) => handleUpdateSkill(mastery)}
          title="Update skill"
          itemLabel="Skill"
          levelLabel="Skill mastery"
          options={[{ label: selectedSkill.name, value: selectedSkill.name }]}
          levels={masteryOptions}
          disableItemSelect
          initialItemValue={selectedSkill.name}
          initialLevel={selectedSkill.mastery}
        />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
