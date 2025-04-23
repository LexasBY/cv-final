import { NavLink } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
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
  const theme = useTheme();

  return (
    <List sx={{ flexGrow: 1, py: 0 }}>
      {menuItems.map((item) => (
        <ListItemButton
          key={item.path}
          component={NavLink}
          to={item.path}
          sx={(theme) => ({
            px: 1.5,
            mb: 2,
            width: "100%",
            minWidth: isCollapsed ? theme.spacing(8) : theme.spacing(38),
            color: theme.palette.text.secondary,
            borderRadius: `0 ${theme.shape.borderRadius * 3}px ${
              theme.shape.borderRadius * 3
            }px 0`,
            overflow: "visible",
            mr: isCollapsed ? -1 : 0,
            transition: theme.transitions.create(
              ["background-color", "color", "border-radius", "margin"],
              {
                duration: theme.transitions.duration.standard,
              }
            ),
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            "&.active": {
              backgroundColor: theme.palette.action.selected,
              color: theme.palette.text.primary,
              borderRadius: `0 ${theme.shape.borderRadius * 3}px ${
                theme.shape.borderRadius * 3
              }px 0`,
            },
          })}
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
              transition: theme.transitions.create("opacity", {
                duration: theme.transitions.duration.standard,
              }),
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );
};
