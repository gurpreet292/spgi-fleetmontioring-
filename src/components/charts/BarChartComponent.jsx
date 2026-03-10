import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const BarChartComponent = React.memo(({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
      <XAxis dataKey="name" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
      <YAxis tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
      <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none'}} />
      {/* Changed to Emerald Green */}
      <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} /> 
    </BarChart>
  </ResponsiveContainer>
));

BarChartComponent.displayName = 'BarChartComponent';
export default BarChartComponent;