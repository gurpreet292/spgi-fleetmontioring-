import React from "react";
import { Download } from "lucide-react";

const ReportCard = ({ title, description, onDownload, loading }) => {
  return (
    <div className="bg-white border rounded-lg p-4 flex items-center justify-between mb-4">
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      <button
        onClick={onDownload}
        className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-gray-100"
      >
        <Download size={16} />
        {loading ? "Generating..." : "Download"}
      </button>
    </div>
  );
};

export default React.memo(ReportCard);
