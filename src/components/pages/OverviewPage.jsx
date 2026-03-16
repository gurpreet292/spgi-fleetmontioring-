import React, { useContext, useMemo, useState } from "react";

// Context
import { FilterContext } from "../../context/FilterContext";

// Hooks
import { useApiData } from "../../hooks/useApiData";

// API
import { fetchDashboardData } from "../../services/mockApi";

// Data Transformers
import {
  calculateKPIs,
  formatBarChartData,
  formatLineChartData,
  formatPieChartData,
} from "../../utils/dataTransformer";

// Components
import KpiGrid from "../kpi/KpiGrid";
import { ChartContainer } from "../charts/ChartContainer";
import BarChartComponent from "../charts/BarChartComponent";
import LineChartComponent from "../charts/LineChartComponent";
import PieChartComponent from "../charts/PieChartComponent";

// Filters (Reusable)
import DataRangePicker from "../filters/DataRangePicker";
import GlobalFilters from "../filters/GlobalFilters";
import SearchInput from "../filters/SearchInput";

const OverviewPage = () => {

  const { filters = {}, setFilters } = useContext(FilterContext) || {};

  const { data: rawData, isLoading, error, refetch } =
    useApiData(fetchDashboardData);

  const [rangeType, setRangeType] = useState("Daily");

  // FILTER DATA
  const filteredData = useMemo(() => {
    if (!rawData || !Array.isArray(rawData)) return [];

    return rawData.filter((item) => {

      const region = String(item?.region || item?.category || "");
      const search = String(filters?.search || "");
      const selectedCat = String(filters?.category || "All");

      const matchCat =
        selectedCat === "All" || selectedCat === "" || region === selectedCat;

      const matchSearch =
        region.toLowerCase().includes(search.toLowerCase());

      return matchCat && matchSearch;

    });

  }, [rawData, filters]);

  // DATA TRANSFORMATION
  const kpiData = useMemo(() => calculateKPIs(filteredData), [filteredData]);
  const barData = useMemo(() => formatBarChartData(filteredData), [filteredData]);
  const lineData = useMemo(() => formatLineChartData(filteredData), [filteredData]);
  const pieData = useMemo(() => formatPieChartData(filteredData), [filteredData]);

  return (

    <div className="space-y-6 max-w-7xl mx-auto p-4">

      {/* DASHBOARD HEADER */}

      <div>
        <h1 className="text-xl font-semibold">
          Performance Analytics Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Track our global sustainability initiatives and environmental impact
        </p>
      </div>


      {/* FILTER SECTION */}

      <div className="flex flex-wrap gap-4 items-center">

        <SearchInput
          value={filters.search || ""}
          onChange={(val) => setFilters({ ...filters, search: val })}
        />

        <GlobalFilters
          value={filters.category || "All"}
          onChange={(val) => setFilters({ ...filters, category: val })}
        />

        <DataRangePicker />

        <select
          value={rangeType}
          onChange={(e) => setRangeType(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>

      </div>


      {/* KPI CARDS */}

      <KpiGrid kpiData={kpiData} />


      {/* ===== ROW 1 ===== */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LINE CHART */}

        <div className="lg:col-span-2">

          <ChartContainer
            title="Waste Collection Trend"
            isLoading={isLoading}
            error={error}
            isEmpty={lineData.length === 0}
            onRetry={() => refetch()}
          >
            <LineChartComponent data={lineData} />
          </ChartContainer>

        </div>


        {/* PIE CHART */}

        <div>

          <ChartContainer
            title="Waste Type Distribution"
            isLoading={isLoading}
            error={error}
            isEmpty={pieData.length === 0}
            onRetry={() => refetch()}
          >
            <PieChartComponent data={pieData} />
          </ChartContainer>

        </div>

      </div>


      {/* ===== ROW 2 ===== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <ChartContainer
          title="CO₂ Prevented by Region"
          isLoading={isLoading}
          error={error}
          isEmpty={barData.length === 0}
          onRetry={() => refetch()}
        >
          <BarChartComponent data={barData} />
        </ChartContainer>

      </div>

    </div>

  );

};

export default OverviewPage;