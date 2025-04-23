import { IconButton, useTheme } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

interface SidebarToggleProps {
  isCollapsed: boolean;
  toggle: () => void;
}

export const SidebarToggle = ({ isCollapsed, toggle }: SidebarToggleProps) => {
  const theme = useTheme();

  return (
    <IconButton
      onClick={toggle}
      sx={{
        color: theme.palette.text.primary,
        width: theme.spacing(5),
        height: theme.spacing(5),
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.standard,
        }),
        transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <ChevronLeft />
    </IconButton>
  );
};
