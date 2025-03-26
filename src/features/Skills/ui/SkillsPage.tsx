import React, { useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";

import {
  GET_USER_SKILLS,
  GET_SKILL_CATEGORIES,
  GET_SKILLS,
  ADD_PROFILE_SKILL,
  UPDATE_PROFILE_SKILL,
  DELETE_PROFILE_SKILL,
} from "../../../shared/api/user/skills.api";

import { SkillsList } from "./SkillsList";
import { AddSkillModal } from "./AddSkillModal";
import { UpdateSkillModal } from "./UpdateSkillModal";

import {
  Skill,
  SkillMastery,
  Mastery,
} from "../../../shared/api/graphql/generated";

type SkillsPageProps = {
  userId: string;
};

export const SkillsPage: React.FC<SkillsPageProps> = ({ userId }) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillMastery | null>(null);
  const [skillsToDelete, setSkillsToDelete] = useState<string[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const {
    data: skillsData,
    loading: skillsLoading,
    error: skillsError,
    refetch: refetchSkills,
  } = useQuery(GET_USER_SKILLS, { variables: { userId } });

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

  const [addSkill] = useMutation(ADD_PROFILE_SKILL);
  const [updateSkill] = useMutation(UPDATE_PROFILE_SKILL);
  const [deleteSkill] = useMutation(DELETE_PROFILE_SKILL);

  const currentUserId = localStorage.getItem("userId");
  const isOwner = userId === currentUserId;

  if (skillsLoading || categoriesLoading || allSkillsLoading) {
    return <CircularProgress />;
  }

  if (skillsError || categoriesError || allSkillsError) {
    return <Typography color="error">Error loading data</Typography>;
  }

  if (!skillsData?.profile || !categoriesData || !allSkillsData) {
    return <Typography color="error">No profile data found</Typography>;
  }

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenUpdate = (skill: SkillMastery) => {
    if (!isOwner) return;
    setSelectedSkill(skill);
  };

  const handleCloseUpdate = () => setSelectedSkill(null);

  const handleAddSkill = async (skillName: string, mastery: Mastery) => {
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
            mastery,
            categoryId,
          },
        },
      });
      await refetchSkills();
    } catch (error) {
      console.error("Failed to add skill:", error);
    } finally {
      handleCloseAdd();
    }
  };

  const handleUpdateSkill = async (updatedMastery: Mastery) => {
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
            mastery: updatedMastery,
            categoryId,
          },
        },
      });
      await refetchSkills();
    } catch (error) {
      console.error("Failed to update skill:", error);
    } finally {
      handleCloseUpdate();
    }
  };

  const handleDeleteSkills = async () => {
    try {
      for (const name of skillsToDelete) {
        await deleteSkill({
          variables: {
            skill: {
              userId,
              name,
            },
          },
        });
      }
      await refetchSkills();
    } catch (error) {
      console.error("Failed to delete skills:", error);
    } finally {
      setIsDeleteMode(false);
      setSkillsToDelete([]);
    }
  };

  const existingNames = skillsData.profile.skills.map(
    (s: SkillMastery) => s.name
  );
  const availableSkillsToAdd = allSkillsData.skills.filter(
    (s: SkillMastery) => !existingNames.includes(s.name)
  );

  return (
    <>
      <SkillsList
        skills={skillsData.profile.skills}
        allSkills={allSkillsData.skills}
        categories={categoriesData.skillCategories}
        loading={false}
        error={null}
        onAdd={handleOpenAdd}
        onEdit={handleOpenUpdate}
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
        <AddSkillModal
          open={openAdd}
          onClose={handleCloseAdd}
          skills={availableSkillsToAdd}
          onConfirm={handleAddSkill}
        />
      )}

      {selectedSkill && (
        <UpdateSkillModal
          open={true}
          onClose={handleCloseUpdate}
          skillName={selectedSkill.name}
          currentMastery={selectedSkill.mastery}
          onConfirm={handleUpdateSkill}
        />
      )}
    </>
  );
};
