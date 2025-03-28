import React from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import {
  LanguageProficiency,
  Proficiency,
} from "../../../shared/api/graphql/generated";
import { LanguagesActions } from "./LanguagesActions";

type LanguagesListProps = {
  languages: LanguageProficiency[];
  onAdd: () => void;
  onEdit: (language: LanguageProficiency) => void;
  isOwner: boolean;
  isDeleteMode: boolean;
  selectedForDelete: string[];
  onToggleDeleteMode: () => void;
  onToggleLanguageDelete: (name: string) => void;
  onConfirmDelete: () => void;
};

const proficiencyColors: Record<Proficiency, string> = {
  A1: "#757575",
  A2: "#9e9e9e",
  B1: "#42a5f5",
  B2: "#66bb6a",
  C1: "#ffca28",
  C2: "#ffa726",
  Native: "#ef5350",
};

export const LanguagesList: React.FC<LanguagesListProps> = ({
  languages,
  onAdd,
  onEdit,
  isOwner,
  isDeleteMode,
  selectedForDelete,
  onToggleDeleteMode,
  onToggleLanguageDelete,
  onConfirmDelete,
}) => {
  if (!languages) return <CircularProgress />;

  const isSelected = (name: string) => selectedForDelete.includes(name);

  return (
    <Box>
      <Grid container spacing={4} columns={12}>
        {languages.map((lang) => {
          const selected = isSelected(lang.name);
          return (
            <Grid item xs={12} sm={4} md={4} key={lang.name}>
              <Box
                onClick={() =>
                  isDeleteMode
                    ? onToggleLanguageDelete(lang.name)
                    : onEdit(lang)
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  px: 2,
                  py: 1.5,
                  borderRadius: 1,
                  cursor: isOwner ? "pointer" : "default",
                  color: selected ? "#fff" : "text.primary",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    color: selected
                      ? "#fff"
                      : proficiencyColors[lang.proficiency],
                    minWidth: 30,
                  }}
                >
                  {lang.proficiency}
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>{lang.name}</Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {isOwner && (
        <Box mt={4}>
          <LanguagesActions
            hasLanguages={languages.length > 0}
            isDeleteMode={isDeleteMode}
            deleteCount={selectedForDelete.length}
            onAdd={onAdd}
            onRemove={onToggleDeleteMode}
            onDeleteCancel={onToggleDeleteMode}
            onDeleteConfirm={onConfirmDelete}
          />
        </Box>
      )}
    </Box>
  );
};
