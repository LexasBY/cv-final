import { gql } from "@apollo/client";

export const GET_ALL_CVS = gql`
  query GetAllCVs {
    cvs {
      id
      name
      description
      education
      created_at
      user {
        id
        email
      }
    }
  }
`;

export const CREATE_CV = gql`
  mutation CreateCv($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      id
      name
      description
      education
      created_at
      user {
        id
        email
        profile {
          id
          full_name
          avatar
        }
      }
    }
  }
`;

export const GET_CV_BY_ID = gql`
  query GetCVById($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      description
      education
      created_at
      user {
        id
        email
        profile {
          full_name
        }
      }
      skills {
        name
        mastery
        categoryId
      }
      languages {
        name
        proficiency
      }
      projects {
        id
        name
        internal_name
        description
        domain
        start_date
        end_date
      }
    }
  }
`;

export const DELETE_CV = gql`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`;

export const UPDATE_CV = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      name
      education
      description
      user {
        id
      }
    }
  }
`;

export const GET_CV_SKILLS = gql`
  query GetCvSkills($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`;

export const ADD_CV_SKILL = gql`
  mutation AddCvSkill($skill: AddCvSkillInput!) {
    addCvSkill(skill: $skill) {
      id
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`;

export const UPDATE_CV_SKILL = gql`
  mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {
    updateCvSkill(skill: $skill) {
      id
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`;

export const DELETE_CV_SKILL = gql`
  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {
    deleteCvSkill(skill: $skill) {
      id
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`;
