import React, { useEffect, useState } from "react";
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
} from "@mui/material";

type Option = {
  label: string;
  value: string;
};

type GenericModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (itemValue: string, level: string) => void;
  title: string;
  itemLabel: string;
  levelLabel: string;
  options: Option[];
  levels: Option[];
  initialItemValue?: string;
  initialLevel?: string;
  disableItemSelect?: boolean;
};

export const GenericModal: React.FC<GenericModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  itemLabel,
  levelLabel,
  options,
  levels,
  initialItemValue = "",
  initialLevel = levels[0]?.value || "",
  disableItemSelect = false,
}) => {
  const [selectedItem, setSelectedItem] = useState(initialItemValue);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);

  useEffect(() => {
    setSelectedItem(initialItemValue);
    setSelectedLevel(initialLevel);
  }, [initialItemValue, initialLevel]);

  const handleConfirm = () => {
    if (selectedItem) {
      onConfirm(selectedItem, selectedLevel);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}
      >
        <FormControl fullWidth disabled={disableItemSelect}>
          <InputLabel>{itemLabel}</InputLabel>
          <Select
            value={selectedItem}
            label={itemLabel}
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>{levelLabel}</InputLabel>
          <Select
            value={selectedLevel}
            label={levelLabel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            {levels.map((level) => (
              <MenuItem key={level.value} value={level.value}>
                {level.label}
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
          disabled={!selectedItem}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
