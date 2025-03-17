import { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  People,
  TrendingUp,
  Translate,
  Description,
  Logout,
  Settings,
  AccountCircle,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      id
      email
      profile {
        first_name
        last_name
      }
    }
  }
`;

export const Sidebar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const userId = localStorage.getItem("userId");

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId },
    skip: !userId,
  });

  console.log("Fetching user data with userId:", userId);
  if (loading) console.log("Loading user data...");
  if (error) console.error("GraphQL Error:", error);
  if (data) console.log("GraphQL Response:", data);

  const firstName = data?.user?.profile?.first_name || "";
  const lastName = data?.user?.profile?.last_name || "";
  const email = data?.user?.email || "user@example.com";

  const userName = firstName && lastName ? `${firstName} ${lastName}` : email;

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
    <Box
      sx={{
        width: isCollapsed ? 70 : 240,
        backgroundColor: "rgb(45, 45, 45)",
        minHeight: "100vh",
        padding: 2,
        transition: "width 0.3s ease-in-out",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      <List sx={{ flexGrow: 1 }}>
        <ListItemButton component={NavLink} to="/users">
          <ListItemIcon>
            <People />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Employees" />}
        </ListItemButton>
        <ListItemButton component={NavLink} to="/skills">
          <ListItemIcon>
            <TrendingUp />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Skills" />}
        </ListItemButton>
        <ListItemButton component={NavLink} to="/languages">
          <ListItemIcon>
            <Translate />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Languages" />}
        </ListItemButton>
        <ListItemButton component={NavLink} to="/cvs">
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="CVs" />}
        </ListItemButton>
      </List>

      {loading ? (
        <CircularProgress sx={{ color: "white", mx: "auto", mt: 2 }} />
      ) : (
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
              sx={{
                cursor: "pointer",
                bgcolor: "red",
                width: 40,
                height: 40,
              }}
            />
            {!isCollapsed && (
              <ListItemText
                primary={userName}
                sx={{ ml: 2, color: "white", wordBreak: "break-word" }}
              />
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <IconButton
              onClick={() => setIsCollapsed(!isCollapsed)}
              sx={{
                color: "white",
                transition: "transform 0.3s ease-in-out",
                transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
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
      )}
    </Box>
  );
};

export default Sidebar;
