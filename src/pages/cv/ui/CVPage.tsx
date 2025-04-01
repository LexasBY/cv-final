import React from "react";
import { CVPageContent } from "./CVPageContent";
import { CvProvider } from "../model/CvProvider";

export const CVPage: React.FC = () => {
  return (
    <CvProvider>
      <CVPageContent />
    </CvProvider>
  );
};
