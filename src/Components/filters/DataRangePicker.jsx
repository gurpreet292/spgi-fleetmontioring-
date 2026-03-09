import React, { useContext } from "react";
import { Calendar } from "lucide-react";
import { FilterContext } from "../../context/FilterContext";

const DataRangePicker = () => {

  const { filters, setFilters } = useContext(FilterContext);

  return (
    <div className="relative flex-1">
      <Calendar
        className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"
        size={18}
      />

      <select
        value={filters.dataRange}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            dataRange: e.target.value
          }))
        }
        className="w-full pl-10 pr-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-300 transition-colors"
      >
        <option value="All Time">All Time</option>
        <option value="Last 7 Days">Last 7 Days</option>
        <option value="Last 30 Days">Last 30 Days</option>
      </select>
    </div>
  );
};
export default DataRangePicker;