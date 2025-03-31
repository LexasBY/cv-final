import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/auth/ui/login";
import RegisterPage from "../pages/auth/ui/register";
import Layout from "./Layout";
import { UsersPage } from "../pages/employees";
import { ProfilePage } from "../pages/userProfile/ui/ProfilePage";
import { SkillsPage } from "../features/Skills/ui/SkillsPage";
import { LanguagesPage } from "../features/Languages/ui/LanguagesPage";
import { CvsPage } from "../pages/cvs/ui/cvspage";

export const Router = () => (
  <Routes>
    <Route path="/auth/login" element={<LoginPage />} />
    <Route path="/auth/signup" element={<RegisterPage />} />

    <Route element={<Layout />}>
      <Route path="/users" element={<UsersPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/languages" element={<LanguagesPage />} />
      <Route path="/cvs" element={<CvsPage />} />

      <Route path="/users/:userId" element={<ProfilePage />}>
        <Route path="skills" element={<SkillsPage />} />
        <Route path="languages" element={<LanguagesPage />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/auth/login" replace />} />
  </Routes>
);
