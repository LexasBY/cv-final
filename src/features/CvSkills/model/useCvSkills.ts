import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { SkillMastery } from "../../../shared/api/graphql/generated";
import { GET_CV_SKILLS } from "../../../shared/api/cvs/cvs.api";

export const useCvSkills = (cvId: string | undefined, active: boolean) => {
  const [fetchSkills, { data, loading, error }] = useLazyQuery(GET_CV_SKILLS);

  useEffect(() => {
    if (active && cvId) {
      fetchSkills({ variables: { cvId } });
    }
  }, [active, cvId, fetchSkills]);

  return {
    skills: (data?.cv?.skills as SkillMastery[]) || [],
    loading,
    error,
  };
};
