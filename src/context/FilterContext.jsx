import React, { createContext, useState } from 'react';

// Temporary context so you can test your code without Teammate A's files
export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  // Default values to test filtering
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    dateRange: 'All Time',
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};