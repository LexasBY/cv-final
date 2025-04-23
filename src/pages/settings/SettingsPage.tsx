import { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  TextField,
  FormControl,
} from "@mui/material";
import { useThemeMode } from "../../shared/theme/model/useThemeMode";

type ThemeMode = "system" | "light" | "dark";
type Language = "en" | "de" | "ru";

export const SettingsPage = () => {
  const { mode, setMode } = useThemeMode();
  const [language, setLanguage] = useState<Language>("en");

  return (
    <>
      <Box sx={{ px: 4, pt: 3 }}>
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          Settings
        </Typography>
      </Box>

      <Box
        component="form"
        sx={{
          px: 4,
          py: 6,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          maxWidth: 800,
          mx: "auto",
        }}
      >
        <FormControl fullWidth>
          <TextField
            select
            label="Appearance"
            value={mode}
            onChange={(e) => setMode(e.target.value as ThemeMode)}
          >
            <MenuItem value="system">Device settings</MenuItem>
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </TextField>
        </FormControl>

        <FormControl fullWidth>
          <TextField
            select
            label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="de">Deutsch</MenuItem>
            <MenuItem value="ru">Русский</MenuItem>
          </TextField>
        </FormControl>
      </Box>
    </>
  );
};
