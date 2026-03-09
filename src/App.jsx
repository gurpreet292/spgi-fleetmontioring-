import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FilterProvider } from './context/FilterContext';
import AppRouter from './routes/AppRouter';
import ErrorBoundaryFallback from './Components/common/ErrorBoundaryFallback';

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={() => window.location.reload()}>
      <FilterProvider>
        <AppRouter />
      </FilterProvider>
    </ErrorBoundary>
  );
};

export default App;