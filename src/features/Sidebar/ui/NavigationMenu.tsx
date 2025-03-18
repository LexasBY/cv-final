import { NavLink } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  People,
  TrendingUp,
  Translate,
  Description,
} from "@mui/icons-material";

interface NavigationMenuProps {
  isCollapsed: boolean;
}

const menuItems = [
  { path: "/users", icon: <People />, label: "Employees" },
  { path: "/skills", icon: <TrendingUp />, label: "Skills" },
  { path: "/languages", icon: <Translate />, label: "Languages" },
  { path: "/cvs", icon: <Description />, label: "CVs" },
];

export const NavigationMenu = ({ isCollapsed }: NavigationMenuProps) => {
  return (
    <List sx={{ flexGrow: 1, py: 0 }}>
      {menuItems.map((item) => (
        <ListItemButton
          key={item.path}
          component={NavLink}
          to={item.path}
          sx={{
            px: 1.5,
            minHeight: 48,
            color: "rgba(255,255,255,0.8)",

            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.05)",
            },

            "&.active": {
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#fff",

              borderRadius: "0 24px 24px 0",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: "inherit",
              justifyContent: "center",
            }}
          >
            {item.icon}
          </ListItemIcon>

          <ListItemText
            primary={item.label}
            sx={{
              opacity: isCollapsed ? 0 : 1,
              transition: "opacity 0.3s ease",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );
};
