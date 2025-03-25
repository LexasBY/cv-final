import React from "react";
import { Box, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

type SkillsActionsProps = {
  hasSkills: boolean;
  onAdd: () => void;
  onRemove: () => void;
};

export const SkillsActions: React.FC<SkillsActionsProps> = ({
  hasSkills,
  onAdd,
  onRemove,
}) => {
  return (
    <Box display="flex" justifyContent="flex-end" mt={2}>
      <Stack direction="row" spacing={2}>
        <Button startIcon={<AddIcon />} onClick={onAdd} sx={{ color: "gray" }}>
          ADD SKILL
        </Button>
        {hasSkills && (
          <Button
            startIcon={<DeleteIcon />}
            onClick={onRemove}
            sx={{ color: "red" }}
          >
            REMOVE SKILLS
          </Button>
        )}
      </Stack>
    </Box>
  );
};
