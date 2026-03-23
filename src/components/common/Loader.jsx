import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center h-full w-full text-green-500 py-12">
    <Loader2 className="animate-spin mb-2" size={32} />
    <p className="text-sm font-medium text-green-600">{message}</p>
  </div>
);

export default Loader;