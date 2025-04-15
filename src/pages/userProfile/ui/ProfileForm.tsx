// import React from "react";
// import {
//   Box,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { Department, Position } from "../../../shared/api/graphql/generated";

// type ProfileFormProps = {
//   firstName: string;
//   lastName: string;
//   departmentId: string | null;
//   positionId: string | null;
//   departments: Department[];
//   positions: Position[];
//   isEditable: boolean;
//   onFirstNameChange: (value: string) => void;
//   onLastNameChange: (value: string) => void;
//   onDepartmentChange: (value: string) => void;
//   onPositionChange: (value: string) => void;
// };

// export const ProfileForm: React.FC<ProfileFormProps> = ({
//   firstName,
//   lastName,
//   departmentId,
//   positionId,
//   departments,
//   positions,
//   isEditable,
//   onFirstNameChange,
//   onLastNameChange,
//   onDepartmentChange,
//   onPositionChange,
// }) => {
//   return (
//     <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
//       <TextField
//         label="First Name"
//         value={firstName}
//         onChange={(e) => onFirstNameChange(e.target.value)}
//         disabled={!isEditable}
//       />
//       <TextField
//         label="Last Name"
//         value={lastName}
//         onChange={(e) => onLastNameChange(e.target.value)}
//         disabled={!isEditable}
//       />

//       <FormControl disabled={!isEditable}>
//         <InputLabel>Department</InputLabel>
//         <Select
//           value={departmentId ?? ""}
//           label="Department"
//           onChange={(e) => onDepartmentChange(e.target.value)}
//         >
//           {departments.map((d) => (
//             <MenuItem key={d.id} value={d.id}>
//               {d.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl disabled={!isEditable}>
//         <InputLabel>Position</InputLabel>
//         <Select
//           value={positionId ?? ""}
//           label="Position"
//           onChange={(e) => onPositionChange(e.target.value)}
//         >
//           {positions.map((p) => (
//             <MenuItem key={p.id} value={p.id}>
//               {p.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };
