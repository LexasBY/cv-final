// userProfile/model/useUserSkills.ts

import { useLazyQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import { Skill } from "../../../shared/api/types";

const GET_USER_SKILLS = gql`
  query getUserSkills($userId: ID!) {
    userSkills(userId: $userId) {
      id
      name
      level
    }
  }
`;

export const useUserSkills = (userId: string | undefined, active: boolean) => {
  // useLazyQuery позволяет вызывать запрос "по требованию"
  const [fetchSkills, { data, loading, error }] = useLazyQuery(GET_USER_SKILLS);

  useEffect(() => {
    if (active && userId) {
      fetchSkills({ variables: { userId } });
    }
  }, [active, userId, fetchSkills]);

  return {
    skills: (data?.userSkills as Skill[]) || [],
    loading,
    error,
  };
};
