import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../Components/layout/MainLayout';
import Loader from '../Components/common/Loader';

const OverviewPage = lazy(() => import('../pages/OverviewPage'));
const Reports = lazy(() => import('../pages/Reports'));
const Settings = lazy(() => import('../pages/setting'));
const RecyclingMetricsPage = lazy(() => import('../pages/RecyclingMetricsPage'));
const FleetMonitoring = lazy(() => import('../components/pages/FleetMonitoring'));
const WasteAnalytics = lazy(() => import('../components/pages/WasteAnalytics'));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader message="Loading page..." />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="waste-analytics" element={<WasteAnalytics />} />
            <Route path="recycling-metrics" element={<RecyclingMetricsPage />} />
            <Route path="fleet-monitoring" element={<FleetMonitoring />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;