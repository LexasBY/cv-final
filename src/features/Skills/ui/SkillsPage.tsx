import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { SkillsList } from "./SkillsList";
import {
  GET_USER_SKILLS,
  GET_SKILL_CATEGORIES,
} from "../../../shared/api/user/skills.api";

type SkillsPageProps = {
  userId: string;
};

export const SkillsPage: React.FC<SkillsPageProps> = ({ userId }) => {
  const {
    data: skillsData,
    loading: skillsLoading,
    error: skillsError,
  } = useQuery(GET_USER_SKILLS, { variables: { userId } });

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GET_SKILL_CATEGORIES);

  if (skillsLoading || categoriesLoading) return <CircularProgress />;
  if (skillsError || categoriesError)
    return <Typography color="error">Error loading data</Typography>;

  return (
    <SkillsList
      skills={skillsData.profile.skills}
      categories={categoriesData.skillCategories}
      loading={false}
      error={null}
    />
  );
};
