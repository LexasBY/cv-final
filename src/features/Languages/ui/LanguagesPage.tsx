import React, { useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Snackbar,
  Typography,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { LanguagesList } from "./LanguagesList";
import { GenericModal } from "../../../shared/ui/Modals/GenericModal";
import {
  GET_ALL_LANGUAGES,
  GET_USER_LANGUAGES,
} from "../../../shared/api/user/languages.api";
import {
  Language,
  LanguageProficiency,
  Proficiency,
  Profile,
} from "../../../shared/api/graphql/generated";
import { useLanguagesMutations } from "../model/useLanguagesMutations";

export const LanguagesPage: React.FC = () => {
  const { userId: routeUserId } = useParams<{ userId?: string }>();
  const userId = routeUserId ?? localStorage.getItem("userId");

  const [openAdd, setOpenAdd] = useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageProficiency | null>(null);
  const [languagesToDelete, setLanguagesToDelete] = useState<string[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useQuery<{ profile: Profile }>(GET_USER_LANGUAGES, {
    variables: { userId },
    skip: !userId,
  });

  const {
    data: allLanguagesData,
    loading: languagesLoading,
    error: languagesError,
  } = useQuery<{ languages: Language[] }>(GET_ALL_LANGUAGES);

  const { addLanguage, updateLanguage, deleteLanguage } = useLanguagesMutations(
    userId!
  );

  const isOwner = userId === localStorage.getItem("userId");

  const availableLanguages = useMemo(() => {
    if (!profileData || !allLanguagesData) return [];
    const existingNames = profileData.profile.languages.map(
      (l: LanguageProficiency) => l.name
    );
    return allLanguagesData.languages.filter(
      (l: Language) => !existingNames.includes(l.name)
    );
  }, [profileData, allLanguagesData]);

  const proficiencyOptions = useMemo(
    () =>
      Object.values(Proficiency).map((level) => ({
        label: level,
        value: level,
      })),
    []
  );

  if (profileLoading || languagesLoading || !userId)
    return <CircularProgress />;
  if (profileError || languagesError)
    return <Typography color="error">Error loading data</Typography>;
  if (!profileData?.profile || !allLanguagesData)
    return <Typography color="error">No data</Typography>;

  const handleAddLanguage = async (name: string, proficiency: string) => {
    try {
      await addLanguage({
        variables: {
          language: {
            userId,
            name,
            proficiency: proficiency as Proficiency,
          },
        },
      });
      setSnackbar({
        open: true,
        message: "Language added",
        severity: "success",
      });
    } catch {
      setSnackbar({ open: true, message: "Add failed", severity: "error" });
    } finally {
      setOpenAdd(false);
    }
  };

  const handleUpdateLanguage = async (proficiency: string) => {
    if (!selectedLanguage) return;
    try {
      await updateLanguage({
        variables: {
          language: {
            userId,
            name: selectedLanguage.name,
            proficiency: proficiency as Proficiency,
          },
        },
      });
      setSnackbar({ open: true, message: "Updated", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Update failed", severity: "error" });
    } finally {
      setSelectedLanguage(null);
    }
  };

  const handleDeleteLanguages = async () => {
    try {
      await deleteLanguage({
        variables: {
          language: {
            userId,
            name: languagesToDelete,
          },
        },
      });
      setSnackbar({ open: true, message: "Deleted", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Delete failed", severity: "error" });
    } finally {
      setLanguagesToDelete([]);
      setIsDeleteMode(false);
    }
  };

  return (
    <Box sx={{ px: 4, py: 3, mx: "auto", maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Languages
      </Typography>
      <LanguagesList
        languages={profileData.profile.languages}
        onAdd={() => setOpenAdd(true)}
        onEdit={(lang) => isOwner && setSelectedLanguage(lang)}
        isOwner={isOwner}
        isDeleteMode={isDeleteMode}
        selectedForDelete={languagesToDelete}
        onToggleDeleteMode={() => {
          setIsDeleteMode((prev) => !prev);
          setLanguagesToDelete([]);
        }}
        onToggleLanguageDelete={(name) => {
          setLanguagesToDelete((prev) =>
            prev.includes(name)
              ? prev.filter((n) => n !== name)
              : [...prev, name]
          );
        }}
        onConfirmDelete={handleDeleteLanguages}
      />

      {isOwner && (
        <GenericModal
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          onConfirm={handleAddLanguage}
          title="Add language"
          itemLabel="Language"
          levelLabel="Language proficiency"
          options={availableLanguages.map((l: Language) => ({
            label: l.name,
            value: l.name,
          }))}
          levels={proficiencyOptions}
        />
      )}

      {selectedLanguage && (
        <GenericModal
          open
          onClose={() => setSelectedLanguage(null)}
          onConfirm={(_, proficiency) => handleUpdateLanguage(proficiency)}
          title="Update language"
          itemLabel="Language"
          levelLabel="Language proficiency"
          options={[
            { label: selectedLanguage.name, value: selectedLanguage.name },
          ]}
          levels={proficiencyOptions}
          disableItemSelect
          initialItemValue={selectedLanguage.name}
          initialLevel={selectedLanguage.proficiency}
        />
      )}

      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
