import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
};

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search",
  fullWidth = true,
}: SearchInputProps) => {
  return (
    <TextField
      fullWidth={fullWidth}
      variant="outlined"
      placeholder={placeholder}
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
