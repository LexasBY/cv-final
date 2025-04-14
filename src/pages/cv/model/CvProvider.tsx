import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_CV_BY_ID } from "../../../shared/api/cvs/cvs.api";
import { Cv } from "../../../shared/api/graphql/generated";
import { CvContext } from "./CvContext";

export const CvProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { cvId } = useParams<{ cvId: string }>();
  const { data, refetch } = useQuery<{ cv: Cv }>(GET_CV_BY_ID, {
    variables: { cvId },
    skip: !cvId,
    fetchPolicy: "network-only",
  });

  const [cvData, setCvData] = useState<Cv | null>(null);

  useEffect(() => {
    if (data?.cv) {
      const patchedCv: Cv = {
        ...data.cv,
        projects: (data.cv.projects ?? []).map((p) => ({
          ...p,
          project: p.project ?? { id: p.id, __typename: "Project" },
        })),
      };
      setCvData(patchedCv);
    }
  }, [data]);

  return (
    <CvContext.Provider value={{ cv: cvData, setCv: setCvData, refetch }}>
      {children}
    </CvContext.Provider>
  );
};
