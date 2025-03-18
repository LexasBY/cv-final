import { Tabs, Tab, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export const AuthHeader = () => {
  const location = useLocation();
  const currentTab = location.pathname.includes("signup") ? 1 : 0;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgb(53, 53, 53)",
        zIndex: 1000,
        borderColor: "divider",
        display: "flex",
        justifyContent: "center",
        padding: "10px 0",
      }}
    >
      <Tabs value={currentTab} centered>
        <Tab label="Log In" component={Link} to="/auth/login" />
        <Tab label="Sign Up" component={Link} to="/auth/signup" />
      </Tabs>
    </Box>
  );
};
