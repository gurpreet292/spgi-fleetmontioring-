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
import GlobalFilters from '../Components/filters/GlobalFilters';
import SearchInput from '../Components/filters/SearchInput';
import DataRangePicker from '../Components/filters/DataRangePicker';
import RecentActivity from '../components/common/RecentActivity';

const OverviewPage = () => {
  // Access global filters state
  const { filters } = useContext(FilterContext);

  // Fetch API data
  const { data: rawData, isLoading, error, refetch } = useApiData(fetchDashboardData);

  // Stabilize retry function
  const handleRetry = useCallback(() => refetch(), [refetch]);

  // Client-side filtering logic (Memoized to prevent unnecessary recalculations)
  const filteredData = useMemo(() => {
    if (!rawData) return [];
    
    // If no filters are applied, return all data
    const hasNoFilters = (!filters.category || filters.category === 'All') && (!filters.search || filters.search === '');
    
    if (hasNoFilters) {
      return rawData;
    }
    
    return rawData.filter(item => {
      const matchCategory = !filters.category || filters.category === 'All' || (item.category === filters.category) || (item.region === filters.category);
      const matchSearch = !filters.search || filters.search === '' || (
        (item.region || '').toLowerCase().includes((filters.search || '').toLowerCase()) ||
        (item.category || '').toLowerCase().includes((filters.search || '').toLowerCase())
      );

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
  }, [rawData, filters.category, filters.search, filters.dateRange]);

  // Transform data for charts (Memoized for performance)
  const kpiData = useMemo(() => calculateKPIs(filteredData), [filteredData]);
  const barData = useMemo(() => formatBarChartData(filteredData), [filteredData]);
  const lineData = useMemo(() => formatLineChartData(filteredData), [filteredData]);
  const pieData = useMemo(() => formatPieChartData(filteredData), [filteredData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-600 text-center w-full">
              Performance Analytics Dashboard
           </h1>
          <p className="flex flex-col items-center justify-center text-center text-gray-700 dark:text-gray-300"> Track our global sustainability initiatives and environmental impact</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <SearchInput />
          <GlobalFilters />
          <DataRangePicker withGranularity />
        </div>

        <KpiGrid kpiData={kpiData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartContainer title="🌱 CO₂ Saved by Region" isLoading={isLoading} error={error} isEmpty={barData.length === 0} onRetry={handleRetry}>
            <BarChartComponent data={barData} />
          </ChartContainer>
          
          <ChartContainer title="🌳 Trees Planted Daily" isLoading={isLoading} error={error} isEmpty={lineData.length === 0} onRetry={handleRetry}>
            <LineChartComponent data={lineData} />
          </ChartContainer>
          
          <ChartContainer title="Recyclable Materials" isLoading={isLoading} error={error} isEmpty={pieData.length === 0} onRetry={handleRetry}>
            <PieChartComponent data={pieData} />
          </ChartContainer>
        </div>

        <RecentActivity />
      </div>
    </div>
  );
};

export default OverviewPage;