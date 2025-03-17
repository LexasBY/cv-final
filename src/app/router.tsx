import { Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "./Layout";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";

export const Router = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="auth/login" element={<LoginPage />} />
      <Route path="auth/signup" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Route>
  </Routes>
);
