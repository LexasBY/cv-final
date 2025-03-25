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
} from "../../../shared/api/graphql/generated";
import { SkillsActions } from "./SkillsActions";

type MasteryLevel =
  | "Novice"
  | "Competent"
  | "Proficient"
  | "Advanced"
  | "Expert";

const masteryColors: Record<MasteryLevel, string> = {
  Novice: "#2196f3",
  Competent: "#03a9f4",
  Proficient: "#ff9800",
  Advanced: "#ff5722",
  Expert: "#f44336",
};

const masteryValues: Record<MasteryLevel, number> = {
  Novice: 25,
  Competent: 50,
  Proficient: 75,
  Advanced: 90,
  Expert: 100,
};

type SkillsListProps = {
  skills: SkillMastery[];
  categories: SkillCategory[];
  loading: boolean;
  error: unknown;
};

export const SkillsList: React.FC<SkillsListProps> = ({
  skills,
  categories,
  loading,
  error,
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

  if (!skills.length) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <SkillsActions
          hasSkills={false}
          onAdd={() => console.log("Add skill")}
          onRemove={() => {}}
        />
      </Box>
    );
  }

  const groupedByParent: Record<string, SkillMastery[]> = {};
  skills.forEach((skill) => {
    const category = skill.categoryId ? categoryMap[skill.categoryId] : null;
    const parentName = category?.parent?.name || category?.name || "Other";

    if (!groupedByParent[parentName]) {
      groupedByParent[parentName] = [];
    }
    groupedByParent[parentName].push(skill);
  });

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
                <Box display="flex" alignItems="center" gap={4}>
                  <Box flexGrow={1}>
                    <LinearProgress
                      variant="determinate"
                      value={masteryValues[skill.mastery as MasteryLevel]}
                      sx={{
                        height: 4,
                        borderRadius: 3,
                        backgroundColor: "#444",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor:
                            masteryColors[skill.mastery as MasteryLevel],
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

      <SkillsActions
        hasSkills={true}
        onAdd={() => console.log("Add skill")}
        onRemove={() => console.log("Remove skills")}
      />
    </Box>
  );
};
