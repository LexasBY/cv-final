import { gql } from "@apollo/client";

export const GET_USER_SKILLS = gql`
  query getUserSkills($userId: ID!) {
    profile(userId: $userId) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const GET_SKILLS = gql`
  query getSkills {
    skills {
      id
      name
      categoryId
    }
  }
`;

export const GET_SKILL_CATEGORIES = gql`
  query getSkillCategories {
    skillCategories {
      id
      name
    }
  }
`;

export const ADD_PROFILE_SKILL = gql`
  mutation addProfileSkill($skill: ProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
      skills {
        id
        name
        categoryId
        mastery
      }
    }
  }
`;

export const UPDATE_PROFILE_SKILL = gql`
  mutation updateProfileSkill($skill: ProfileSkillInput!) {
    updateProfileSkill(skill: $skill) {
      id
      skills {
        id
        name
        categoryId
        mastery
      }
    }
  }
`;

export const DELETE_PROFILE_SKILL = gql`
  mutation deleteProfileSkill($skill: ProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
      skills {
        id
        name
        categoryId
        mastery
      }
    }
  }
`;
