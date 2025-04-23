import React, { useState } from "react";
import {
  Box,
  Avatar,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { AccountCircle, Settings, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { client } from "../../../shared/api/apolloClient";
import { useTranslation } from "react-i18next";

interface UserProfileProps {
  userName: string;
  userId: string | null;
  isCollapsed: boolean;
  avatar?: string;
}

export const UserProfile = ({
  userName,
  userId,
  isCollapsed,
  avatar,
}: UserProfileProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    (document.activeElement as HTMLElement)?.blur();
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    await client.clearStore();
    navigate("/auth/login");
  };

  const initial = userName?.charAt(0)?.toUpperCase() || "?";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          position: "relative",
          minHeight: theme.spacing(6),
          px: theme.spacing(1.5),
        }}
      >
        <Avatar
          src={avatar || undefined}
          onClick={handleAvatarClick}
          sx={{
            cursor: "pointer",
            bgcolor: avatar ? "transparent" : theme.palette.grey[800],
            width: theme.spacing(5),
            height: theme.spacing(5),
            mr: theme.spacing(1),
          }}
        >
          {!avatar && initial}
        </Avatar>

        <ListItemText
          primary={userName}
          sx={{
            color: theme.palette.text.primary,
            wordBreak: "break-word",
            opacity: isCollapsed ? 0 : 1,
            transition: theme.transitions.create("opacity", {
              duration: theme.transitions.duration.standard,
            }),
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/users/${userId}`);
          }}
        >
          <AccountCircle sx={{ mr: theme.spacing(1) }} /> {t("Profile")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/settings");
          }}
        >
          <Settings sx={{ mr: theme.spacing(1) }} /> {t("Settings")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
        >
          <Logout sx={{ mr: theme.spacing(1) }} /> {t("Logout")}
        </MenuItem>
      </Menu>
    </>
  );
};
