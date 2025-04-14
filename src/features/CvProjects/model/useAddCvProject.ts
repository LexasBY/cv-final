import { useMutation } from "@apollo/client";
import {
  AddCvProjectInput,
  CvProject,
} from "../../../shared/api/graphql/generated";
import { ADD_CV_PROJECT } from "../../../shared/api/projects/projects.api";

export const useAddCvProject = () => {
  const [addProject, { loading, error }] = useMutation<
    { addCvProject: CvProject },
    { project: AddCvProjectInput }
  >(ADD_CV_PROJECT);

  return {
    addProject,
    loading,
    error,
  };
};
