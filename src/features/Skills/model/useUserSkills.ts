import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_USER_SKILLS } from "../../../shared/api/user/skills.api";
import { SkillMastery } from "../../../shared/api/graphql/generated";

export const useUserSkills = (userId: string | undefined, active: boolean) => {
  const [fetchSkills, { data, loading, error }] = useLazyQuery(GET_USER_SKILLS);

  useEffect(() => {
    if (active && userId) {
      fetchSkills({ variables: { userId } });
    }
  }, [active, userId, fetchSkills]);

  return {
    skills: (data?.profile?.skills as SkillMastery[]) || [],
    loading,
    error,
  };
};
