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
  isDeleteMode: boolean;
  selectedForDelete: string[];
  onToggleDeleteMode: () => void;
  onToggleSkillDelete: (skillName: string) => void;
  onConfirmDelete: () => void;
  isOwner: boolean;
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
  isDeleteMode,
  selectedForDelete,
  onToggleDeleteMode,
  onToggleSkillDelete,
  onConfirmDelete,
  isOwner,
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

  const groupedByParent: Record<string, SkillMastery[]> = {};
  skills.forEach((skill) => {
    const categoryId = skill.categoryId ?? undefined;
    const category = categoryId ? categoryMap[categoryId] : undefined;
    const parentCategory = category?.parent
      ? categoryMap[category.parent.id]
      : category;
    const parentName = parentCategory?.name || "Other";

    if (!groupedByParent[parentName]) {
      groupedByParent[parentName] = [];
    }

    groupedByParent[parentName].push(skill);
  });

  const isSelected = (name: string) => selectedForDelete.includes(name);

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
                  onClick={() =>
                    isDeleteMode
                      ? onToggleSkillDelete(skill.name)
                      : isOwner && onEdit(skill)
                  }
                  sx={{ cursor: isOwner ? "pointer" : "default" }}
                >
                  <Box flexGrow={1}>
                    <LinearProgress
                      variant="determinate"
                      value={
                        isSelected(skill.name)
                          ? 0
                          : masteryValues[skill.mastery]
                      }
                      sx={{
                        height: 4,
                        borderRadius: 3,
                        backgroundColor: "#444",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: isSelected(skill.name)
                            ? "#888"
                            : masteryColors[skill.mastery],
                        },
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      minWidth: 100,
                      color: isSelected(skill.name) ? "#fff" : "inherit",
                    }}
                  >
                    {skill.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {isOwner && (
        <Box mt={4}>
          <SkillsActions
            hasSkills={skills.length > 0}
            isDeleteMode={isDeleteMode}
            deleteCount={selectedForDelete.length}
            onAdd={onAdd}
            onRemove={onToggleDeleteMode}
            onDeleteCancel={onToggleDeleteMode}
            onDeleteConfirm={onConfirmDelete}
          />
        </Box>
      )}
    </Box>
  );
};
