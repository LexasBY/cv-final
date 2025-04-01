import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type CreateCvModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    education?: string;
    description?: string;
  }) => void;
};

export const CreateCvModal: React.FC<CreateCvModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [education, setEducation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    setError("");
    onSubmit({ name, education, description });
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setEducation("");
    setDescription("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Create CV
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
          error={!!error}
          helperText={error}
        />
        <TextField
          label="Education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          minRows={4}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{ borderRadius: "30px", px: 4 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!name.trim()}
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
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
