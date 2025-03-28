import { useState } from "react";
import { Box, Avatar, ListItemText, Menu, MenuItem } from "@mui/material";
import { AccountCircle, Settings, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
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
            bgcolor: avatar ? "transparent" : "gray",
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

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => navigate(`/users/${userId}`)}>
          <AccountCircle sx={{ marginRight: 1 }} /> Profile
        </MenuItem>
        <MenuItem>
          <Settings sx={{ marginRight: 1 }} /> Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ marginRight: 1 }} /> Logout
        </MenuItem>
      </Menu>
    </>
  );
};
