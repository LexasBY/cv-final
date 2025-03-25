export type SkillMasteryExtended = {
  name: string;
  mastery: "Novice" | "Competent" | "Proficient" | "Advanced" | "Expert";
  category_parent_name?: string | null;
};
