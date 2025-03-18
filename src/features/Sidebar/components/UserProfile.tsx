import { useState } from "react";
import { Box, Avatar, ListItemText, Menu, MenuItem } from "@mui/material";
import { AccountCircle, Settings, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface UserProfileProps {
  userName: string;
  userId: string | null;
  isCollapsed: boolean;
}

export const UserProfile = ({
  userName,
  userId,
  isCollapsed,
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
    localStorage.removeItem("userId");
    navigate("/auth/login");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          paddingLeft: isCollapsed ? "12px" : "16px",
          transition: "padding 0.3s ease-in-out",
          position: "relative",
        }}
      >
        <Avatar
          onClick={handleAvatarClick}
          sx={{ cursor: "pointer", bgcolor: "red", width: 40, height: 40 }}
        />
        {!isCollapsed && (
          <ListItemText
            primary={userName}
            sx={{ ml: 2, color: "white", wordBreak: "break-word" }}
          />
        )}
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
