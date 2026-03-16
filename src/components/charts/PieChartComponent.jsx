import {
PieChart,
Pie,
Cell,
Legend,
Tooltip,
ResponsiveContainer
} from "recharts";

const data = [
 { name: "Plastic", value: 25 },
 { name: "Organic", value: 35 },
 { name: "Metal", value: 15 },
 { name: "Paper", value: 25 }
];

const COLORS = ["#4F6DB8", "#16A34A", "#C89B2E", "#E4572E"];

export default function PieChartComponent({ data: chartData = data }) {
 return (
  <ResponsiveContainer width="100%" height={300}>
   <PieChart>
    <Pie
    data={chartData}
     dataKey="value"
     cx="50%"
     cy="50%"
     innerRadius={60}
     outerRadius={90}
     paddingAngle={3}
    >
    {chartData.map((entry, index) => (
      <Cell key={index} fill={COLORS[index]} />
     ))}
    </Pie>

        <Tooltip />
        <Legend
            verticalAlign="bottom"
            formatter={(value) => <span style={{ color: "#94a3b8" }}>{value}</span>}
        />
   </PieChart>
  </ResponsiveContainer>
 );
}