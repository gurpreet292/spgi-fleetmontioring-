import React from 'react';
import { AlertCircle, RefreshCw, BarChart2 } from 'lucide-react';

// Wrapper component to handle loading, error, and empty states gracefully
export const ChartContainer = ({ title, isLoading, error, isEmpty, onRetry, children }) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-green-100 dark:border-gray-700 flex flex-col h-96 hover:shadow-xl transition-all duration-300">
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
       {title}
      </h3>
    <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] relative flex items-center justify-center">
      
        {isLoading && (
          <div className="text-green-600 dark:text-green-400 animate-pulse text-center">
            <BarChart2 size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium">Loading chart...</p>
          </div>
        )}
        
        {error && !isLoading && (
          <div className="text-center text-red-500 dark:text-red-400 px-4">
            <AlertCircle className="mx-auto mb-2" size={32} />
            <p className="text-sm mb-4 font-medium">{error}</p>
            <button onClick={onRetry} className="flex items-center gap-2 mx-auto bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
              <RefreshCw size={16} /> Retry
            </button>
          </div>
        )}
        
        {isEmpty && !isLoading && !error && (
          <div className="text-gray-400 dark:text-gray-500 text-sm">No data available for these filters.</div>
        )}
        
        {!isLoading && !error && !isEmpty && (
          <div className="absolute inset-0 w-full h-full p-2">{children}</div>
        )}
      </div>
    </div>
  );
};