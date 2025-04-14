import { useMutation } from "@apollo/client";
import {
  RemoveCvProjectInput,
  Cv,
} from "../../../shared/api/graphql/generated";
import { DELETE_CV_PROJECT } from "../../../shared/api/projects/projects.api";

export const useDeleteCvProject = () => {
  const [deleteProject, { loading, error }] = useMutation<
    { removeCvProject: Cv },
    { project: RemoveCvProjectInput }
  >(DELETE_CV_PROJECT);

  return {
    deleteProject,
    loading,
    error,
  };
};
