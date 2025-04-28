import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Project } from "../../../shared/api/graphql/generated";
import { useTranslation } from "react-i18next";

export type EditingProject = {
  cvProjectId: string;
  refProjectId: string;
  name: string;
  start_date: string;
  end_date?: string;
  responsibilities: string[];
  roles: string[];
  domain: string;
  description: string;
  environment: string[];
};

type AddProjectModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    projectId: string;
    start_date: string;
    end_date?: string;
    roles: string[];
    responsibilities: string[];
  }) => void;
  projects: Project[];
  editingProject?: EditingProject | null;
};

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  open,
  onClose,
  onSubmit,
  projects,
  editingProject,
}) => {
  const { t } = useTranslation();
  const [projectId, setProjectId] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [roles, setRoles] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

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
    if (open) {
      if (editingProject) {
        setProjectId(editingProject.cvProjectId);
        setStartDate(
          editingProject.start_date ? dayjs(editingProject.start_date) : null
        );
        setEndDate(
          editingProject.end_date ? dayjs(editingProject.end_date) : null
        );
        setResponsibilities((editingProject.responsibilities || []).join("\n"));
        setRoles((editingProject.roles || []).join("\n"));
      } else {
        setProjectId("");
        setStartDate(null);
        setEndDate(null);
        setResponsibilities("");
        setRoles("");
      }
    }
  }, [open, editingProject]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {editingProject ? t("Update Project") : t("Add Project")}
      </DialogTitle>
      <DialogContent sx={{ mt: 1 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            {editingProject ? (
              <TextField
                fullWidth
                label={t("Project")}
                value={editingProject.name}
                disabled
              />
            ) : (
              <TextField
                fullWidth
                select
                label={t("Project")}
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={t("Domain")}
              value={
                editingProject?.domain ||
                projects.find((p) => p.id === projectId)?.domain ||
                ""
              }
              disabled
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <DatePicker
              label={t("Start Date")}
              value={startDate}
              onChange={(val) => setStartDate(val)}
              format="DD/MM/YYYY"
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label={t("End Date")}
              value={endDate}
              onChange={(val) => setEndDate(val)}
              format="DD/MM/YYYY"
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          label={t("Description")}
          multiline
          disabled
          sx={{ mb: 2 }}
          value={
            editingProject?.description ||
            projects.find((p) => p.id === projectId)?.description ||
            ""
          }
        />
        <TextField
          fullWidth
          label={t("Environment")}
          multiline
          disabled
          sx={{ mb: 2 }}
          value={
            editingProject?.environment?.join(", ") ||
            projects.find((p) => p.id === projectId)?.environment?.join(", ") ||
            ""
          }
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          label={t("Responsibilities")}
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>{t("Cancel")}</Button>
        <Button onClick={handleSubmit} disabled={!isValid} color="error">
          {editingProject ? t("Update") : t("Add")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
