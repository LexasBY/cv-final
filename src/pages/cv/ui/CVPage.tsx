import React from "react";
import { CvProvider } from "../model/CvContext";
import { CVPageContent } from "./CVPageContent";

export const CVPage: React.FC = () => {
  return (
    <CvProvider>
      <CVPageContent />
    </CvProvider>
  );
};
