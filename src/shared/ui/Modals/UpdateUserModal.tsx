import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Department, Position, User } from "../../api/graphql/generated";

export interface UpdateUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateUserFormData) => void;
  user: User;
  departments: Department[];
  positions: Position[];
}

export interface UpdateUserFormData {
  firstName: string;
  lastName: string;
  departmentId: string;
  positionId: string;
}

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  departmentId: yup.string().required("Department is required"),
  positionId: yup.string().required("Position is required"),
});

export const UpdateUserModal = ({
  open,
  onClose,
  onSubmit,
  user,
  departments,
  positions,
}: UpdateUserModalProps) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<UpdateUserFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      departmentId: "",
      positionId: "",
    },
  });

  useEffect(() => {
    if (user) {
      const departmentId =
        user.department?.id ||
        departments.find((d) => d.name === user.department?.name)?.id ||
        "";
      const positionId =
        user.position?.id ||
        positions.find((p) => p.name === user.position?.name)?.id ||
        "";

      reset({
        firstName: user.profile.first_name || "",
        lastName: user.profile.last_name || "",
        departmentId,
        positionId,
      });
    }
  }, [user, departments, positions, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{t("Update User")}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t("Email")}
                value={user.email}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t("Password")}
                type="password"
                value="************"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("First Name")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("Last Name")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="departmentId"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label={t("Department")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    {departments.map((d) => (
                      <MenuItem key={d.id} value={d.id}>
                        {d.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="positionId"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label={t("Position")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    {positions.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("Role")}
                value={user.role}
                disabled
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} variant="outlined">
            {t("Cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isDirty || !isValid}
          >
            {t("Update")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
