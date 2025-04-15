import React from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useCvContext } from "../../../pages/cv/model/useCvContext";
import { Mastery, Proficiency } from "../../../shared/api/graphql/generated";
import { groupSkillsByParentCategory } from "../../../shared/lib/skills/groupSkillsByParent";
import { getSkillUsageInfo } from "../../../shared/lib/skills/getSkillUsageInfo";

export const CVPreviewPage: React.FC = () => {
  const { cv, skillCategories } = useCvContext();

  if (!cv) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">CV not found</Typography>
      </Box>
    );
  }

  const user = cv.user;
  const skills = cv.skills || [];
  const languages = cv.languages || [];
  const projects = cv.projects || [];

  const getMasteryLabel = (level: Mastery) => level;
  const getProficiencyLabel = (level: Proficiency) => level;

  const groupedSkills = groupSkillsByParentCategory(skills, skillCategories);

  const uniqueDomains = Array.from(
    new Set(projects.map((p) => p.domain).filter(Boolean))
  );

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h4">{user?.profile.full_name}</Typography>
          <Typography variant="subtitle1">
            {String(user?.position?.name) || "—"}
          </Typography>
        </Box>
        <Button variant="outlined" color="error">
          EXPORT PDF
        </Button>
      </Box>

      {/* Main Split Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Education
          </Typography>
          <Typography paragraph>{cv.education || "—"}</Typography>

          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Language proficiency
          </Typography>
          {languages.map((lang) => (
            <Typography key={lang.name}>
              {lang.name} — {getProficiencyLabel(lang.proficiency)}
            </Typography>
          ))}

          <Box mt={2}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Domains
            </Typography>
            {uniqueDomains.length > 0 ? (
              <Typography>{uniqueDomains.join(", ")}</Typography>
            ) : (
              <Typography>—</Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            {cv.name}
          </Typography>
          <Typography paragraph>{cv.description}</Typography>

          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Skills
          </Typography>
          {Object.entries(groupedSkills).map(([category, list]) => (
            <Box key={category} sx={{ mb: 1 }}>
              <Typography sx={{ fontWeight: "bold" }}>{category}</Typography>
              {list.map((s) => (
                <Typography key={s.name} sx={{ ml: 1 }}>
                  {s.name} — {getMasteryLabel(s.mastery)}
                </Typography>
              ))}
            </Box>
          ))}
        </Grid>
      </Grid>

      {/* Projects */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>
        Projects
      </Typography>

      {projects.map((proj) => (
        <Grid container spacing={3} sx={{ mb: 4 }} key={proj.id}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="error" fontWeight="bold">
              {proj.name}
            </Typography>
            <Typography>{proj.description}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {proj.roles?.length > 0 && (
              <Box mb={1}>
                <Typography fontWeight="bold">Project roles</Typography>
                <Typography>{proj.roles.join(", ")}</Typography>
              </Box>
            )}
            <Box mb={1}>
              <Typography fontWeight="bold">Period</Typography>
              <Typography>
                {proj.start_date?.slice(0, 7)} –{" "}
                {proj.end_date?.slice(0, 7) || "Till now"}
              </Typography>
            </Box>
            {proj.responsibilities?.length > 0 && (
              <Box mb={1}>
                <Typography fontWeight="bold">Responsibilities</Typography>
                <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                  {proj.responsibilities.map((r, i) => (
                    <li key={i}>
                      <Typography>{r}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}
            {proj.environment?.length > 0 && (
              <Box>
                <Typography fontWeight="bold">Environment</Typography>
                <Typography>{proj.environment.join(", ")}</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      ))}

      {/* Professional Skills */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>
        Professional skills
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>SKILLS</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} />
            <TableCell sx={{ fontWeight: "bold" }}>
              EXPERIENCE IN YEARS
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>LAST USED</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.entries(groupedSkills).map(([category, list]) => {
            return list.map((s, idx) => {
              const { experience, lastUsed } = getSkillUsageInfo(
                s.name,
                projects
              );
              const isLast = idx === list.length - 1;

              return (
                <TableRow
                  key={`${category}-${s.name}`}
                  sx={{
                    borderBottom: isLast
                      ? "1px solid rgba(255, 255, 255, 0.12)"
                      : "none",
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "error.main",
                      verticalAlign: "top",
                      pt: 2,
                      borderBottom: "none",
                    }}
                  >
                    {idx === 0 ? category : ""}
                  </TableCell>
                  <TableCell sx={{ pl: 2, borderBottom: "none" }}>
                    {s.name}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {experience > 0 ? experience : ""}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {lastUsed || ""}
                  </TableCell>
                </TableRow>
              );
            });
          })}
        </TableBody>
      </Table>
    </Box>
  );
};
