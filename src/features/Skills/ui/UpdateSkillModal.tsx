import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { Mastery } from "../../../shared/api/graphql/generated";

type UpdateSkillModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (mastery: Mastery) => void;
  skillName: string;
  currentMastery: Mastery;
};

export const UpdateSkillModal: React.FC<UpdateSkillModalProps> = ({
  open,
  onClose,
  onConfirm,
  skillName,
  currentMastery,
}) => {
  const [selectedMastery, setSelectedMastery] =
    React.useState<Mastery>(currentMastery);

  const handleConfirm = () => onConfirm(selectedMastery);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update skill</DialogTitle>
      <DialogContent sx={{ minWidth: 400 }}>
        <Box mt={2}>
          <FormControl fullWidth disabled>
            <InputLabel>Skill</InputLabel>
            <Select value={skillName} label="Skill">
              <MenuItem value={skillName}>{skillName}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box mt={2}>
          <FormControl fullWidth>
            <InputLabel>Skill mastery</InputLabel>
            <Select
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
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
