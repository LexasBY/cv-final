import { IconButton } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

interface SidebarToggleProps {
  isCollapsed: boolean;
  toggle: () => void;
}

export const SidebarToggle = ({ isCollapsed, toggle }: SidebarToggleProps) => {
  return (
    <IconButton
      onClick={toggle}
      sx={{
        color: "white",
        transition: "transform 0.3s ease-in-out",
        transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <ChevronLeft />
    </IconButton>
  );
};
