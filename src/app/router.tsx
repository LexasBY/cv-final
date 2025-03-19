import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/auth/ui/login";
import RegisterPage from "../pages/auth/ui/register";
import Layout from "./Layout";
import SkillsPage from "../pages/profile/SkillsPage";
import LanguagesPage from "../pages/profile/LanguagesPage";
import CVsPage from "../pages/profile/CVsPage";
import ProfilePage from "../pages/profile/ProfilePage";
import { UsersPage } from "../pages/employees";

export const Router = () => (
  <Routes>
    <Route path="/auth/login" element={<LoginPage />} />
    <Route path="/auth/signup" element={<RegisterPage />} />

    <Route element={<Layout />}>
      <Route path="/users" element={<UsersPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/languages" element={<LanguagesPage />} />
      <Route path="/cvs" element={<CVsPage />} />

      <Route path="/users/:userId" element={<ProfilePage />} />
    </Route>

    <Route path="*" element={<Navigate to="/auth/login" replace />} />
  </Routes>
);
