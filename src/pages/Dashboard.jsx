import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {

  const { user } = useAuth();

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      {/* ADMIN DASHBOARD */}

      {user?.role === "Admin" && (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white shadow rounded-xl p-6">
            Total Revenue
            <div className="text-2xl font-bold">
              $45,231
            </div>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            Active Users
            <div className="text-2xl font-bold">
              2,845
            </div>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            Waste Processed
            <div className="text-2xl font-bold">
              12.8 Tons
            </div>
          </div>

        </div>

      )}

      {/* MANAGER DASHBOARD */}

      {user?.role === "Manager" && (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white shadow rounded-xl p-6">
            Waste Collection Today
            <div className="text-2xl font-bold">
              3.2 Tons
            </div>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            Active Field Teams
            <div className="text-2xl font-bold">
              8
            </div>
          </div>

        </div>

      )}

      {/* ANALYST DASHBOARD */}

      {user?.role === "Analyst" && (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white shadow rounded-xl p-6">
            Recycling Rate
            <div className="text-2xl font-bold">
              68%
            </div>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            Carbon Saved
            <div className="text-2xl font-bold">
              4.5 Tons
            </div>
          </div>

        </div>

      )}

    </div>
  );
}