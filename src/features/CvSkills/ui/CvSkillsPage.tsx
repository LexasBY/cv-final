import React, { useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Snackbar,
  Typography,
  Alert,
} from "@mui/material";
import { useQuery } from "@apollo/client";

import {
  SkillMastery,
  Mastery,
  Skill,
} from "../../../shared/api/graphql/generated";

import { CvSkillsList } from "./CvSkillsList";
import { GenericModal } from "../../../shared/ui/Modals/GenericModal";
import { useCvSkillsMutations } from "../model/useCvSkillsMutations";
import { GET_CV_SKILLS } from "../../../shared/api/cvs/cvs.api";
import {
  GET_SKILL_CATEGORIES,
  GET_SKILLS,
} from "../../../shared/api/user/skills.api";
import { useCvContext } from "../../../pages/cv/model/useCvContext";

export const CvSkillsPage: React.FC = () => {
  const { cv } = useCvContext();
  const cvId = cv?.id;

  const [openAdd, setOpenAdd] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillMastery | null>(null);
  const [skillsToDelete, setSkillsToDelete] = useState<string[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const { addSkillMutation, updateSkillMutation, deleteSkillMutation } =
    useCvSkillsMutations();

  const {
    data: skillsData,
    loading: skillsLoading,
    error: skillsError,
  } = useQuery(GET_CV_SKILLS, { variables: { cvId }, skip: !cvId });

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

  const isOwner = true;

  const availableSkillsToAdd = useMemo(() => {
    if (!skillsData || !allSkillsData) return [];
    const existingNames = skillsData.cv.skills.map((s: SkillMastery) => s.name);
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

  if (!cvId || skillsLoading || categoriesLoading || allSkillsLoading)
    return <CircularProgress />;
  if (skillsError || categoriesError || allSkillsError)
    return <Typography color="error">Error loading data</Typography>;
  if (!skillsData?.cv || !categoriesData || !allSkillsData)
    return <Typography color="error">No CV data found</Typography>;

  const handleAddSkill = async (skillName: string, mastery: string) => {
    if (!cvId) return;
    const skill = allSkillsData.skills.find((s: Skill) => s.name === skillName);
    const categoryId = skill?.category?.id;

    try {
      await addSkillMutation({
        variables: {
          skill: {
            cvId,
            name: skillName,
            mastery: mastery as Mastery,
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
    if (!selectedSkill || !cvId) return;
    const skill = allSkillsData.skills.find(
      (s: Skill) => s.name === selectedSkill.name
    );
    const categoryId = skill?.category?.id;

    try {
      await updateSkillMutation({
        variables: {
          skill: {
            cvId,
            name: selectedSkill.name,
            mastery: mastery as Mastery,
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
    if (!cvId) return;
    try {
      await deleteSkillMutation({
        variables: {
          skill: {
            cvId,
            name: skillsToDelete,
          },
        },
      });
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
      <CvSkillsList
        skills={skillsData.cv.skills}
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
