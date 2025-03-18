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
    <List sx={{ flexGrow: 1 }}>
      {menuItems.map((item) => (
        <ListItemButton key={item.path} component={NavLink} to={item.path}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          {!isCollapsed && <ListItemText primary={item.label} />}
        </ListItemButton>
      ))}
    </List>
  );
};
