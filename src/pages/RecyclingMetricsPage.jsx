import React, { useContext, useMemo } from "react";

import { useApiData } from "../hooks/useApiData";
import { fetchDashboardData } from "../services/mockApi";
import { FilterContext } from "../context/FilterContext";

import {
  formatPieChartData,
  formatWasteCollectionData
} from "../utils/dataTransformer";

import { ChartContainer } from "../components/charts/ChartContainer";
import PieChartComponent from "../components/charts/PieChartComponent";
import WasteCollectionChart from "../components/charts/WasteCollectionChart";

import DataRangePicker from "../components/filters/DataRangePicker";

const RecyclingMetricsPage = () => {
  const { filters } = useContext(FilterContext);

  const { data: rawData, isLoading, error, refetch } =
    useApiData(fetchDashboardData);

  const filteredData = useMemo(() => {
    if (!rawData) return [];

    return rawData.filter((item) => {
      const matchCategory =
        !filters?.category ||
        filters.category === "All" ||
        item.category === filters.category ||
        item.region === filters.category;

      const searchTerm = (filters?.search || "").toLowerCase();
      const matchSearch =
        !searchTerm ||
        (item.region || "").toLowerCase().includes(searchTerm) ||
        (item.category || "").toLowerCase().includes(searchTerm);

      const hasDateRange =
        filters?.dateRange &&
        filters?.dateRange.startDate &&
        filters?.dateRange.endDate;

      let matchDateRange = true;
      if (hasDateRange) {
        const itemDate = new Date(item.date);
        const startDate = new Date(filters.dateRange.startDate);
        const endDate = new Date(filters.dateRange.endDate);

        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        matchDateRange = itemDate >= startDate && itemDate <= endDate;
      }

      return matchCategory && matchSearch && matchDateRange;
    });
  }, [rawData, filters]);

  const pieData = useMemo(() => formatPieChartData(filteredData), [filteredData]);
  const wasteCollectionData = useMemo(
    () => formatWasteCollectionData(filteredData),
    [filteredData]
  );

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">

      {/* HEADER */}

      <div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">Recycling Metrics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Environmental impact and sustainability performance
        </p>
      </div>

      {/* FILTERS */}

      <div className="flex gap-3 items-center flex-wrap">
        <DataRangePicker withGranularity />

      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-500 dark:text-gray-300">Recycling Rate</p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">44%</h2>
          <p className="text-xs text-red-500">-1% vs last week</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-500 dark:text-gray-300">Carbon Saved</p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">33.6K kg CO₂</h2>
          <p className="text-xs text-green-600">+15% this month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-500 dark:text-gray-300">Materials Processed</p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">48.9K kg</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-500 dark:text-gray-300">Landfill Reduction</p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">26%</h2>
          <p className="text-xs text-green-600">+8% improvement</p>
        </div>

      </div>

      {/* PROGRESS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-300">Monthly Recycling Target</p>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">44%</h2>

          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded mt-2">
            <div className="bg-green-600 h-2 rounded" style={{ width: "88%" }}></div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
            Working towards 50% recycling rate
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-300">Carbon Offset Goal</p>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">34 tons</h2>

          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded mt-2">
            <div className="bg-green-600 h-2 rounded" style={{ width: "68%" }}></div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
            Annual carbon offset target
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-300">Zero Waste Progress</p>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">26%</h2>

          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded mt-2">
            <div className="bg-red-500 h-2 rounded" style={{ width: "26%" }}></div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
            Journey to zero landfill waste
          </p>
        </div>

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">

          <ChartContainer
            title="Waste Collection Trend"
            isLoading={isLoading}
            error={error}
            isEmpty={wasteCollectionData.length === 0}
            onRetry={() => refetch()}
          >
            <WasteCollectionChart data={wasteCollectionData} />
          </ChartContainer>

        </div>

        <div>

          <ChartContainer
            title="Recyclable Materials"
            isLoading={isLoading}
            error={error}
            isEmpty={pieData.length === 0}
            onRetry={() => refetch()}
          >
            <PieChartComponent data={pieData} />
          </ChartContainer>

        </div>

      </div>

      {/* IMPACT CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-300">Trees Equivalent</p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">1.6K</h2>
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Trees worth of CO₂ absorbed annually
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-300">Water Saved</p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">122.3K liters</h2>
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Through recycling vs new production
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-300">Energy Saved</p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">39.1K kWh</h2>
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Equivalent energy savings from recycling
          </p>
        </div>

      </div>

    </div>
  );
};

export default RecyclingMetricsPage;