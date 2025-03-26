import React from "react";
import { Box, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

type SkillsActionsProps = {
  hasSkills: boolean;
  isDeleteMode?: boolean;
  deleteCount?: number;
  onAdd: () => void;
  onRemove: () => void;
  onDeleteCancel?: () => void;
  onDeleteConfirm?: () => void;
};

export const SkillsActions: React.FC<SkillsActionsProps> = ({
  hasSkills,
  isDeleteMode = false,
  deleteCount = 0,
  onAdd,
  onRemove,
  onDeleteCancel,
  onDeleteConfirm,
}) => {
  if (isDeleteMode) {
    return (
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={onDeleteCancel}
            sx={{
              borderRadius: "40px",
              px: 6,
              color: "#aaa",
              borderColor: "#555",
              "&:hover": {
                borderColor: "#777",
              },
            }}
          >
            CANCEL
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={onDeleteConfirm}
            disabled={deleteCount === 0}
            sx={{
              borderRadius: "40px",
              px: 6,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            DELETE
            {deleteCount > 0 && (
              <Box
                sx={{
                  ml: 1,
                  backgroundColor: "#fff",
                  color: "#d32f2f", // MUI "error" red
                  fontSize: "14px",
                  fontWeight: "bold",
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {deleteCount}
              </Box>
            )}
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="flex-end" mt={2}>
      <Stack direction="row" spacing={2}>
        <Button
          startIcon={<AddIcon />}
          onClick={onAdd}
          sx={{ color: "gray", borderRadius: 5 }}
        >
          ADD SKILL
        </Button>
        {hasSkills && (
          <Button
            startIcon={<DeleteIcon />}
            onClick={onRemove}
            sx={{ color: "red", borderRadius: 5 }}
          >
            REMOVE SKILLS
          </Button>
        )}
      </Stack>
    </Box>
  );
};
