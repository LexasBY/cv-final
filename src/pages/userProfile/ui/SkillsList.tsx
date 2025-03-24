import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Skill } from "../../../shared/api/graphql/generated";

type SkillsListProps = {
  skills: Skill[];
  loading: boolean;
  error: unknown;
};

export const SkillsList: React.FC<SkillsListProps> = ({
  skills,
  loading,
  error,
}) => {
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading skills</Typography>;
  if (!skills.length) return <Typography>No skills found.</Typography>;

  return (
    <Box>
      {skills.map((skill) => (
        <Box key={skill.id} mb={1}>
          <Typography variant="body1">{skill.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};
