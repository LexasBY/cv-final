// import React, { useRef } from "react";
// import {
//   Box,
//   Typography,
//   Divider,
//   Grid,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "@mui/material";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { useCvContext } from "../../../pages/cv/model/useCvContext";
// import { Mastery, Proficiency } from "../../../shared/api/graphql/generated";
// import { groupSkillsByParentCategory } from "../../../shared/lib/skills/groupSkillsByParent";
// import { getSkillUsageInfo } from "../../../shared/lib/skills/getSkillUsageInfo";

// export const CVPreviewPage: React.FC = () => {
//   const { cv, skillCategories } = useCvContext();

//   const mainRef = useRef<HTMLDivElement>(null);
//   const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
//   const skillsRef = useRef<HTMLDivElement>(null);

//   if (!cv) {
//     return (
//       <Box sx={{ p: 4 }}>
//         <Typography color="error">CV not found</Typography>
//       </Box>
//     );
//   }

//   const user = cv.user;
//   const skills = cv.skills || [];
//   const languages = cv.languages || [];
//   const projects = cv.projects || [];
//   const groupedSkills = groupSkillsByParentCategory(skills, skillCategories);
//   const uniqueDomains = Array.from(
//     new Set(projects.map((p) => p.domain).filter(Boolean))
//   );

//   const getMasteryLabel = (level: Mastery) => level;
//   const getProficiencyLabel = (level: Proficiency) => level;

//   const exportPdf = async () => {
//     try {
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const margin = 10;
//       const usableWidth = pdfWidth - 2 * margin;

//       const captureAndAdd = async (el: HTMLElement, addPage = false) => {
//         const canvas = await html2canvas(el, {
//           scale: 1.5,
//           backgroundColor: "#ffffff",
//           useCORS: true,
//           onclone: (doc) => {
//             const style = doc.createElement("style");
//             style.innerHTML = `* { color: #000 !important; background: #fff !important; }`;
//             doc.head.appendChild(style);
//           },
//         });

//         const imgData = canvas.toDataURL("image/png");
//         if (!imgData || imgData.length < 1000) return;

//         const imgHeight = (canvas.height * usableWidth) / canvas.width;
//         const pageHeight = pdfHeight - 2 * margin;

//         if (imgHeight <= pageHeight) {
//           if (addPage) pdf.addPage();
//           pdf.addImage(imgData, "PNG", margin, margin, usableWidth, imgHeight);
//         } else {
//           let position = 0;
//           if (addPage) pdf.addPage();
//           while (position < imgHeight) {
//             if (position !== 0) pdf.addPage();
//             pdf.addImage(
//               imgData,
//               "PNG",
//               margin,
//               margin - position,
//               usableWidth,
//               imgHeight
//             );
//             position += pageHeight;
//           }
//         }
//       };

//       if (mainRef.current) await captureAndAdd(mainRef.current);
//       if (projectsRef.current.length > 0) {
//         for (let i = 0; i < projectsRef.current.length; i++) {
//           const ref = projectsRef.current[i];
//           if (ref) await captureAndAdd(ref, true);
//         }
//       }
//       if (skillsRef.current) await captureAndAdd(skillsRef.current, true);
//       pdf.save(`${cv.name || "cv"}.pdf`);
//     } catch (error) {
//       console.error("Ошибка при экспорте PDF", error);
//     }
//   };

//   return (
//     <Box sx={{ p: 4, maxWidth: 1200, mx: "auto", fontSize: "1.2rem" }}>
//       <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//         <Button variant="outlined" color="error" onClick={exportPdf}>
//           EXPORT PDF
//         </Button>
//       </Box>

//       <Box ref={mainRef}>
//         <Box sx={{ mb: 3 }}>
//           <Typography variant="h3" fontWeight="bold">
//             {user?.profile.full_name}
//           </Typography>
//           <Typography variant="h4" sx={{ lineHeight: 1.4 }}>
//             {String(user?.position?.name) || "—"}
//           </Typography>
//         </Box>

//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               Education
//             </Typography>
//             <Typography paragraph>{cv.education || "—"}</Typography>

//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               Language proficiency
//             </Typography>
//             {languages.map((lang) => (
//               <Typography key={lang.name}>
//                 {lang.name} — {getProficiencyLabel(lang.proficiency)}
//               </Typography>
//             ))}

//             <Box mt={2}>
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 Domains
//               </Typography>
//               <Typography>
//                 {uniqueDomains.length > 0 ? uniqueDomains.join(", ") : "—"}
//               </Typography>
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               {cv.name}
//             </Typography>
//             <Typography paragraph>{cv.description}</Typography>

//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               Skills
//             </Typography>
//             {Object.entries(groupedSkills).map(([category, list]) => (
//               <Box key={category} sx={{ mb: 1 }}>
//                 <Typography sx={{ fontWeight: "bold" }}>{category}</Typography>
//                 {list.map((s) => (
//                   <Typography key={s.name} sx={{ ml: 1 }}>
//                     {s.name} — {getMasteryLabel(s.mastery)}
//                   </Typography>
//                 ))}
//               </Box>
//             ))}
//           </Grid>
//         </Grid>
//       </Box>

//       <Divider sx={{ my: 4 }} />
//       {projects.map((proj, idx) => (
//         <Box
//           key={proj.id}
//           ref={(el) => {
//             projectsRef.current[idx] = el as HTMLDivElement | null;
//           }}
//           sx={{ mb: 4 }}
//         >
//           {idx === 0 && (
//             <Typography variant="h5" gutterBottom>
//               Projects
//             </Typography>
//           )}
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Typography variant="h6" color="error" fontWeight="bold">
//                 {proj.name}
//               </Typography>
//               <Typography>{proj.description}</Typography>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               {proj.roles?.length > 0 && (
//                 <Box mb={1}>
//                   <Typography fontWeight="bold">Project roles</Typography>
//                   <Typography>{proj.roles.join(", ")}</Typography>
//                 </Box>
//               )}
//               <Box mb={1}>
//                 <Typography fontWeight="bold">Period</Typography>
//                 <Typography>
//                   {proj.start_date?.slice(0, 7)} –{" "}
//                   {proj.end_date?.slice(0, 7) || "Till now"}
//                 </Typography>
//               </Box>
//               {proj.responsibilities?.length > 0 && (
//                 <Box mb={1}>
//                   <Typography fontWeight="bold">Responsibilities</Typography>
//                   <ul style={{ margin: 0, paddingLeft: "1rem" }}>
//                     {proj.responsibilities.map((r, i) => (
//                       <li key={i}>
//                         <Typography>{r}</Typography>
//                       </li>
//                     ))}
//                   </ul>
//                 </Box>
//               )}
//               {proj.environment?.length > 0 && (
//                 <Box>
//                   <Typography fontWeight="bold">Environment</Typography>
//                   <Typography>{proj.environment.join(", ")}</Typography>
//                 </Box>
//               )}
//             </Grid>
//           </Grid>
//         </Box>
//       ))}

//       <Divider sx={{ my: 4 }} />
//       <Box ref={skillsRef}>
//         <Typography variant="h5" gutterBottom>
//           Professional skills
//         </Typography>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold" }}>SKILLS</TableCell>
//               <TableCell />
//               <TableCell sx={{ fontWeight: "bold" }}>
//                 EXPERIENCE IN YEARS
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>LAST USED</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {Object.entries(groupedSkills).map(([category, list]) =>
//               list.map((s, idx) => {
//                 const { experience, lastUsed } = getSkillUsageInfo(
//                   s.name,
//                   projects
//                 );
//                 return (
//                   <TableRow key={`${category}-${s.name}`}>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         color: "error.main",
//                         verticalAlign: "top",
//                         pt: 2,
//                         borderBottom: "none",
//                       }}
//                     >
//                       {idx === 0 ? category : ""}
//                     </TableCell>
//                     <TableCell sx={{ pl: 2, borderBottom: "none" }}>
//                       {s.name}
//                     </TableCell>
//                     <TableCell sx={{ borderBottom: "none" }}>
//                       {experience > 0 ? experience : ""}
//                     </TableCell>
//                     <TableCell sx={{ borderBottom: "none" }}>
//                       {lastUsed || ""}
//                     </TableCell>
//                   </TableRow>
//                 );
//               })
//             )}
//           </TableBody>
//         </Table>
//       </Box>
//     </Box>
//   );
// };
