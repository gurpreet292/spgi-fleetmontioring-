import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({ children, roles }) {

  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/access-denied" />;
  }

  return children;
}