import React from 'react';
import { ChartContainer } from '../components/charts/ChartContainer';
import WasteCollectionChart from '../components/charts/WasteCollectionChart';
import PieChartComponent from '../components/charts/PieChartComponent';

const wasteTrendData = [
  { date: '13 Feb', waste: 4800, recycled: 2100 },
  { date: '15 Feb', waste: 5300, recycled: 2200 },
  { date: '17 Feb', waste: 4600, recycled: 1900 },
  { date: '19 Feb', waste: 5100, recycled: 2500 },
  { date: '21 Feb', waste: 3900, recycled: 2000 },
  { date: '23 Feb', waste: 5400, recycled: 2400 },
  { date: '25 Feb', waste: 4300, recycled: 2100 },
  { date: '27 Feb', waste: 5300, recycled: 2400 },
  { date: '1 Mar', waste: 4500, recycled: 2000 },
  { date: '3 Mar', waste: 4700, recycled: 2300 },
  { date: '5 Mar', waste: 5200, recycled: 2101 },
  { date: '7 Mar', waste: 5300, recycled: 2400 },
  { date: '9 Mar', waste: 4800, recycled: 2200 },
  { date: '11 Mar', waste: 5500, recycled: 2700 },
];

const materialsData = [
  { name: 'Plastic', value: 25 },
  { name: 'Organic', value: 35 },
  { name: 'Metal', value: 15 },
  { name: 'Paper', value: 25 },
];

const WasteAnalytics = () => {
  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6">
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">Waste Management Analytics</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Simple overview of waste collection and recycling performance.
      </p>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">Today Summary</h2>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc pl-5">
          <li>Total Waste Collected: 2,450 kg</li>
          <li>Recycled Waste: 1,080 kg</li>
          <li>Landfill Waste: 1,370 kg</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartContainer title="Waste Collection Trend">
            <WasteCollectionChart data={wasteTrendData} />
          </ChartContainer>
        </div>

        <div>
          <ChartContainer title="Recyclable Materials">
            <PieChartComponent data={materialsData} />
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default WasteAnalytics;
