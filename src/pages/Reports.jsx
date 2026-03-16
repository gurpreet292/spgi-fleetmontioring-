import React, { useState, useCallback } from "react";
import {
  FileText,
  Calendar,
  BarChart3,
  Download,
  Search
} from "lucide-react";
import ActionCard from "../Components/common/ActionCard";
import { downloadReport } from "../services/reportService";

const reports = [
  {
    title: "Weekly Waste Analytics",
    description: "Detailed waste collection and recycling metrics",
  },
  {
    title: "Fleet Performance Report",
    description: "Truck routes and efficiency analytics",
  },
  {
    title: "Sustainability Impact Report",
    description: "CO₂ reduction and recycling statistics",
  },
  {
    title: "Monthly Collection Summary",
    description: "Overview of monthly waste collection volumes",
  },
  {
    title: "Zone Performance Report",
    description: "Area-wise collection and disposal performance",
  },
  {
    title: "Compliance Audit Report",
    description: "Regulatory and service compliance snapshot",
  },
];

const Reports = () => {
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDownload = useCallback(async (index, format) => {
    try {
      setLoadingIndex(index);

      await downloadReport();

      alert(`Report downloaded as ${format}`);
    } catch {
      alert("Failed to generate report. Please retry.");
    } finally {
      setLoadingIndex(null);
    }
  }, []);

  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">

      {/* Action Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <ActionCard
          icon={FileText}
          title="Generate Report"
          description="Create custom report"
          iconColor="text-green-600"
        />

        <ActionCard
          icon={Calendar}
          title="Schedule Reports"
          description="Set up auto-generation"
          iconColor="text-green-600"
        />

        <ActionCard
          icon={BarChart3}
          title="Analytics Export"
          description="Export raw data"
          iconColor="text-yellow-500"
        />

      </div>

      {/* Search Bar */}

      <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full md:w-96">
        <Search size={18} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search reports..."
          className="outline-none w-full text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Reports List */}

      <div>
        <h2 className="text-lg font-semibold mb-4">Reports</h2>

        {filteredReports.map((report, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 mb-3 bg-white border rounded-lg"
          >
            <div>
              <h3 className="text-sm font-semibold">{report.title}</h3>
              <p className="text-xs text-gray-500">{report.description}</p>
            </div>

            {/* Download Dropdown */}

            <div className="relative">

  <button
    onClick={() =>
      setOpenDropdown(openDropdown === index ? null : index)
    }
    className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-gray-100"
  >
    <Download size={16} />
    {loadingIndex === index ? "Generating..." : "Download"}
  </button>

  {openDropdown === index && (
    <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-28 z-50">

      <button
        onClick={() => handleDownload(index, "CSV")}
        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
      >
        CSV
      </button>

      <button
        onClick={() => handleDownload(index, "PDF")}
        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
      >
        PDF
      </button>

      <button
        onClick={() => handleDownload(index, "JSON")}
        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
      >
        JSON
      </button>

    </div>
  )}


            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Reports;