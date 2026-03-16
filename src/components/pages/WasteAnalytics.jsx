import React from 'react';
import WasteCollectionChart from '../charts/WasteCollectionChart';
import { ChartContainer } from '../charts/ChartContainer';

const WasteAnalytics = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Waste Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Waste Collection Trend">
          <WasteCollectionChart />
        </ChartContainer>
      </div>
    </div>
  );
};

export default WasteAnalytics;
