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
      return matchCategory && matchSearch;
    });
  }, [rawData, filters.category, filters.search]);

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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2">
            🌍 Environmental Impact Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Track our global sustainability initiatives and environmental impact</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <SearchInput />
          <GlobalFilters />
        </div>

        <KpiGrid kpiData={kpiData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartContainer title="🌱 CO₂ Saved by Region" isLoading={isLoading} error={error} isEmpty={barData.length === 0} onRetry={handleRetry}>
            <BarChartComponent data={barData} />
          </ChartContainer>
          
          <ChartContainer title="🌳 Trees Planted Daily" isLoading={isLoading} error={error} isEmpty={lineData.length === 0} onRetry={handleRetry}>
            <LineChartComponent data={lineData} />
          </ChartContainer>
          
          <ChartContainer title="🌎 Projects by Region" isLoading={isLoading} error={error} isEmpty={pieData.length === 0} onRetry={handleRetry}>
            <PieChartComponent data={pieData} />
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;