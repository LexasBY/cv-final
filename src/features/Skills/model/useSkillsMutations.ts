import { useMutation, ApolloCache } from "@apollo/client";
import {
  ADD_PROFILE_SKILL,
  UPDATE_PROFILE_SKILL,
  DELETE_PROFILE_SKILL,
  GET_USER_SKILLS,
} from "../../../shared/api/user/skills.api";
import { SkillMastery } from "../../../shared/api/graphql/generated";

interface UserProfile {
  skills: SkillMastery[];
}

interface UserSkillsData {
  profile: UserProfile;
}

interface AddSkillInput {
  userId: string;
  name: string;
  mastery: string;
  categoryId?: string;
}

interface DeleteSkillInput {
  userId: string;
  name: string;
}

export const useSkillsMutations = (userId: string) => {
  const [addSkillMutation] = useMutation<
    { addProfileSkill: SkillMastery },
    { skill: AddSkillInput }
  >(ADD_PROFILE_SKILL, {
    update: (
      cache: ApolloCache<{ addProfileSkill: SkillMastery }>,
      { data }
    ) => {
      if (!data) return;
      const existing = cache.readQuery<UserSkillsData>({
        query: GET_USER_SKILLS,
        variables: { userId },
      });
      if (existing) {
        cache.writeQuery({
          query: GET_USER_SKILLS,
          variables: { userId },
          data: {
            profile: {
              ...existing.profile,
              skills: [...existing.profile.skills, data.addProfileSkill],
            },
          },
        });
      }
    },
  });

  const [updateSkillMutation] = useMutation<
    { updateProfileSkill: SkillMastery },
    { skill: AddSkillInput }
  >(UPDATE_PROFILE_SKILL, {
    update: (
      cache: ApolloCache<{ updateProfileSkill: SkillMastery }>,
      { data }
    ) => {
      if (!data) return;
      const existing = cache.readQuery<UserSkillsData>({
        query: GET_USER_SKILLS,
        variables: { userId },
      });
      if (existing) {
        cache.writeQuery({
          query: GET_USER_SKILLS,
          variables: { userId },
          data: {
            profile: {
              ...existing.profile,
              skills: existing.profile.skills.map((s) =>
                s.name === data.updateProfileSkill.name
                  ? data.updateProfileSkill
                  : s
              ),
            },
          },
        });
      }
    },
  });

  const [deleteSkillMutation] = useMutation<
    { deleteProfileSkill: SkillMastery },
    { skill: DeleteSkillInput }
  >(DELETE_PROFILE_SKILL, {
    update: (
      cache: ApolloCache<{ deleteProfileSkill: SkillMastery }>,
      { data }
    ) => {
      if (!data) return;
      const existing = cache.readQuery<UserSkillsData>({
        query: GET_USER_SKILLS,
        variables: { userId },
      });
      if (existing) {
        cache.writeQuery({
          query: GET_USER_SKILLS,
          variables: { userId },
          data: {
            profile: {
              ...existing.profile,
              skills: existing.profile.skills.filter(
                (s) => s.name !== data.deleteProfileSkill.name
              ),
            },
          },
        });
      }
    },
  });

  return {
    addSkillMutation,
    updateSkillMutation,
    deleteSkillMutation,
  };
};
