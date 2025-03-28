import { useMutation } from "@apollo/client";
import {
  ADD_PROFILE_LANGUAGE,
  UPDATE_PROFILE_LANGUAGE,
  DELETE_PROFILE_LANGUAGE,
  GET_USER_LANGUAGES,
} from "../../../shared/api/user/languages.api";
import {
  AddProfileLanguageInput,
  DeleteProfileLanguageInput,
  UpdateProfileLanguageInput,
  Profile,
} from "../../../shared/api/graphql/generated";

interface ProfileData {
  profile: Pick<Profile, "languages">;
}

export const useLanguagesMutations = (userId: string) => {
  const [addLanguage] = useMutation<
    { addProfileLanguage: Profile },
    { language: AddProfileLanguageInput }
  >(ADD_PROFILE_LANGUAGE, {
    update: (cache, { data }) => {
      if (!data) return;
      const existing = cache.readQuery<ProfileData>({
        query: GET_USER_LANGUAGES,
        variables: { userId },
      });
      if (existing) {
        cache.writeQuery({
          query: GET_USER_LANGUAGES,
          variables: { userId },
          data: {
            profile: {
              ...existing.profile,
              languages: data.addProfileLanguage.languages,
            },
          },
        });
      }
    },
  });

  const [updateLanguage] = useMutation<
    { updateProfileLanguage: Profile },
    { language: UpdateProfileLanguageInput }
  >(UPDATE_PROFILE_LANGUAGE, {
    update: (cache, { data }) => {
      if (!data) return;
      const existing = cache.readQuery<ProfileData>({
        query: GET_USER_LANGUAGES,
        variables: { userId },
      });
      if (existing) {
        cache.writeQuery({
          query: GET_USER_LANGUAGES,
          variables: { userId },
          data: {
            profile: {
              ...existing.profile,
              languages: data.updateProfileLanguage.languages,
            },
          },
        });
      }
    },
  });

  const [deleteLanguage] = useMutation<
    { deleteProfileLanguage: Profile },
    { language: DeleteProfileLanguageInput }
  >(DELETE_PROFILE_LANGUAGE, {
    update: (cache, { data }) => {
      if (!data) return;
      const existing = cache.readQuery<ProfileData>({
        query: GET_USER_LANGUAGES,
        variables: { userId },
      });
      if (existing) {
        cache.writeQuery({
          query: GET_USER_LANGUAGES,
          variables: { userId },
          data: {
            profile: {
              ...existing.profile,
              languages: data.deleteProfileLanguage.languages,
            },
          },
        });
      }
    },
  });

  return {
    addLanguage,
    updateLanguage,
    deleteLanguage,
  };
};
