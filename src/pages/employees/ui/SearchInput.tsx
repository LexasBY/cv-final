import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        maxWidth: 400,
        "& .MuiOutlinedInput-root": {
          borderRadius: "50px",
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
