import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const fallbackData = [
  { date: "13 Feb", waste: 4800, recycled: 2100 },
  { date: "15 Feb", waste: 5300, recycled: 2200 },
  { date: "17 Feb", waste: 4600, recycled: 1900 },
  { date: "19 Feb", waste: 5100, recycled: 2500 },
  { date: "21 Feb", waste: 3900, recycled: 2000 },
  { date: "23 Feb", waste: 5400, recycled: 2400 },
  { date: "25 Feb", waste: 4300, recycled: 2100 },
  { date: "27 Feb", waste: 5300, recycled: 2400 },
  { date: "1 Mar", waste: 4500, recycled: 2000 },
  { date: "3 Mar", waste: 4700, recycled: 2300 },
  { date: "5 Mar", waste: 5200, recycled: 2101 },
  { date: "7 Mar", waste: 5300, recycled: 2400 },
  { date: "9 Mar", waste: 4800, recycled: 2200 },
  { date: "11 Mar", waste: 5500, recycled: 2700 },
];

const WasteCollectionChart = ({ data = fallbackData }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRecycled" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
          <Tooltip />
          <Area type="monotone" dataKey="waste" stroke="#16a34a" fillOpacity={1} fill="url(#colorWaste)" />
          <Area type="monotone" dataKey="recycled" stroke="#14b8a6" fillOpacity={1} fill="url(#colorRecycled)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WasteCollectionChart;