import React, { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useCvContext } from "../model/useCvContext";
import { useUpdateCv } from "../model/useCv";

type FormValues = {
  name: string;
  education: string;
  description: string;
};

export const CVDetailsPage: React.FC = () => {
  const { cv, refetch } = useCvContext();
  const { updateCv } = useUpdateCv();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      education: "",
      description: "",
    },
  });

  useEffect(() => {
    if (cv) {
      reset({
        name: cv.name,
        education: cv.education || "",
        description: cv.description || "",
      });
    }
  }, [cv, reset]);

  const onSubmit = async (data: FormValues) => {
    if (!cv) return;
    await updateCv({ cvId: cv.id, ...data });
    refetch();
  };

  return (
    <Box
      sx={{ maxWidth: 900, mx: "auto", mt: 3 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl fullWidth margin="normal">
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field, fieldState }) => (
            <>
              <TextField {...field} label="Name" error={!!fieldState.error} />
              {fieldState.error && (
                <FormHelperText error>
                  {fieldState.error.message}
                </FormHelperText>
              )}
            </>
          )}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Controller
          name="education"
          control={control}
          render={({ field }) => <TextField {...field} label="Education" />}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Description" multiline minRows={5} />
          )}
        />
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
        <Button
          variant="contained"
          type="submit"
          disabled={!isDirty || !isValid}
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
