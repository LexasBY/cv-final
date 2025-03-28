import { gql } from "@apollo/client";

export const GET_USER_LANGUAGES = gql`
  query GetUserLanguages($userId: ID!) {
    profile(userId: $userId) {
      languages {
        name
        proficiency
      }
    }
  }
`;

export const GET_ALL_LANGUAGES = gql`
  query GetLanguages {
    languages {
      name
    }
  }
`;

export const ADD_PROFILE_LANGUAGE = gql`
  mutation AddProfileLanguage($language: AddProfileLanguageInput!) {
    addProfileLanguage(language: $language) {
      languages {
        name
        proficiency
      }
    }
  }
`;

export const UPDATE_PROFILE_LANGUAGE = gql`
  mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {
    updateProfileLanguage(language: $language) {
      languages {
        name
        proficiency
      }
    }
  }
`;

export const DELETE_PROFILE_LANGUAGE = gql`
  mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {
    deleteProfileLanguage(language: $language) {
      languages {
        name
        proficiency
      }
    }
  }
`;
