import { useMutation, ApolloCache } from "@apollo/client";

import { SkillMastery } from "../../../shared/api/graphql/generated";
import {
  ADD_CV_SKILL,
  DELETE_CV_SKILL,
  GET_CV_SKILLS,
  UPDATE_CV_SKILL,
} from "../../../shared/api/cvs/cvs.api";

interface CvSkillData {
  cv: {
    skills: SkillMastery[];
  };
}

interface AddCvSkillInput {
  cvId: string;
  name: string;
  mastery: string;
  categoryId?: string;
}

interface DeleteCvSkillInput {
  cvId: string;
  name: string[];
}

export const useCvSkillsMutations = (cvId: string) => {
  const [addSkillMutation] = useMutation<
    { addCvSkill: SkillMastery },
    { skill: AddCvSkillInput }
  >(ADD_CV_SKILL, {
    update: (cache: ApolloCache<{ addCvSkill: SkillMastery }>, { data }) => {
      if (!data) return;
      const existing = cache.readQuery<CvSkillData>({
        query: GET_CV_SKILLS,
        variables: { cvId },
      });
      if (existing) {
        cache.writeQuery({
          query: GET_CV_SKILLS,
          variables: { cvId },
          data: {
            cv: {
              ...existing.cv,
              skills: [...existing.cv.skills, data.addCvSkill],
            },
          },
        });
      }
    },
  });

  const [updateSkillMutation] = useMutation<
    { updateCvSkill: SkillMastery },
    { skill: AddCvSkillInput }
  >(UPDATE_CV_SKILL, {
    update: (cache: ApolloCache<{ updateCvSkill: SkillMastery }>, { data }) => {
      if (!data) return;
      const existing = cache.readQuery<CvSkillData>({
        query: GET_CV_SKILLS,
        variables: { cvId },
      });
      if (existing) {
        cache.writeQuery({
          query: GET_CV_SKILLS,
          variables: { cvId },
          data: {
            cv: {
              ...existing.cv,
              skills: existing.cv.skills.map((s) =>
                s.name === data.updateCvSkill.name ? data.updateCvSkill : s
              ),
            },
          },
        });
      }
    },
  });

  const [deleteSkillMutation] = useMutation<
    { deleteCvSkill: SkillMastery },
    { skill: DeleteCvSkillInput }
  >(DELETE_CV_SKILL, {
    update: (cache: ApolloCache<{ deleteCvSkill: SkillMastery }>, { data }) => {
      if (!data) return;
      const existing = cache.readQuery<CvSkillData>({
        query: GET_CV_SKILLS,
        variables: { cvId },
      });
      if (existing) {
        cache.writeQuery({
          query: GET_CV_SKILLS,
          variables: { cvId },
          data: {
            cv: {
              ...existing.cv,
              skills: existing.cv.skills.filter(
                (s) => s.name !== data.deleteCvSkill.name
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
