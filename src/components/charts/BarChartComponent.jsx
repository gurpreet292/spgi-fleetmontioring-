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

export default function BarChartComponent() {
 return (
  <ResponsiveContainer width="100%" height={300}>
   <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3"/>
    <XAxis dataKey="name"/>
    <YAxis/>
    <Tooltip/>
    <Bar dataKey="value" fill="#16a34a" radius={[6,6,0,0]}/>
   </BarChart>
  </ResponsiveContainer>
 );
}