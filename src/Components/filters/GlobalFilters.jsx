import React, { useContext } from 'react';
import { Tag } from 'lucide-react';
import { FilterContext } from '../../context/FilterContext';

const GlobalFilters = () => {
  const { filters, setFilters } = useContext(FilterContext);
  
  return (
    <div className="relative flex-1">

      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" size={18} />

      <select
        value={filters.category}
        onChange={(e) =>
          setFilters(prev => ({
            ...prev,
            category: e.target.value
          }))
        }
        className="w-full pl-10 pr-4 py-2 border border-green-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:border-green-300 dark:hover:border-green-500 transition-colors"
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
