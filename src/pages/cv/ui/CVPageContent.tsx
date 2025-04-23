import React from "react";
import { useLocation, useParams, Outlet, useNavigate } from "react-router-dom";
import { Box, Tabs, Tab, Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useCvContext } from "../model/useCvContext";

export const CVPageContent: React.FC = () => {
  const { cv } = useCvContext();
  const { cvId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = location.pathname.split("/").pop() || "details";

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate(`/cvs/${cvId}/${newValue}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", color: "text.primary" }}
      >
        <MuiLink
          component={RouterLink}
          to="/cvs"
          sx={{
            color: "inherit",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          CVs
        </MuiLink>{" "}
        &gt; {cv?.name || "—"}
      </Typography>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{ mb: 2 }}
        textColor="primary"
        indicatorColor="primary"
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
