import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  LinearProgress,
  Grid,
} from "@mui/material";
import {
  SkillMastery,
  SkillCategory,
  Skill,
  Mastery,
} from "../../../shared/api/graphql/generated";
import { SkillsActions } from "./SkillsActions";

type SkillsListProps = {
  skills: SkillMastery[];
  allSkills: Skill[];
  categories: SkillCategory[];
  loading: boolean;
  error: unknown;
  onAdd: () => void;
  onEdit: (skill: SkillMastery) => void;
};

const masteryColors: Record<Mastery, string> = {
  Novice: "#2196f3",
  Competent: "#03a9f4",
  Proficient: "#ff9800",
  Advanced: "#ff5722",
  Expert: "#f44336",
};

const masteryValues: Record<Mastery, number> = {
  Novice: 25,
  Competent: 50,
  Proficient: 75,
  Advanced: 90,
  Expert: 100,
};

export const SkillsList: React.FC<SkillsListProps> = ({
  skills,
  categories,
  loading,
  error,
  onAdd,
  onEdit,
}) => {
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading skills</Typography>;

  const categoryMap = categories.reduce<Record<string, SkillCategory>>(
    (acc, cat) => {
      acc[cat.id] = cat;
      return acc;
    },
    {}
  );
  console.log("categoryMap", categoryMap);

  const groupedByParent: Record<string, SkillMastery[]> = {};
  console.log("groupedByParent", groupedByParent);

  skills.forEach((skill) => {
    const categoryId = skill.categoryId ?? undefined;
    console.log("skill", skill);
    console.log("categoryId", categoryId);
    const category = categoryId ? categoryMap[categoryId] : undefined;
    console.log("category", category);
    const parentCategory = category?.parent
      ? categoryMap[category.parent.id]
      : category;

    const parentName = parentCategory?.name || "Other";

    if (!groupedByParent[parentName]) {
      groupedByParent[parentName] = [];
    }

    groupedByParent[parentName].push(skill);
  });

  if (!skills.length) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <SkillsActions hasSkills={false} onAdd={onAdd} onRemove={() => {}} />
      </Box>
    );
  }

  return (
    <Box>
      {Object.entries(groupedByParent).map(([parentName, groupSkills]) => (
        <Box key={parentName} mb={4}>
          <Typography variant="h6" gutterBottom>
            {parentName}
          </Typography>
          <Grid container spacing={4}>
            {groupSkills.map((skill) => (
              <Grid item xs={10} sm={6} md={4} lg={3} key={skill.name}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={4}
                  onClick={() => onEdit(skill)}
                  sx={{ cursor: "pointer" }}
                >
                  <Box flexGrow={1}>
                    <LinearProgress
                      variant="determinate"
                      value={masteryValues[skill.mastery]}
                      sx={{
                        height: 4,
                        borderRadius: 3,
                        backgroundColor: "#444",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: masteryColors[skill.mastery],
                        },
                      }}
                    />
                  </Box>
                  <Typography sx={{ minWidth: 100 }}>{skill.name}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      <Box mt={4}>
        <SkillsActions hasSkills={true} onAdd={onAdd} onRemove={() => {}} />
      </Box>
    </Box>
  );
};
