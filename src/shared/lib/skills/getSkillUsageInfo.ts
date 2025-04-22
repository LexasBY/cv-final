import { CvProject } from "../../../shared/api/graphql/generated";
import dayjs from "dayjs";

export const getSkillUsageInfo = (
  skillName: string,
  projects: CvProject[]
): { experience: number; lastUsed: number } => {
  const relevantProjects = projects.filter((p) =>
    p.environment?.includes(skillName)
  );

  if (relevantProjects.length === 0) {
    return { experience: 0, lastUsed: 0 };
  }

  const durations = relevantProjects.map((proj) => {
    const start = dayjs(proj.start_date);
    const end = proj.end_date ? dayjs(proj.end_date) : dayjs();
    const months = end.diff(start, "month");
    return {
      months,
      endYear: end.year(),
    };
  });

  const totalMonths = durations.reduce((sum, d) => sum + d.months, 0);
  const lastUsed = Math.max(...durations.map((d) => d.endYear));

  return {
    experience: parseFloat((totalMonths / 12).toFixed(1)),
    lastUsed,
  };
};
