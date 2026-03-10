import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorBoundaryFallback = ({ error, resetErrorBoundary }) => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-red-50 p-6">
    <AlertTriangle size={64} className="text-red-500 mb-4" />
    <h2 className="text-2xl font-bold text-red-900 mb-2">System Error</h2>
    <p className="text-red-700 mb-6 text-center">An unexpected error crashed the UI.</p>
    <pre className="bg-white p-4 rounded-lg shadow-sm border border-red-100 text-sm text-red-600 max-w-2xl overflow-auto mb-6">
      {error.message}
    </pre>
    <button 
      onClick={resetErrorBoundary} 
      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition shadow"
    >
      Reload Application
    </button>
  </div>
);

export default ErrorBoundaryFallback;