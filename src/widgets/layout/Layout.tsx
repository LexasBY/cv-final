import { Box } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "rgb(53, 53, 53)",
      }}
    >
      {/* ✅ Левый сайдбар */}
      <Sidebar />

      {/* ✅ Основной контент */}
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Outlet /> {/* Это место, куда будет рендериться активная страница */}
      </Box>
    </Box>
  );
};

export default Layout;
