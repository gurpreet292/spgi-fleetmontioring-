import React, { useEffect, useState, useMemo } from "react";
import { vehicles as mockVehicles } from "../../services/mockData";

const FleetMonitoring = () => {
  useEffect(() => {
    console.log("FleetMonitoring mounted");
  }, []);

  const [filter, setFilter] = useState("All");

  const filteredVehicles = useMemo(() => {
    if (!filter || filter === "All") return mockVehicles;
    return mockVehicles.filter((v) => v.status.toLowerCase() === filter.toLowerCase());
  }, [filter]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-semibold">Fleet Monitoring</h1>
        <p className="text-sm text-gray-500">Real-time tracking of vehicle operations</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="p-4 bg-white border rounded-lg">
          <p className="text-xs text-gray-500">Total Fleet</p>
          <h2 className="text-lg font-semibold">20 trucks</h2>
        </div>
        <div className="p-4 bg-green-50 border rounded-lg">
          <p className="text-xs text-gray-500">Active Trucks</p>
          <h2 className="text-lg font-semibold">15</h2>
        </div>
        <div className="p-4 bg-white border rounded-lg">
          <p className="text-xs text-gray-500">Idle Trucks</p>
          <h2 className="text-lg font-semibold">3</h2>
        </div>
        <div className="p-4 bg-red-50 border rounded-lg">
          <p className="text-xs text-gray-500">In Maintenance</p>
          <h2 className="text-lg font-semibold">2</h2>
        </div>
        <div className="p-4 bg-white border rounded-lg">
          <p className="text-xs text-gray-500">Avg Efficiency</p>
          <h2 className="text-lg font-semibold">85%</h2>
        </div>
        <div className="p-4 bg-white border rounded-lg">
          <p className="text-xs text-gray-500">Avg Fuel Level</p>
          <h2 className="text-lg font-semibold">65%</h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-white border rounded-lg">
          <h3 className="text-sm font-semibold mb-4">Fleet Utilization</h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between">
                <span>Active</span>
                <span>15</span>
              </div>
              <div className="bg-gray-200 h-3 rounded">
                <div className="bg-green-600 h-3 rounded w-[75%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Idle</span>
                <span>3</span>
              </div>
              <div className="bg-gray-200 h-3 rounded">
                <div className="bg-yellow-500 h-3 rounded w-[20%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Maintenance</span>
                <span>2</span>
              </div>
              <div className="bg-gray-200 h-3 rounded">
                <div className="bg-red-500 h-3 rounded w-[10%]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-400">
            <p className="text-sm">Route Map</p>
            <p className="text-xs mt-2">Map Integration</p>
            <p className="text-xs text-gray-400">Add Mapbox or Google Maps integration here</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex gap-2 mb-3 text-xs">
          {[
            { key: "All", label: "All" },
            { key: "Active", label: "Active" },
            { key: "Idle", label: "Idle" },
            { key: "Maintenance", label: "Maintenance" },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key)}
              className={`px-3 py-1 rounded transition-colors disabled:opacity-50 ${
                filter === btn.key
                  ? "bg-green-600 text-white"
                  : "border bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <h3 className="text-sm font-semibold mb-4">Vehicle Status ({filteredVehicles.length} trucks)</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="p-4 bg-white border rounded-lg space-y-3">
              <div className="flex justify-between">
                <h4 className="font-medium">{vehicle.id}</h4>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">{vehicle.status}</span>
              </div>
              <p className="text-xs text-gray-500">{vehicle.location}</p>

              <div>
                <p className="text-xs text-gray-500">Fuel Level</p>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div className="bg-green-600 h-2 rounded" style={{ width: `${vehicle.fuel}%` }} />
                </div>
                <p className="text-xs text-right">{vehicle.fuel}%</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Route Efficiency</p>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div className="bg-green-600 h-2 rounded" style={{ width: `${vehicle.efficiency}%` }} />
                </div>
                <p className="text-xs text-right">{vehicle.efficiency}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FleetMonitoring;
