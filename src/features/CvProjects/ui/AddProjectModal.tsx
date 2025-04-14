import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { Project } from "../../../shared/api/graphql/generated";

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    projectId: string;
    start_date: string;
    end_date?: string;
    responsibilities: string[];
    roles: string[];
  }) => void;
  projects: Project[];
  defaultValues?: {
    projectId: string;
    start_date: string;
    end_date?: string;
    responsibilities: string[];
    roles: string[];
  };
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  open,
  onClose,
  onSubmit,
  projects,
}) => {
  const [projectId, setProjectId] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [roles, setRoles] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const selectedProject = projects.find((p) => p.id === projectId);
  const isValid = Boolean(projectId && startDate);

  const handleSubmit = () => {
    if (!isValid) return;

    onSubmit({
      projectId,
      start_date: startDate!.format("YYYY-MM-DD"),
      end_date: endDate?.format("YYYY-MM-DD"),
      responsibilities: responsibilities
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      roles: roles
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
    });
  };

  useEffect(() => {
    if (!open) {
      setProjectId("");
      setResponsibilities("");
      setRoles("");
      setStartDate(null);
      setEndDate(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Project</DialogTitle>
      <DialogContent sx={{ mt: 1 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              label="Project"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Domain"
              value={selectedProject?.domain || ""}
              disabled
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(val) => setStartDate(val)}
              format="DD/MM/YYYY"
              slotProps={{
                textField: { fullWidth: true },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(val) => setEndDate(val)}
              format="DD/MM/YYYY"
              slotProps={{
                textField: { fullWidth: true },
              }}
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Description"
          multiline
          disabled
          sx={{ mb: 2 }}
          value={selectedProject?.description || ""}
        />

        <TextField
          fullWidth
          label="Environment"
          multiline
          disabled
          sx={{ mb: 2 }}
          value={selectedProject?.environment.join(", ") || ""}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Responsibilities"
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          sx={{ mb: 2 }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "50px",
            px: 4,
            py: 1.2,
            fontWeight: "bold",
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          CANCEL
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          sx={{
            ml: 2,
            borderRadius: "50px",
            px: 4,
            py: 1.2,
            fontWeight: "bold",
            backgroundColor: isValid ? "error.main" : "rgba(255,255,255,0.1)",
            color: isValid ? "white" : "rgba(255,255,255,0.6)",
            "&:hover": {
              backgroundColor: isValid ? "error.dark" : "rgba(255,255,255,0.1)",
            },
          }}
        >
          ADD
        </Button>
      </DialogActions>
    </Dialog>
  );
};
