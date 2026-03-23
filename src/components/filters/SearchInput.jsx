import React, { useState, useEffect, useContext } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { FilterContext } from '../../context/FilterContext';

const SearchInput = () => {
  const { filters, setFilters } = useContext(FilterContext);
  const [localSearch, setLocalSearch] = useState(filters.search);
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
  setFilters(prev => ({
    ...prev,
    search: debouncedSearch
  }));
}, [debouncedSearch]);

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" size={18} />
      <input
        type="text"
        placeholder="Search categories..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-green-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-300 dark:hover:border-green-500 transition-colors"
      />
    </div>
  );
};

export default SearchInput;
