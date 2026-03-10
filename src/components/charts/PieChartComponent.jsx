import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// A palette of earthy greens
const COLORS =['#10b981', '#047857', '#34d399', '#065f46'];

const PieChartComponent = React.memo(({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
      </Pie>
      <Tooltip contentStyle={{borderRadius: '8px', border: 'none'}} />
      <Legend verticalAlign="bottom" height={36} iconType="circle" />
    </PieChart>
  </ResponsiveContainer>
));

PieChartComponent.displayName = 'PieChartComponent';
export default PieChartComponent;