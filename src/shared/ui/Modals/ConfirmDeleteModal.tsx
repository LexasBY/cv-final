import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

type EntityType = "cv" | "project";

type ConfirmDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityType: EntityType;
  entityName: string;
};

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
  entityType,
  entityName,
}) => {
  const { t } = useTranslation();

  const getTitle = () =>
    entityType === "cv" ? t("Delete CV") : t("Remove project");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        {getTitle()}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography>
          {entityType === "cv"
            ? t("Are you sure you want to delete CV", { name: entityName })
            : t("Are you sure you want to remove project", {
                name: entityName,
              })}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ borderRadius: "30px", px: 4 }}
        >
          {t("Cancel")}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: "error.main",
            color: "#fff",
            borderRadius: "30px",
            px: 4,
            "&:hover": {
              backgroundColor: "error.dark",
            },
          }}
        >
          {t("Confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
