import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { Close, UploadFile } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

type Props = {
  avatarUrl: string | null;
  firstName: string;
  isEditable: boolean;
  onUpload: (file: File) => void;
  onRemove: () => void;
};

export const AvatarDropzone: React.FC<Props> = ({
  avatarUrl,
  firstName,
  isEditable,
  onUpload,
  onRemove,
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    multiple: false,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
      "image/gif": [],
    },
    maxSize: 512000, // 0.5MB
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        flexWrap: "wrap",
        maxWidth: 600,
        cursor: isEditable ? "pointer" : "default",
      }}
    >
      {/* Аватар с кнопкой удаления */}
      <Box position="relative" sx={{ width: 120, height: 120 }}>
        <Avatar
          src={avatarUrl || ""}
          sx={{
            width: 120,
            height: 120,
            bgcolor: avatarUrl ? "transparent" : "text.secondary",
          }}
        >
          {!avatarUrl && firstName?.charAt(0).toUpperCase()}
        </Avatar>

        {isEditable && avatarUrl && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            sx={{
              position: "absolute",
              top: -8,
              right: -8,
              color: "text.primary",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* Кнопка загрузки и подписи */}
      {isEditable && (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
            >
              <UploadFile />
            </IconButton>
            <Typography variant="body1" color="text.primary">
              Upload avatar image
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" mt={1}>
            png, jpg or gif no more than 0.5MB
          </Typography>
        </Box>
      )}

      <input {...getInputProps()} />
    </Box>
  );
};
