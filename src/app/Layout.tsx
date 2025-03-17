import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../widgets/sidebar/Sidebar";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "rgb(53, 53, 53)",
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
