import React from 'react';
import { FileQuestion } from 'lucide-react';

const EmptyState = ({ message = "No data found." }) => (
  <div className="flex flex-col items-center justify-center h-full w-full text-gray-400 py-12">
    <FileQuestion size={48} className="mb-3 opacity-50" />
    <p className="text-sm font-medium">{message}</p>
  </div>
);

export default EmptyState;