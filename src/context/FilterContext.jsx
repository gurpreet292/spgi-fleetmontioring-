import React, { createContext, useState } from 'react';
import { subDays } from 'date-fns';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    dateRange: {
      startDate: subDays(new Date(), 6),
      endDate: new Date(),
    },
    timeGranularity: 'Daily',
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};