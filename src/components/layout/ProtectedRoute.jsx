import { Navigate } from "react-router-dom";
import { canAccessFeature } from "../../utils/roles";

export default function ProtectedRoute({ children, roles, featureKey }) {

  const role = localStorage.getItem("role");
  const user = localStorage.getItem("user");

  // Not logged in - redirect to login
  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }

  // If roles array is provided, check against it
  if (roles && !roles.includes(role)) {
    return <Navigate to="/access-denied" replace />;
  }

  if (featureKey && !canAccessFeature(role, featureKey)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            Your role (<span className="font-semibold capitalize">{role}</span>) doesn't have access to this feature.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Go back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return children;
}
