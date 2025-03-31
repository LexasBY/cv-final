import React, { useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Snackbar,
  Typography,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import {
  GET_USER_SKILLS,
  GET_SKILL_CATEGORIES,
  GET_SKILLS,
} from "../../../shared/api/user/skills.api";
import {
  SkillMastery,
  Mastery,
  Skill,
} from "../../../shared/api/graphql/generated";

import { SkillsList } from "./SkillsList";
import { GenericModal } from "../../../shared/api/ui/GenericModal";
import { useSkillsMutations } from "../model/useSkillsMutations";

export const SkillsPage: React.FC = () => {
  const { userId: routeUserId } = useParams<{ userId?: string }>();
  const userId = routeUserId ?? localStorage.getItem("userId");

  const [openAdd, setOpenAdd] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillMastery | null>(null);
  const [skillsToDelete, setSkillsToDelete] = useState<string[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const {
    data: skillsData,
    loading: skillsLoading,
    error: skillsError,
  } = useQuery(GET_USER_SKILLS, { variables: { userId }, skip: !userId });

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

  const { addSkillMutation, updateSkillMutation, deleteSkillMutation } =
    useSkillsMutations(userId!);

  const isOwner = userId === localStorage.getItem("userId");

  const availableSkillsToAdd = useMemo(() => {
    if (!skillsData || !allSkillsData) return [];
    const existingNames = skillsData.profile.skills.map(
      (s: SkillMastery) => s.name
    );
    return allSkillsData.skills.filter(
      (s: Skill) => !existingNames.includes(s.name)
    );
  }, [skillsData, allSkillsData]);

  const masteryOptions = useMemo(
    () =>
      Object.values(Mastery).map((m) => ({
        label: m,
        value: m,
      })),
    []
  );

  if (skillsLoading || categoriesLoading || allSkillsLoading || !userId)
    return <CircularProgress />;
  if (skillsError || categoriesError || allSkillsError)
    return <Typography color="error">Error loading data</Typography>;
  if (!skillsData?.profile || !categoriesData || !allSkillsData)
    return <Typography color="error">No profile data found</Typography>;

  const handleAddSkill = async (skillName: string, mastery: string) => {
    const skill = allSkillsData.skills.find((s: Skill) => s.name === skillName);
    const categoryId = skill?.category?.id;

    try {
      await addSkillMutation({
        variables: {
          skill: {
            userId,
            name: skillName,
            mastery,
            categoryId,
          },
        },
      });
      setSnackbar({ open: true, message: "Skill added", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Add failed", severity: "error" });
    } finally {
      setOpenAdd(false);
    }
  };

  const handleUpdateSkill = async (mastery: string) => {
    if (!selectedSkill) return;
    const skill = allSkillsData.skills.find(
      (s: Skill) => s.name === selectedSkill.name
    );
    const categoryId = skill?.category?.id;

    try {
      await updateSkillMutation({
        variables: {
          skill: {
            userId,
            name: selectedSkill.name,
            mastery,
            categoryId,
          },
        },
      });
      setSnackbar({
        open: true,
        message: "Skill updated",
        severity: "success",
      });
    } catch {
      setSnackbar({ open: true, message: "Update failed", severity: "error" });
    } finally {
      setSelectedSkill(null);
    }
  };

  const handleDeleteSkills = async () => {
    try {
      await Promise.all(
        skillsToDelete.map((name) =>
          deleteSkillMutation({ variables: { skill: { userId, name } } })
        )
      );
      setSnackbar({
        open: true,
        message: "Skills deleted",
        severity: "success",
      });
    } catch {
      setSnackbar({ open: true, message: "Delete failed", severity: "error" });
    } finally {
      setSkillsToDelete([]);
      setIsDeleteMode(false);
    }
  };

  return (
    <Box sx={{ px: 4, py: 3, mx: "auto", maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Skills
      </Typography>
      <SkillsList
        skills={skillsData.profile.skills}
        allSkills={allSkillsData.skills}
        categories={categoriesData.skillCategories}
        onAdd={() => setOpenAdd(true)}
        onEdit={(skill) => isOwner && setSelectedSkill(skill)}
        isOwner={isOwner}
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
        loading={false}
        error={null}
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
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
