import React, { useContext, useMemo, useCallback } from 'react';
import { FilterContext } from '../context/FilterContext';
import { useApiData } from '../hooks/useApiData';
import { fetchDashboardData } from '../services/mockApi';
import { calculateKPIs, formatBarChartData, formatLineChartData, formatPieChartData } from '../utils/dataTransformer';

import KpiGrid from '../components/kpi/KpiGrid';
import { ChartContainer } from '../components/charts/ChartContainer';
import BarChartComponent from '../components/charts/BarChartComponent';
import LineChartComponent from '../components/charts/LineChartComponent';
import PieChartComponent from '../components/charts/PieChartComponent';
import GlobalFilters from '../components/filters/GlobalFilters';
import SearchInput from '../components/filters/SearchInput';
import DataRangePicker from '../components/filters/DataRangePicker';
import RecentActivity from '../components/common/RecentActivity';

const OverviewPage = () => {
  const { filters } = useContext(FilterContext);

  const { data: rawData, isLoading, error, refetch } = useApiData(fetchDashboardData);

  const handleRetry = useCallback(() => refetch(), [refetch]);

  const filteredData = useMemo(() => {
    if (!rawData) return [];

    const hasNoFilters =
      (!filters.category || filters.category === 'All') &&
      (!filters.search || filters.search === '');

    if (hasNoFilters) {
      return rawData;
    }

    return rawData.filter(item => {
      const matchCategory =
        !filters.category ||
        filters.category === 'All' ||
        item.category === filters.category ||
        item.region === filters.category;

      const matchSearch =
        !filters.search ||
        filters.search === '' ||
        (item.region || '')
          .toLowerCase()
          .includes((filters.search || '').toLowerCase()) ||
        (item.category || '')
          .toLowerCase()
          .includes((filters.search || '').toLowerCase());

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

        matchDateRange =
          itemDate >= startDate && itemDate <= endDate;
      }

      return matchCategory && matchSearch && matchDateRange;
    });
  }, [rawData, filters.category, filters.search, filters.dateRange]);

  const kpiData = useMemo(() => calculateKPIs(filteredData), [filteredData]);
  const barData = useMemo(() => formatBarChartData(filteredData), [filteredData]);
  const lineData = useMemo(() => formatLineChartData(filteredData), [filteredData]);
  const pieData = useMemo(() => formatPieChartData(filteredData), [filteredData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-3 sm:p-4 md:p-6">
      <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 text-center w-full">
            Performance Analytics Dashboard
          </h1>
          <p className="flex flex-col items-center justify-center text-center text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300">
            Track our global sustainability initiatives and environmental impact
          </p>
        </div>

        {/* ✅ UPDATED FILTERS */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 overflow-visible z-20">
          
          <div className="w-full sm:w-auto flex-1 min-w-[200px] z-20">
            <SearchInput />
          </div>

          <div className="w-full sm:w-auto z-30">
            <GlobalFilters />
          </div>

          <div className="w-full sm:w-auto z-20">
            <DataRangePicker withGranularity />
          </div>

        </div>

        {/* KPI */}
        <KpiGrid kpiData={kpiData} />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <ChartContainer
            title="🌱 CO₂ Saved by Region"
            isLoading={isLoading}
            error={error}
            isEmpty={barData.length === 0}
            onRetry={handleRetry}
          >
            <BarChartComponent data={barData} />
          </ChartContainer>

          <ChartContainer
            title="🌳 Trees Planted Daily"
            isLoading={isLoading}
            error={error}
            isEmpty={lineData.length === 0}
            onRetry={handleRetry}
          >
            <LineChartComponent data={lineData} />
          </ChartContainer>

          <ChartContainer
            title="Recyclable Materials"
            isLoading={isLoading}
            error={error}
            isEmpty={pieData.length === 0}
            onRetry={handleRetry}
          >
            <PieChartComponent data={pieData} />
          </ChartContainer>

        </div>

        {/* Activity */}
        <RecentActivity />

      </div>
    </div>
  );
};

export default OverviewPage;