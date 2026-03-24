import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

import Dashboard from "../pages/Dashboard";
import Operations from "../pages/Operations";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import AccessDenied from "../pages/AccessDenied";
import LoginPage from "../pages/LoginPage";

import ProtectedRoute from "../components/layout/ProtectedRoute";

function HomeRedirect() {

  const role = localStorage.getItem("role");

  if (!role) return <Navigate to="/login" replace />;

  if (role === "Admin") return <Navigate to="/dashboard" replace />;

  if (role === "Manager") return <Navigate to="/operations" replace />;

  if (role === "Analyst") return <Navigate to="/analytics" replace />;

  return <Navigate to="/access-denied" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomeRedirect />} />

      <Route element={<Layout />}>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/operations"
          element={
            <ProtectedRoute roles={["Admin","Manager"]}>
              <Operations />
            </ProtectedRoute>
         }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute roles={["Admin","Analyst"]}>
              <Analytics />
            </ProtectedRoute>
        }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute roles={["Admin","Manager","Analyst"]}>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Route>

      <Route path="/access-denied" element={<AccessDenied />} />

    </Routes>
  );
}