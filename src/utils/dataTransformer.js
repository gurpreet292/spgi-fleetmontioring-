export const calculateKPIs = (data) => {
  if (!data || data.length === 0) return { 
    totalCO2: 0, 
    totalTrees: 0, 
    totalProjects: 0, 
    avgImpact: 0,
    totalPollutionReduced: 0,
    totalWaterSaved: 0,
    totalWasteRecycled: 0,
    totalEnergyGenerated: 0
  };

  const totalCO2 = data.reduce((acc, curr) => acc + (curr.co2Saved || 0), 0);
  const totalTrees = data.reduce((acc, curr) => acc + (curr.treesPlanted || 0), 0);
  const totalProjects = data.length;
  const avgImpact = totalProjects > 0 ? (totalCO2 / totalProjects).toFixed(2) : 0;
  const totalPollutionReduced = data.reduce((acc, curr) => acc + (curr.pollutionReduced || 0), 0);
  const totalWaterSaved = data.reduce((acc, curr) => acc + (curr.waterSaved || 0), 0);
  const totalWasteRecycled = data.reduce((acc, curr) => acc + (curr.wasteRecycled || 0), 0);
  const totalEnergyGenerated = data.reduce((acc, curr) => acc + (curr.energyGenerated || 0), 0);

  return { 
    totalCO2, 
    totalTrees, 
    totalProjects, 
    avgImpact,
    totalPollutionReduced,
    totalWaterSaved,
    totalWasteRecycled,
    totalEnergyGenerated
  };
};

export const formatBarChartData = (data) => {
  if (!data || data.length === 0) return [];
  const grouped = data.reduce((acc, curr) => {
    acc[curr.region] = (acc[curr.region] || 0) + (curr.co2Saved || 0);
    return acc;
  }, {});
  return Object.keys(grouped).map(key => ({ name: key, value: grouped[key] }));
};

export const formatLineChartData = (data) => {
  if (!data || data.length === 0) return [];
  const grouped = data.reduce((acc, curr) => {
    acc[curr.date] = (acc[curr.date] || 0) + (curr.treesPlanted || 0);
    return acc;
  }, {});
  return Object.keys(grouped).sort().map(key => ({ name: key, value: grouped[key] }));
};

export const formatPieChartData = (data) => {
  if (!data || data.length === 0) return [];
  const grouped = data.reduce((acc, curr) => {
    acc[curr.region] = (acc[curr.region] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(grouped).map(key => ({ name: key, value: grouped[key] }));
};

export const formatWasteCollectionData = (data) => {
  if (!data || data.length === 0) return [];

  const grouped = data.reduce((acc, curr) => {
    const date = curr.date;
    if (!acc[date]) {
      acc[date] = { date, waste: 0, recycled: 0 };
    }

    const recycled = curr.wasteRecycled || 0;
    const pollutionReduced = curr.pollutionReduced || 0;

    acc[date].recycled += recycled;
    acc[date].waste += recycled + pollutionReduced;
    return acc;
  }, {});

  return Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));
};