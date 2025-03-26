import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Mastery, Skill } from "../../../shared/api/graphql/generated";

type AddSkillModalProps = {
  open: boolean;
  skills: Skill[];
  onClose: () => void;
  onConfirm: (skillName: string, mastery: Mastery) => void;
};

export const AddSkillModal: React.FC<AddSkillModalProps> = ({
  open,
  skills,
  onClose,
  onConfirm,
}) => {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedMastery, setSelectedMastery] = useState<Mastery>(
    Mastery.Novice
  );

  const handleSkillChange = (e: SelectChangeEvent) => {
    setSelectedSkill(e.target.value);
  };

  const handleConfirm = () => {
    if (selectedSkill) onConfirm(selectedSkill, selectedMastery);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add skill</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}
      >
        <FormControl fullWidth>
          <InputLabel id="skill-label">Skill</InputLabel>
          <Select
            labelId="skill-label"
            value={selectedSkill}
            label="Skill"
            onChange={handleSkillChange}
          >
            {skills.map((skill) => (
              <MenuItem key={skill.id} value={skill.name}>
                {skill.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="mastery-label">Skill mastery</InputLabel>
          <Select
            labelId="mastery-label"
            value={selectedMastery}
            label="Skill mastery"
            onChange={(e) => setSelectedMastery(e.target.value as Mastery)}
          >
            {Object.values(Mastery).map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={!selectedSkill}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
