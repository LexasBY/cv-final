import { useState } from "react";
import { Box, Avatar, ListItemText, Menu, MenuItem } from "@mui/material";
import { AccountCircle, Settings, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { client } from "../../../shared/api/apolloClient";

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
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    (document.activeElement as HTMLElement)?.blur();
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    localStorage.removeItem("access_token");
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
          minHeight: 48,
          px: 1.5,
        }}
      >
        <Avatar
          src={avatar || undefined}
          onClick={handleAvatarClick}
          sx={{
            cursor: "pointer",
            bgcolor: avatar ? "transparent" : "grey.800",
            width: 40,
            height: 40,
            mr: 1,
          }}
        >
          {!avatar && initial}
        </Avatar>

        <ListItemText
          primary={userName}
          sx={{
            color: "white",
            wordBreak: "break-word",
            opacity: isCollapsed ? 0 : 1,
            transition: "opacity 0.3s ease",
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
          <AccountCircle sx={{ mr: 1 }} /> Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/settings");
          }}
        >
          <Settings sx={{ mr: 1 }} /> Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
        >
          <Logout sx={{ mr: 1 }} /> Logout
        </MenuItem>
      </Menu>
    </>
  );
};
