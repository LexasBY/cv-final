import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { Cv, UpdateCvInput } from "../../../shared/api/graphql/generated";

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

export const useUpdateCv = () => {
  const [updateCvMutation, { loading, error }] = useMutation<
    { updateCv: Cv },
    { cv: UpdateCvInput }
  >(UPDATE_CV);

  const updateCv = async (cv: UpdateCvInput) => {
    const result = await updateCvMutation({ variables: { cv } });
    return result.data?.updateCv;
  };

  return { updateCv, loading, error };
};
