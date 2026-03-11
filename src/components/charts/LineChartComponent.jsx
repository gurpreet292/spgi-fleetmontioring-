import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip,Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const LineChartComponent = React.memo(({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
      <XAxis dataKey="name" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
      <YAxis tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
      <Tooltip contentStyle={{borderRadius: '8px', border: 'none'}} />
      <Legend
  iconType="circle"
  wrapperStyle={{
    fontSize: '14px',
    paddingTop: '10px'
  }}
/>
      {/* Changed to Forest Green */}
      <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={3} dot={{r: 4, fill: '#059669', strokeWidth: 0}} />
    </LineChart>
  </ResponsiveContainer>
));

LineChartComponent.displayName = 'LineChartComponent';
export default LineChartComponent;