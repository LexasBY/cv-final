import React from "react";
import { Box, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTranslation } from "react-i18next";

type CvSkillsActionsProps = {
  hasSkills: boolean;
  isDeleteMode?: boolean;
  deleteCount?: number;
  onAdd: () => void;
  onRemove: () => void;
  onDeleteCancel?: () => void;
  onDeleteConfirm?: () => void;
};

export const CvSkillsActions: React.FC<CvSkillsActionsProps> = ({
  hasSkills,
  isDeleteMode = false,
  deleteCount = 0,
  onAdd,
  onRemove,
  onDeleteCancel,
  onDeleteConfirm,
}) => {
  const { t } = useTranslation();

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
            {t("Cancel")}
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
            {t("Delete")}
            {deleteCount > 0 && (
              <Box
                sx={{
                  ml: 1,
                  backgroundColor: "#fff",
                  color: "#d32f2f",
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
          {t("Add Skill")}
        </Button>
        {hasSkills && (
          <Button
            startIcon={<DeleteIcon />}
            onClick={onRemove}
            sx={{ color: "red", borderRadius: 5 }}
          >
            {t("Remove Skills")}
          </Button>
        )}
      </Stack>
    </Box>
  );
};
