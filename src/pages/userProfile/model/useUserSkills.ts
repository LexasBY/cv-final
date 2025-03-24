import { useLazyQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import { Skill } from "../../../shared/api/graphql/generated";

const GET_USER_SKILLS = gql`
  query getUserSkills($userId: ID!) {
    profile(userId: $userId) {
      id
      skills {
        name
        categoryId
        mastery
        __typename
      }
    }
  }
`;

export const useUserSkills = (userId: string | undefined, active: boolean) => {
  const [fetchSkills, { data, loading, error }] = useLazyQuery(GET_USER_SKILLS);

  useEffect(() => {
    if (active && userId) {
      fetchSkills({ variables: { userId } });
    }
  }, [active, userId, fetchSkills]);

  return {
    skills: (data?.profile?.skills as Skill[]) || [],
    loading,
    error,
  };
};
