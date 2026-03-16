import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../Components/layout/MainLayout';
import OverviewPage from '../pages/OverviewPage';
import Reports from '../pages/Reports';
import Settings from '../pages/setting';
import FleetMonitoring from '../components/pages/FleetMonitoring';
import WasteAnalytics from '../components/pages/WasteAnalytics';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="waste-analytics" element={<WasteAnalytics />} />
          <Route path="recycling-metrics" element={<WasteAnalytics />} />
          <Route path="fleet-monitoring" element={<FleetMonitoring />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;