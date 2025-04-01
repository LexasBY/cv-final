import React, { createContext, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_CV_BY_ID } from "../../../shared/api/cvs/cvs.api";
import { useParams } from "react-router-dom";
import { Cv } from "../../../shared/api/graphql/generated";

type CvContextType = {
  cv: Cv | null;
  refetch: () => void;
};

const CvContext = createContext<CvContextType | undefined>(undefined);

export const useCvContext = () => {
  const context = useContext(CvContext);
  if (!context) {
    throw new Error("useCvContext must be used within CvProvider");
  }
  return context;
};

export const CvProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { cvId } = useParams<{ cvId: string }>();
  const { data, refetch } = useQuery<{ cv: Cv }>(GET_CV_BY_ID, {
    variables: { cvId },
    skip: !cvId,
  });

  return (
    <CvContext.Provider value={{ cv: data?.cv || null, refetch }}>
      {children}
    </CvContext.Provider>
  );
};
