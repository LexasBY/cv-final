import { gql } from "@apollo/client";

export const GET_USER_SKILLS = gql`
  query ProfileSkills($userId: ID!) {
    profile(userId: $userId) {
      id
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`;

export const GET_SKILLS = gql`
  query Skills {
    skills {
      id
      name
      category {
        id
      }
    }
  }
`;

export const GET_SKILL_CATEGORIES = gql`
  query SkillCategories {
    skillCategories {
      id
      name
      order
      parent {
        id
        name
      }
      children {
        id
        name
        order
      }
    }
  }
`;

export const ADD_PROFILE_SKILL = gql`
  mutation AddProfileSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`;

export const UPDATE_PROFILE_SKILL = gql`
  mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {
    updateProfileSkill(skill: $skill) {
      id
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`;

export const DELETE_PROFILE_SKILL = gql`
  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`;
