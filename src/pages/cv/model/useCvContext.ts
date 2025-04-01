import { useContext } from "react";
import { CvContext } from "./CvContext";

export const useCvContext = () => {
  const context = useContext(CvContext);
  if (!context) {
    throw new Error("useCvContext must be used within CvProvider");
  }
  return context;
};
