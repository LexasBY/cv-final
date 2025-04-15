import { SkillCategory, SkillMastery } from "../../api/graphql/generated";

export const groupSkillsByParentCategory = (
  skills: SkillMastery[],
  categories: SkillCategory[]
): Record<string, SkillMastery[]> => {
  const categoryMap = categories.reduce<Record<string, SkillCategory>>(
    (acc, cat) => {
      acc[cat.id] = cat;
      return acc;
    },
    {}
  );

  const grouped: Record<string, SkillMastery[]> = {};
  skills.forEach((skill) => {
    const categoryId = skill.categoryId ?? undefined;
    const category = categoryId ? categoryMap[categoryId] : undefined;
    const parentCategory = category?.parent
      ? categoryMap[category.parent.id]
      : category;
    const parentName = parentCategory?.name || "Other";

    if (!grouped[parentName]) {
      grouped[parentName] = [];
    }

    grouped[parentName].push(skill);
  });

  return grouped;
};
