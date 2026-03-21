import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {

  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
        Dashboard
      </h1>

      {/* ADMIN DASHBOARD */}

      {user?.role === "Admin" && (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          <div className="bg-white shadow rounded-xl p-4 md:p-6">
            <div className="text-gray-600 text-xs md:text-sm font-medium mb-2">Total Revenue</div>
            <div className="text-xl md:text-2xl font-bold text-green-700">$45,231</div>
          </div>

          <div className="bg-white shadow rounded-xl p-4 md:p-6">
            <div className="text-gray-600 text-xs md:text-sm font-medium mb-2">Active Users</div>
            <div className="text-xl md:text-2xl font-bold text-green-700">2,845</div>
          </div>

          <div className="bg-white shadow rounded-xl p-4 md:p-6">
            <div className="text-gray-600 text-xs md:text-sm font-medium mb-2">Waste Processed</div>
            <div className="text-xl md:text-2xl font-bold text-green-700">12.8 Tons</div>
          </div>
        </div>

      )}

      {/* MANAGER DASHBOARD */}

      {user?.role === "Manager" && (

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
          <div className="bg-white shadow rounded-xl p-4 md:p-6">
            <div className="text-gray-600 text-xs md:text-sm font-medium mb-2">Waste Collection Today</div>
            <div className="text-xl md:text-2xl font-bold text-green-700">3.2 Tons</div>
          </div>

          <div className="bg-white shadow rounded-xl p-4 md:p-6">
            <div className="text-gray-600 text-xs md:text-sm font-medium mb-2">Active Field Teams</div>
            <div className="text-xl md:text-2xl font-bold text-green-700">8</div>
          </div>
        </div>

      )}

      {/* ANALYST DASHBOARD */}

      {user?.role === "Analyst" && (

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
          <div className="bg-white shadow rounded-xl p-4 md:p-6">
            <div className="text-gray-600 text-xs md:text-sm font-medium mb-2">Recycling Rate</div>
            <div className="text-xl md:text-2xl font-bold text-green-700">68%</div>
          </div>

          <div className="bg-white shadow rounded-xl p-4 md:p-6">
            <div className="text-gray-600 text-xs md:text-sm font-medium mb-2">Carbon Saved</div>
            <div className="text-xl md:text-2xl font-bold text-green-700">4.5 Tons</div>
          </div>
        </div>

      )}

    </div>
  );
}