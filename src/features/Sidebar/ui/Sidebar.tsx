import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { NavigationMenu } from "./NavigationMenu";
import { UserProfile } from "./UserProfile";
import { SidebarToggle } from "./SidebarToggle";
import { useUser } from "../model/useUser";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userName, loading, userId } = useUser();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <Box
      component="aside"
      sx={{
        width: isCollapsed ? 70 : 240,
        backgroundColor: "rgb(45, 45, 45)",
        minHeight: "100vh",
        padding: "32px 0 0 0",
        transition: "width 0.3s ease-in-out",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
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
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <SidebarToggle isCollapsed={isCollapsed} toggle={toggleSidebar} />
          </Box>
        </>
      )}
    </Box>
  );
};
