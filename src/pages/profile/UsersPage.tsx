import { useState, useMemo } from "react";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  Typography,
} from "@mui/material";
import { MoreVert, ArrowForward, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { User } from "../../shared/api/types";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      profile {
        first_name
        last_name
        avatar
      }
      department {
        name
      }
      position {
        name
      }
    }
  }
`;

export const UsersPage = () => {
  const { data, loading, error } = useQuery<{ users: User[] }>(GET_USERS);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<
    keyof User | "first_name" | "last_name"
  >("email");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users = useMemo(() => data?.users || [], [data]);

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        `${user.profile.first_name ?? ""} ${user.profile.last_name ?? ""} ${
          user.email
        }`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ),
    [users, searchTerm]
  );

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      let valA: string, valB: string;

      switch (sortColumn) {
        case "first_name":
          valA = a.profile.first_name ?? "";
          valB = b.profile.first_name ?? "";
          break;
        case "last_name":
          valA = a.profile.last_name ?? "";
          valB = b.profile.last_name ?? "";
          break;
        case "email":
          valA = a.email;
          valB = b.email;
          break;
        case "department":
          valA = a.department?.name || "";
          valB = b.department?.name || "";
          break;
        case "position":
          valA = a.position?.name || "";
          valB = b.position?.name || "";
          break;
        default:
          return 0;
      }

      return sortDirection === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }, [filteredUsers, sortColumn, sortDirection]);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>Error fetching users</Box>;

  const handleSort = (column: keyof User | "first_name" | "last_name") => {
    setSortDirection((prev) =>
      sortColumn === column ? (prev === "asc" ? "desc" : "asc") : "asc"
    );
    setSortColumn(column);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    user: User
  ) => {
    setSelectedUser(user);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Employees
      </Typography>

      <Box sx={{ mb: 2, maxWidth: 400 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            maxWidth: 400,
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <TableContainer sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "first_name"}
                  direction={sortDirection}
                  onClick={() => handleSort("first_name")}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "last_name"}
                  direction={sortDirection}
                  onClick={() => handleSort("last_name")}
                >
                  Last Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "email"}
                  direction={sortDirection}
                  onClick={() => handleSort("email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "department"}
                  direction={sortDirection}
                  onClick={() => handleSort("department")}
                >
                  Department
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "position"}
                  direction={sortDirection}
                  onClick={() => handleSort("position")}
                >
                  Position
                </TableSortLabel>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedUsers.map((user) => {
              const isCurrentUser = user.id === localStorage.getItem("userId");
              const userInitials =
                user.profile.first_name?.charAt(0).toUpperCase() ||
                user.email.charAt(0).toUpperCase();

              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar
                      src={user.profile.avatar || ""}
                      sx={{
                        bgcolor: user.profile.avatar ? "transparent" : "gray",
                      }}
                    >
                      {!user.profile.avatar && userInitials}
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.profile.first_name ?? "—"}</TableCell>
                  <TableCell>{user.profile.last_name ?? "—"}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.department?.name ?? "—"}</TableCell>
                  <TableCell>{user.position?.name ?? "—"}</TableCell>
                  <TableCell>
                    {isCurrentUser ? (
                      <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                        <MoreVert />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => navigate(`/users/${user.id}`)}>
                        <ArrowForward />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        {selectedUser && (
          <>
            <MenuItem onClick={() => navigate(`/users/${selectedUser.id}`)}>
              Profile
            </MenuItem>
            <MenuItem>Update User</MenuItem>
            <MenuItem>Delete User</MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};
