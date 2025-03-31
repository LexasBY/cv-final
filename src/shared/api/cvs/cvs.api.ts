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
      }
      languages {
        name
        proficiency
      }
      projects {
        id
        name
        description
      }
    }
  }
`;
