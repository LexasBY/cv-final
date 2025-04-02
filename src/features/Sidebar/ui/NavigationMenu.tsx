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
            mb: 2,
            width: "100%",
            minWidth: isCollapsed ? 70 : 300,
            color: "rgba(255,255,255,0.8)",
            borderRadius: "0 24px 24px 0",
            overflow: "visible",
            marginRight: isCollapsed ? -10 : 0,

            transition:
              "background-color 0.3s ease, color 0.3s ease, border-radius 0.3s ease, margin 0.3s ease",

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
