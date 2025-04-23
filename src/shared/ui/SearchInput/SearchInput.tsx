import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
};

export const SearchInput = ({
  value,
  onChange,
  placeholder,
  fullWidth = true,
}: SearchInputProps) => {
  const { t } = useTranslation();
  const translatedPlaceholder = placeholder || t("Search");

  return (
    <TextField
      fullWidth={fullWidth}
      variant="outlined"
      placeholder={translatedPlaceholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        maxWidth: 400,
        "& .MuiOutlinedInput-root": {
          borderRadius: "50px",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};
