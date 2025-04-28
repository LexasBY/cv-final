import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { NavigationMenu } from "./NavigationMenu";
import { UserProfile } from "./UserProfile";
import { SidebarToggle } from "./SidebarToggle";
import { useUser } from "../model/useUser";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userName, loading, userId, avatar } = useUser();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <Box
      component="aside"
      sx={{
        width: isCollapsed ? 90 : 300,
        minHeight: "100vh",
        padding: "32px 0 0 0",
        transition: "width 0.3s ease-in-out",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <NavigationMenu isCollapsed={isCollapsed} />
      {loading ? (
        <CircularProgress sx={{ color: "white", mx: "auto", mt: 2 }} />
      ) : (
        <>
          <UserProfile
            userName={userName}
            userId={userId}
            isCollapsed={isCollapsed}
            avatar={avatar}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              pl: 1.5,
            }}
          >
            <SidebarToggle isCollapsed={isCollapsed} toggle={toggleSidebar} />
          </Box>
        </>
      )}
    </Box>
  );
};
