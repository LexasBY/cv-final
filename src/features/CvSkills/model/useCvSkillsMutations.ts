import { useMutation, ApolloCache } from "@apollo/client";

import {
  AddCvSkillInput,
  DeleteCvSkillInput,
  SkillMastery,
} from "../../../shared/api/graphql/generated";
import {
  ADD_CV_SKILL,
  DELETE_CV_SKILL,
  GET_CV_SKILLS,
  UPDATE_CV_SKILL,
} from "../../../shared/api/cvs/cvs.api";
import { useCvContext } from "../../../pages/cv/model/useCvContext";

interface CvSkillData {
  cv: {
    skills: SkillMastery[];
  };
}

export const useCvSkillsMutations = () => {
  const { cv } = useCvContext();
  const cvId = cv?.id;

  const [addSkillMutation] = useMutation<
    { addCvSkill: SkillMastery },
    { skill: AddCvSkillInput }
  >(ADD_CV_SKILL, {
    update: (cache: ApolloCache<{ addCvSkill: SkillMastery }>, { data }) => {
      if (!data || !cvId) return;
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
      if (!data || !cvId) return;
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
      if (!data || !cvId) return;
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
