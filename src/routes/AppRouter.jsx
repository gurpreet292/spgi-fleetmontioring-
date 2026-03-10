import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../Components/layout/MainLayout';
import GlobalFilters from '../Components/filters/GlobalFilters';

// Temporary Dummy Page: You will replace this with Teammate B's OverviewPage later!
const DummyOverview = () => (
  <div className="max-w-7xl mx-auto">
    <GlobalFilters />
    <div className="mt-8 bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl p-12 text-center">
      <h2 className="text-2xl font-bold text-blue-800 mb-2">UI Layout Test Mode</h2>
      <p className="text-blue-600 mb-6">Filters, Header, and Sidebar are working perfectly!</p>
      <div className="bg-white p-6 rounded-xl shadow-sm text-gray-400">[ Teammate B's Charts will go here when we merge ]
      </div>
    </div>
  </div>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DummyOverview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;