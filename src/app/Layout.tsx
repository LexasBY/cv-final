import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../features/Sidebar";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Sidebar />

      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
