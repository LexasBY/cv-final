import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      id
      email
      profile {
        first_name
        last_name
      }
    }
  }
`;
