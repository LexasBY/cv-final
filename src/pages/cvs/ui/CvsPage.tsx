import React, { useState } from "react";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCvs } from "../../../features/Cvs/model/useCvs";
import { Cv } from "../../../shared/api/graphql/generated";
import { SearchInput } from "../../../shared/ui/SearchInput";
import { CvsTable } from "./CvsTable";

export const CvsPage: React.FC = () => {
  const navigate = useNavigate();

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

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedCv, setSelectedCv] = useState<Cv | null>(null);

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

  if (loading) return <Box sx={{ p: 3 }}>Loading...</Box>;
  if (error) return <Box sx={{ p: 3 }}>Error fetching CVs</Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        CVs
      </Typography>

      <Box sx={{ mb: 2, maxWidth: 400 }}>
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
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
        {selectedCv && (
          <>
            <MenuItem
              onClick={() => {
                navigate(`/cvs/${selectedCv.id}`);
                handleMenuClose();
              }}
            >
              Details
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};
