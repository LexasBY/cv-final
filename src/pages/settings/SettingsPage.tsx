import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useThemeMode } from "../../shared/theme/model/useThemeMode";

type ThemeMode = "system" | "light" | "dark";
type Language = "en" | "de" | "ru";

type SettingsForm = {
  theme: ThemeMode;
  language: Language;
};

export const SettingsPage = () => {
  const { mode, setMode } = useThemeMode();

  const { control } = useForm<SettingsForm>({
    defaultValues: {
      theme: mode,
      language: "en",
    },
  });

  return (
    <>
      <Box sx={{ px: 4, pt: 3 }}>
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          Settings
        </Typography>
      </Box>

      <Box
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
          <InputLabel>Appearance</InputLabel>
          <Controller
            name="theme"
            control={control}
            render={({ field }) => (
              <Select
                label="Appearance"
                {...field}
                onChange={(e) => {
                  const value = e.target.value as ThemeMode;
                  field.onChange(value);
                  setMode(value); // ← применяем тему
                }}
              >
                <MenuItem value="system">Device settings</MenuItem>
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Language</InputLabel>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Select
                label="Language"
                {...field}
                onChange={(e) => {
                  const value = e.target.value as Language;
                  field.onChange(value);
                  console.log("Language changed:", value);
                  // Здесь можно подключить i18n.changeLanguage(value)
                }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="de">Deutsch</MenuItem>
                <MenuItem value="ru">Русский</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Box>
    </>
  );
};
