import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetAllProjects {
    projects {
      id
      name
      internal_name
      description
      domain
      start_date
      end_date
      environment
    }
  }
`;

export const ADD_CV_PROJECT = gql`
  mutation AddCvProject($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
      id
      projects {
        id
        name
        internal_name
        domain
        description
        start_date
        end_date
        environment
        roles
        responsibilities
        project {
          id
        }
      }
    }
  }
`;

export const UPDATE_CV_PROJECT = gql`
  mutation UpdateCvProject($project: UpdateCvProjectInput!) {
    updateCvProject(project: $project) {
      id
      project {
        id
        name
        internal_name
      }
      start_date
      end_date
      responsibilities
      roles
    }
  }
`;

export const DELETE_CV_PROJECT = gql`
  mutation RemoveCvProject($project: RemoveCvProjectInput!) {
    removeCvProject(project: $project) {
      id
      projects {
        id
        name
        internal_name
        domain
        description
        start_date
        end_date
        environment
        roles
        responsibilities
        project {
          id
        }
      }
    }
  }
`;
