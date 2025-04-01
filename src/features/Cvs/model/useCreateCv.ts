import { useMutation } from "@apollo/client";
import { CREATE_CV } from "../../../shared/api/cvs/cvs.api";
import { CreateCvInput, Cv } from "../../../shared/api/graphql/generated";

export const useCreateCv = () => {
  const [createCvMutation, { loading, error }] = useMutation<
    { createCv: Cv },
    { cv: CreateCvInput }
  >(CREATE_CV);

  const createCv = async (cv: CreateCvInput) => {
    const result = await createCvMutation({ variables: { cv } });
    return result.data?.createCv;
  };

  return { createCv, loading, error };
};
