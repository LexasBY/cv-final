import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { AuthInput, AuthResult } from "../../../shared/api/graphql/generated";

const LOGIN_QUERY = gql`
  query Login($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
        created_at
        email
        is_verified
        profile {
          id
          full_name
          avatar
        }
        role
        cvs {
          id
          name
          description
          skills {
            name
            mastery
          }
          languages {
            name
            proficiency
          }
        }
      }
      access_token
      refresh_token
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        created_at
        email
        is_verified
        profile {
          id
          full_name
          avatar
        }
        role
      }
      access_token
      refresh_token
    }
  }
`;
export const REFRESH_TOKEN = gql`
  mutation RefreshToken($refresh_token: String!) {
    refreshToken(refresh_token: $refresh_token) {
      access_token
      refresh_token
    }
  }
`;

export const useLogin = () =>
  useLazyQuery<{ login: AuthResult }, { auth: AuthInput }>(LOGIN_QUERY);

export const useRegister = () =>
  useMutation<{ signup: AuthResult }, { auth: AuthInput }>(REGISTER_MUTATION);
