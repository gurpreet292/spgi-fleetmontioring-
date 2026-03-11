import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import Operations from "../pages/Operations";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import AccessDenied from "../pages/AccessDenied";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "../components/layout/ProtectedRoute";

function HomeRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-6 text-xl">No user found. Please log in first.</div>;
  }

  if (user.role === "Admin") return <Navigate to="/dashboard" />;
  if (user.role === "Manager") return <Navigate to="/operations" />;
  if (user.role === "Analyst") return <Navigate to="/analytics" />;

  return <Navigate to="/access-denied" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />

      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["Admin", "Manager", "Analyst"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/operations"
          element={
            <ProtectedRoute roles={["Admin", "Manager"]}>
              <Operations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute roles={["Admin", "Analyst"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/access-denied" element={<AccessDenied />} />
    </Routes>
  );
}