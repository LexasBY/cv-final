import React, { useState } from "react";
import { Box, Typography, Menu, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCvs } from "../../../features/Cvs/model/useCvs";
import { Cv } from "../../../shared/api/graphql/generated";
import { SearchInput } from "../../../shared/ui/SearchInput";
import { CvsTable } from "./CvsTable";
import AddIcon from "@mui/icons-material/Add";
import { CreateCvModal } from "../../../shared/ui/Modals/CreateCvModal";
import { useCreateCv } from "../../../features/Cvs/model/useCreateCv";
import { useApolloClient } from "@apollo/client";
import { ConfirmDeleteModal } from "../../../shared/ui/Modals/ConfirmDeleteModal";
import { useDeleteCv } from "../../../features/Cvs/model/useDeleteCv";
import { useTranslation } from "react-i18next";

export const CvsPage: React.FC = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const { t } = useTranslation();

  const {
    loading,
    error,
    sortedCvs,
    searchTerm,
    setSearchTerm,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
  } = useCvs();

  const { createCv } = useCreateCv();

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedCv, setSelectedCv] = useState<Cv | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSort = (column: "name" | "education" | "employee") => {
    setSortDirection((prev) =>
      sortColumn === column ? (prev === "asc" ? "desc" : "asc") : "asc"
    );
    setSortColumn(column);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    cv: Cv
  ) => {
    setSelectedCv(cv);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedCv(null);
  };

  const handleCreateCv = async (data: {
    name: string;
    education?: string;
    description?: string;
  }) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User not logged in");

      await createCv({
        name: data.name,
        education: data.education,
        description: data.description || "",
        userId,
      });

      await client.refetchQueries({
        include: ["GetAllCVs"],
      });

      setIsCreateModalOpen(false);
    } catch (e) {
      console.error("Error creating CV", e);
    }
  };

  const handleDeleteOpen = () => {
    setIsDeleteModalOpen(true);
    setMenuAnchor(null);
  };

  const { deleteCv } = useDeleteCv();

  const handleDeleteConfirm = async () => {
    if (!selectedCv) return;

    try {
      await deleteCv(selectedCv.id);
      await client.refetchQueries({ include: ["GetAllCVs"] });
    } catch (err) {
      console.error("Failed to delete CV", err);
    }

    setIsDeleteModalOpen(false);
  };

  if (loading) return <Box sx={{ p: 3 }}>{t("Loading")}...</Box>;
  if (error) return <Box sx={{ p: 3 }}>{t("Error fetching CVs")}</Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        {t("CVs")}
      </Typography>

      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </Box>

        <Button
          onClick={() => setIsCreateModalOpen(true)}
          sx={{
            color: "error.main",
            textTransform: "uppercase",
            fontWeight: "bold",
            borderRadius: "50px",
            px: 4,
            py: 1.1,
            minWidth: 250,
            transition: "background-color 0.2s",
            "&:hover": {
              backgroundColor: "rgba(255, 0, 0, 0.05)",
            },
          }}
          startIcon={<AddIcon />}
        >
          {t("Create CV")}
        </Button>
      </Box>

      <CvsTable
        cvs={sortedCvs}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        onMenuOpen={handleMenuOpen}
      />

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        {selectedCv && [
          <MenuItem
            key="details"
            onClick={() => {
              navigate(`/cvs/${selectedCv.id}/details`);
              handleMenuClose();
            }}
          >
            {t("Details")}
          </MenuItem>,
          <MenuItem key="delete" onClick={handleDeleteOpen}>
            {t("Delete")}
          </MenuItem>,
        ]}
      </Menu>

      <CreateCvModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCv}
      />

      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        entityType="cv"
        entityName={selectedCv?.name || ""}
      />
    </Box>
  );
};
