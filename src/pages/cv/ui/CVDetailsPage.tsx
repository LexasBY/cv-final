import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useUpdateCv } from "../model/useCv";
import { useCvContext } from "../model/useCvContext";

export const CVDetailsPage: React.FC = () => {
  const { cv, refetch } = useCvContext();
  const { updateCv } = useUpdateCv();

  const [formState, setFormState] = useState({
    name: "",
    education: "",
    description: "",
  });

  useEffect(() => {
    if (cv) {
      setFormState({
        name: cv.name,
        education: cv.education || "",
        description: cv.description || "",
      });
    }
  }, [cv]);

  const isChanged =
    formState.name !== cv?.name ||
    formState.education !== (cv?.education || "") ||
    formState.description !== (cv?.description || "");

  const handleChange =
    (field: keyof typeof formState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleUpdate = async () => {
    if (!cv) return;

    await updateCv({
      cvId: cv.id,
      name: formState.name,
      education: formState.education,
      description: formState.description,
    });

    refetch();
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 3 }}>
      <TextField
        label="Name"
        value={formState.name}
        onChange={handleChange("name")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Education"
        value={formState.education}
        onChange={handleChange("education")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={formState.description}
        onChange={handleChange("description")}
        fullWidth
        margin="normal"
        multiline
        minRows={5}
      />

      <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
        <Button
          variant="contained"
          disabled={!isChanged}
          onClick={handleUpdate}
          sx={{
            borderRadius: "30px",
            px: 5,
            py: 1,
            backgroundColor: "error.main",
            "&:hover": { backgroundColor: "error.dark" },
          }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};
