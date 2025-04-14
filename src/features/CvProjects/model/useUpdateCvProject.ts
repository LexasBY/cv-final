import { useMutation } from "@apollo/client";
import {
  Cv,
  UpdateCvProjectInput,
} from "../../../shared/api/graphql/generated";
import { UPDATE_CV_PROJECT } from "../../../shared/api/projects/projects.api";

export const useUpdateCvProject = () => {
  const [updateProject, { loading, error }] = useMutation<
    { updateCvProject: Cv },
    { project: UpdateCvProjectInput }
  >(UPDATE_CV_PROJECT);

  return { updateProject, loading, error };
};
