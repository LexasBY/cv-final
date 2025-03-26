import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($userId: ID!) {
    user(userId: $userId) {
      id
      email
      created_at
      profile {
        id
        first_name
        last_name
        avatar
      }
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`;

export const GET_USERDATA = gql`
  query GetUserData($userId: ID!) {
    user(userId: $userId) {
      id
      email
      profile {
        first_name
        last_name
        avatar
      }
    }
  }
`;

export const GET_DEPARTMENTS = gql`
  query getDepartments {
    departments {
      id
      name
    }
  }
`;

export const GET_POSITIONS = gql`
  query getPositions {
    positions {
      id
      name
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      first_name
      last_name
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`;

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`;

export const DELETE_AVATAR = gql`
  mutation deleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`;
