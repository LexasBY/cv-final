import React, { useRef } from "react";
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
import { useTranslation } from "react-i18next";
import { useCvContext } from "../../../pages/cv/model/useCvContext";
import { Mastery, Proficiency } from "../../../shared/api/graphql/generated";
import { groupSkillsByParentCategory } from "../../../shared/lib/skills/groupSkillsByParent";
import { getSkillUsageInfo } from "../../../shared/lib/skills/getSkillUsageInfo";
import { useExportPdf } from "../model/useExportPdf";
import { prepareHtml } from "../model/prepareHtml";

export const CVPreviewPage: React.FC = () => {
  const { t } = useTranslation();
  const { cv, skillCategories } = useCvContext();
  const { exportPdf } = useExportPdf();
  const contentRef = useRef<HTMLDivElement>(null);

  if (!cv) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">{t("CV not found")}</Typography>
      </Box>
    );
  }

  const user = cv.user;
  const skills = cv.skills || [];
  const languages = cv.languages || [];
  const projects = cv.projects || [];
  const groupedSkills = groupSkillsByParentCategory(skills, skillCategories);
  const uniqueDomains = Array.from(
    new Set(projects.map((p) => p.domain).filter(Boolean))
  );

  const getMasteryLabel = (level: Mastery) => level;
  const getProficiencyLabel = (level: Proficiency) => level;

  const handleExport = async () => {
    if (!contentRef.current) return;

    const html = prepareHtml(contentRef.current);
    try {
      const base64pdf = await exportPdf(html);
      if (base64pdf) {
        const blob = new Blob(
          [Uint8Array.from(atob(base64pdf), (c) => c.charCodeAt(0))],
          { type: "application/pdf" }
        );
        const url = URL.createObjectURL(blob);
        window.open(url);
      }
    } catch (err) {
      console.error("PDF export failed", err);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto", fontSize: "1.2rem" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="outlined" color="error" onClick={handleExport}>
          {t("Export PDF")}
        </Button>
      </Box>

      <Box ref={contentRef} id="cv-html-content">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" fontWeight="bold">
            {user?.profile.full_name}
          </Typography>
          <Typography variant="h4" sx={{ lineHeight: 1.4 }}>
            {String(user?.position?.name) || "—"}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {t("Education")}
            </Typography>
            <Typography paragraph>{cv.education || "—"}</Typography>

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {t("Language proficiency")}
            </Typography>
            {languages.map((lang) => (
              <Typography key={lang.name}>
                {lang.name} — {getProficiencyLabel(lang.proficiency)}
              </Typography>
            ))}

            <Box mt={2}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {t("Domains")}
              </Typography>
              <Typography>
                {uniqueDomains.length > 0 ? uniqueDomains.join(", ") : "—"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {cv.name}
            </Typography>
            <Typography paragraph>{cv.description}</Typography>

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {t("Skills")}
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

        <Divider sx={{ my: 4 }} />
        <Typography variant="h5" gutterBottom>
          {t("Projects")}
        </Typography>
        {projects.map((proj) => (
          <Box key={proj.id} sx={{ mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" color="error" fontWeight="bold">
                  {proj.name}
                </Typography>
                <Typography>{proj.description}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                {proj.roles?.length > 0 && (
                  <Box mb={1}>
                    <Typography fontWeight="bold">
                      {t("Project roles")}
                    </Typography>
                    <Typography>{proj.roles.join(", ")}</Typography>
                  </Box>
                )}
                <Box mb={1}>
                  <Typography fontWeight="bold">{t("Period")}</Typography>
                  <Typography>
                    {proj.start_date?.slice(0, 7)} –{" "}
                    {proj.end_date?.slice(0, 7) || t("Till now")}
                  </Typography>
                </Box>
                {proj.responsibilities?.length > 0 && (
                  <Box mb={1}>
                    <Typography fontWeight="bold">
                      {t("Responsibilities")}
                    </Typography>
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
                    <Typography fontWeight="bold">
                      {t("Environment")}
                    </Typography>
                    <Typography>{proj.environment.join(", ")}</Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        ))}

        <Divider sx={{ my: 4 }} />
        <Typography variant="h5" gutterBottom>
          {t("Professional skills")}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>{t("Skills")}</TableCell>
              <TableCell />
              <TableCell sx={{ fontWeight: "bold" }}>
                {t("Experience in years")}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {t("Last used")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(groupedSkills).map(([category, list]) =>
              list.map((s, idx) => {
                const { experience, lastUsed } = getSkillUsageInfo(
                  s.name,
                  projects
                );
                return (
                  <TableRow key={`${category}-${s.name}`}>
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
              })
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
