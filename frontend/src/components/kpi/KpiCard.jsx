import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const colorVariants = {
  emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-200',
  green: 'from-green-500 to-green-600 shadow-green-200',
  teal: 'from-teal-500 to-teal-600 shadow-teal-200',
  cyan: 'from-cyan-500 to-cyan-600 shadow-cyan-200',
  lime: 'from-lime-500 to-lime-600 shadow-lime-200',
};

// React.memo ensures this card only re-renders if its specific value changes
const KpiCard = React.memo(({ title, value, suffix = "", prefix = "", trend, color = "emerald" }) => {
  const isPositive = trend && trend.startsWith('+');
  const gradientClass = colorVariants[color] || colorVariants.emerald;
  
  return (
    <div className={`bg-gradient-to-br ${gradientClass} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white`}>
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-sm font-medium text-white/90">{title}</h4>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-white/20' : 'bg-white/20'}`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend}
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-white">{prefix}{value}{suffix}</p>
    </div>
  );
});

KpiCard.displayName = 'KpiCard';
export default KpiCard;