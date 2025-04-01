import React from "react";
import {
  useLocation,
  useParams,
  Outlet,
  useNavigate,
  Link,
} from "react-router-dom";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useCvContext } from "../model/CvContext";

export const CVPageContent: React.FC = () => {
  const { cv } = useCvContext();
  const { cvId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = location.pathname.split("/").pop();

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate(`/cvs/${cvId}/${newValue}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        <Link to="/cvs" style={{ color: "#fff", textDecoration: "none" }}>
          CVs
        </Link>{" "}
        &gt; {cv?.name || "—"}
      </Typography>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{ mb: 2 }}
        textColor="inherit"
      >
        <Tab label="Details" value="details" />
        <Tab label="Skills" value="skills" />
        <Tab label="Projects" value="projects" />
        <Tab label="Preview" value="preview" />
      </Tabs>

      <Outlet />
    </Box>
  );
};
