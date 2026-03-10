import React, { useContext, useMemo, useCallback } from 'react';

// Make sure these match your actual folder structure!
import { FilterContext } from '../components/context/FilterContext'; 
import { useApiData } from '../hooks/useApiData';
import { fetchDashboardData } from '../services/mockApi';
import { calculateKPIs, formatBarChartData, formatLineChartData, formatPieChartData } from '../utils/dataTransformer';

import KpiGrid from '../components/kpi/KpiGrid';
import { ChartContainer } from '../components/charts/ChartContainer';
import BarChartComponent from '../components/charts/BarChartComponent';
import LineChartComponent from '../components/charts/LineChartComponent';
import PieChartComponent from '../components/charts/PieChartComponent';

const OverviewPage = () => {
  const contextData = useContext(FilterContext) || {};
  const filters = contextData.filters || {};
  const { data: rawData, isLoading, error, refetch } = useApiData(fetchDashboardData);

  // 100% CRASH-PROOF FILTERING WITH TRY/CATCH
  const filteredData = useMemo(() => {
    try {
      if (!rawData || !Array.isArray(rawData)) return[];
      
      return rawData.filter(item => {
        // Force everything to be a string safely so .toLowerCase() NEVER crashes
        const region = String(item?.region || item?.category || '');
        const search = String(filters?.search || filters?.searchTerm || '');
        const selectedCat = String(filters?.category || 'All');
        
        // Safe comparisons
        const matchCat = selectedCat === 'All' || selectedCat === '' || region === selectedCat;
        const matchSearch = region.toLowerCase().includes(search.toLowerCase());
        
        return matchCat && matchSearch;
      });
    } catch (err) {
      console.error("Filtering crashed, but we caught it safely!", err);
      return []; // Return empty data instead of crashing the whole app
    }
  },[rawData, filters]);

  // Transform data for charts
  const kpiData = useMemo(() => calculateKPIs(filteredData), [filteredData]);
  const barData = useMemo(() => formatBarChartData(filteredData),[filteredData]);
  const lineData = useMemo(() => formatLineChartData(filteredData),[filteredData]);
  const pieData = useMemo(() => formatPieChartData(filteredData), [filteredData]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      <KpiGrid kpiData={kpiData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="CO₂ Prevented by Region" isLoading={isLoading} error={error} isEmpty={barData.length === 0} onRetry={() => refetch()}>
          <BarChartComponent data={barData} />
        </ChartContainer>
        
        <ChartContainer title="Daily Trees Planted" isLoading={isLoading} error={error} isEmpty={lineData.length === 0} onRetry={() => refetch()}>
          <LineChartComponent data={lineData} />
        </ChartContainer>
        
        <ChartContainer title="Projects by Region" isLoading={isLoading} error={error} isEmpty={pieData.length === 0} onRetry={() => refetch()}>
          <PieChartComponent data={pieData} />
        </ChartContainer>
      </div>
    </div>
  );
};

export default OverviewPage;