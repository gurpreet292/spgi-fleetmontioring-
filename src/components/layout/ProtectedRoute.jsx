import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {

  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}
