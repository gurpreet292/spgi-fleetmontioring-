import React from 'react';
import KpiCard from './KpiCard';

const KpiGrid = ({ kpiData }) => {
  if (!kpiData) return null;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <KpiCard 
        title="Total CO₂ Prevented" 
        value={kpiData.totalCO2} 
        suffix=" Tons" 
        trend="+12%" 
        color="emerald"
      />
      <KpiCard 
        title="Trees Planted" 
        value={kpiData.totalTrees} 
        trend="+8%" 
        color="green"
      />
      <KpiCard 
        title="Pollution Reduced" 
        value={kpiData.totalPollutionReduced} 
        suffix=" kg" 
        trend="+15%" 
        color="teal"
      />
      <KpiCard 
        title="Water Saved" 
        value={(kpiData.totalWaterSaved / 1000).toFixed(1)} 
        suffix=" KL" 
        trend="+10%" 
        color="cyan"
      />
    </div>
  );
};

export default KpiGrid;