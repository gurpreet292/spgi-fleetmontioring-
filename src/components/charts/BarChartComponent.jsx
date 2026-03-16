import {
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer
} from "recharts";

const data = [
 { name: "North America", value: 14000 },
 { name: "Europe", value: 7000 },
 { name: "Asia", value: 3000 }
];

export default function BarChartComponent({ data: chartData = data }) {
 return (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4}/>
        <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }}/>
        <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }}/>
    <Tooltip/>
    <Bar dataKey="value" fill="#16a34a" radius={[6,6,0,0]}/>
   </BarChart>
  </ResponsiveContainer>
 );
}