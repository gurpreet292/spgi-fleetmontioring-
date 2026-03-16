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
import { wasteCollection } from "../../services/mockData";

const WasteCollectionChart = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={wasteCollection} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="waste" stroke="#16a34a" fillOpacity={1} fill="url(#colorWaste)" />
          <Area type="monotone" dataKey="recycled" stroke="#14b8a6" fillOpacity={1} fill="url(#colorRecycled)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WasteCollectionChart;