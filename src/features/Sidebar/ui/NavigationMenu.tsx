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
import { useTranslation } from "react-i18next";

interface NavigationMenuProps {
  isCollapsed: boolean;
}

const menuItems = [
  { path: "/users", icon: <People />, key: "Employees" },
  { path: "/skills", icon: <TrendingUp />, key: "Skills" },
  { path: "/languages", icon: <Translate />, key: "Languages" },
  { path: "/cvs", icon: <Description />, key: "CVs" },
];

export const NavigationMenu = ({ isCollapsed }: NavigationMenuProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const itemHeight = 48;
  const itemBorderRadius = 24;

  return (
    <List sx={{ flexGrow: 1, py: 0 }}>
      {menuItems.map((item) => (
        <ListItemButton
          key={item.path}
          component={NavLink}
          to={item.path}
          sx={{
            height: itemHeight,
            minWidth: isCollapsed ? theme.spacing(7) : theme.spacing(35),
            maxWidth: isCollapsed ? theme.spacing(7) : theme.spacing(35),
            px: 1.5,
            mb: 2,
            color: theme.palette.text.secondary,
            borderRadius: `0 ${itemBorderRadius}px ${itemBorderRadius}px 0`,
            overflow: "hidden",
            mx: isCollapsed ? "auto" : 0,
            transition: theme.transitions.create(
              [
                "min-width",
                "max-width",
                "padding",
                "margin",
                "color",
                "background-color",
              ],
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
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: "inherit",
              justifyContent: "center",
              transition: theme.transitions.create("margin", {
                duration: theme.transitions.duration.shortest,
              }),
            }}
          >
            {item.icon}
          </ListItemIcon>

          <ListItemText
            primary={t(item.key)}
            sx={{
              opacity: isCollapsed ? 0 : 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              ml: isCollapsed ? 0 : 1.5,
              transition: theme.transitions.create(["opacity", "margin"], {
                duration: theme.transitions.duration.shortest,
              }),
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );
};
