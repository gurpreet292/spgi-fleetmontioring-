import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen page-open-animate">

      <div className="text-center">

        <h1 className="text-4xl font-bold text-red-600 mb-2">403</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Access Denied</h2>

        <p className="text-gray-600 mb-8">
          You do not have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition w-full"
          >
            <Home size={18} />
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition w-full"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}