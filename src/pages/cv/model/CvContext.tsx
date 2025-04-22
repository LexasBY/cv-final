import { createContext } from "react";
import { Cv, SkillCategory } from "../../../shared/api/graphql/generated";

export type CvContextType = {
  cv: Cv | null;
  setCv: React.Dispatch<React.SetStateAction<Cv | null>>;
  refetch: () => void;
  skillCategories: SkillCategory[];
};

export const CvContext = createContext<CvContextType | undefined>(undefined);
