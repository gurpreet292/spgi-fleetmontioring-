import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FilterProvider } from './context/FilterContext';
import AppRouter from './routes/AppRouter';
import ErrorBoundaryFallback from './components/common/ErrorBoundaryFallback';
import { ThemeProvider } from "./context/ThemeContext";
import './index.css';
import './App.css';

const App = () => {
  return (
  <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
  <ThemeProvider>
    <FilterProvider>
      <AppRouter />
    </FilterProvider>
  </ThemeProvider>
</ErrorBoundary>
  );
};

export default App;
