import React, { useContext } from 'react';
import { Tag } from 'lucide-react';
import { FilterContext } from '../../context/FilterContext';

const GlobalFilters = () => {
  const { filters, setFilters } = useContext(FilterContext);
  
  return (
    <div className="relative w-full sm:w-auto min-w-[180px] z-30">

      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none" size={18} />

      <select
        value={filters.category}
        onChange={(e) =>
          setFilters(prev => ({
            ...prev,
            category: e.target.value
          }))
        }
        className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-green-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:border-green-300 dark:hover:border-green-500 transition-colors min-h-[44px] appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23059669' d='M1 4l5 4 5-4'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 8px center',
          paddingRight: '28px',
          maxHeight: '200px',
          overflow: 'auto'
        }}
      >
        <option value="All">All Categories</option>
        <option value="CO2 Saved by Reason">CO2 Saved by Reason</option>
        <option value="Trees Planted Daily">Trees Planted Daily</option>
        <option value="Recyclable Materials">Recyclable Materials</option>
      </select>

    </div>
  );
};

export default GlobalFilters;