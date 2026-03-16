import {
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer
} from "recharts";

const data = [
 { name: "12 Feb", value: 4000 },
 { name: "13 Feb", value: 3500 },
 { name: "14 Feb", value: 5000 },
 { name: "15 Feb", value: 4200 },
 { name: "16 Feb", value: 4800 }
];

export default function LineChartComponent({ data: chartData = data }) {
 return (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
        <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
        <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={3}/>
   </LineChart>
  </ResponsiveContainer>
 );
}