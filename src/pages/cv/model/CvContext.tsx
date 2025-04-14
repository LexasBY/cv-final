import { createContext } from "react";
import { Cv } from "../../../shared/api/graphql/generated";

export type CvContextType = {
  cv: Cv | null;
  refetch: () => void;
  setCv: React.Dispatch<React.SetStateAction<Cv | null>>;
};

export const CvContext = createContext<CvContextType | undefined>(undefined);
