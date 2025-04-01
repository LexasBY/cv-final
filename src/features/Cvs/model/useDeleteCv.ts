import { useMutation } from "@apollo/client";
import { DELETE_CV } from "../../../shared/api/cvs/cvs.api";
import {
  DeleteResult,
  DeleteCvInput,
} from "../../../shared/api/graphql/generated";

export const useDeleteCv = () => {
  const [deleteCvMutation, { loading, error }] = useMutation<
    { deleteCv: DeleteResult },
    { cv: DeleteCvInput }
  >(DELETE_CV);

  const deleteCv = async (cvId: string) => {
    await deleteCvMutation({
      variables: { cv: { cvId } },
    });
  };

  return { deleteCv, loading, error };
};
