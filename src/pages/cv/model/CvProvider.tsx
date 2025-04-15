import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_CV_BY_ID } from "../../../shared/api/cvs/cvs.api";
import { Cv, SkillCategory } from "../../../shared/api/graphql/generated";
import { CvContext } from "./CvContext";
import { GET_SKILL_CATEGORIES } from "../../../shared/api/user/skills.api";

export const CvProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { cvId } = useParams<{ cvId: string }>();

  const { data: cvData, refetch } = useQuery<{ cv: Cv }>(GET_CV_BY_ID, {
    variables: { cvId },
    skip: !cvId,
    fetchPolicy: "network-only",
  });

  const { data: categoriesData } = useQuery<{
    skillCategories: SkillCategory[];
  }>(GET_SKILL_CATEGORIES);

  const [cv, setCv] = useState<Cv | null>(null);

  useEffect(() => {
    if (cvData?.cv) {
      const patchedCv: Cv = {
        ...cvData.cv,
        projects: (cvData.cv.projects ?? []).map((p) => ({
          ...p,
          project: p.project ?? { id: p.id, __typename: "Project" },
        })),
      };
      setCv(patchedCv);
    }
  }, [cvData]);

  const skillCategories = categoriesData?.skillCategories || [];

  return (
    <CvContext.Provider
      value={{
        cv,
        setCv,
        refetch,
        skillCategories,
      }}
    >
      {children}
    </CvContext.Provider>
  );
};
