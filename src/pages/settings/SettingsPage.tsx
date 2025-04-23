import { useTranslation } from "react-i18next";
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
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language as Language;

  return (
    <>
      <Box sx={{ px: 4, pt: 3 }}>
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          {t("Settings")}
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
            label={t("Appearance")}
            value={mode}
            onChange={(e) => setMode(e.target.value as ThemeMode)}
          >
            <MenuItem value="system">{t("Device settings")}</MenuItem>
            <MenuItem value="light">{t("Light")}</MenuItem>
            <MenuItem value="dark">{t("Dark")}</MenuItem>
          </TextField>
        </FormControl>

        <FormControl fullWidth>
          <TextField
            select
            label={t("Language")}
            value={currentLang}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
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
