import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/auth/ui/login";
import RegisterPage from "../pages/auth/ui/register";
import Layout from "./Layout";
import LanguagesPage from "../pages/profile/LanguagesPage";
import CVsPage from "../pages/profile/CVsPage";
import { UsersPage } from "../pages/employees";
import { ProfilePage } from "../pages/userProfile/ui/ProfilePage";
import { SkillsPage } from "../features/Skills/ui/SkillsPage";

export const Router = () => (
  <Routes>
    <Route path="/auth/login" element={<LoginPage />} />
    <Route path="/auth/signup" element={<RegisterPage />} />

    <Route element={<Layout />}>
      <Route path="/users" element={<UsersPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/languages" element={<LanguagesPage />} />
      <Route path="/cvs" element={<CVsPage />} />

      <Route path="/users/:userId" element={<ProfilePage />}>
        <Route path="skills" element={<SkillsPage />} />
        <Route path="languages" element={<LanguagesPage />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/auth/login" replace />} />
  </Routes>
);
