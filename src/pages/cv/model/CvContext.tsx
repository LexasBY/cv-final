import { createContext } from "react";
import { Cv } from "../../../shared/api/graphql/generated";

export type CvContextType = {
  cv: Cv | null;
  setCv: React.Dispatch<React.SetStateAction<Cv | null>>;
  refetch: () => void;
};

export const CvContext = createContext<CvContextType | undefined>(undefined);
