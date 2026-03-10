import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import OverviewPage from './pages/OverviewPage';
import './index.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <FilterProvider>
        <OverviewPage/>
      </FilterProvider>
    </BrowserRouter>
  );
}

export default App;
