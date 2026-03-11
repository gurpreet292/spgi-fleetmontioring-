import React from 'react';
import { LayoutDashboard, Settings, Users, BarChart2 } from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`bg-green-900 dark:bg-gray-800 text-white transition-all duration-300 ease-in-out flex flex-col ${isOpen ? 'w-64' : 'w-20'} shrink-0 z-20`}>
      <div className="h-16 flex items-center justify-center border-b border-green-800 dark:border-gray-700 shrink-0">
        <h2 className={`font-bold text-xl whitespace-nowrap overflow-hidden transition-all ${isOpen ? 'opacity-100' : 'opacity-0 w-0 hidden'}`}>
          Analytics App
        </h2>
        {!isOpen && <BarChart2 className="text-green-400" size={28} />}
      </div>
      
      <nav className="flex-1 py-4 flex flex-col gap-2 px-3 overflow-y-auto overflow-x-hidden">
        <div className="flex items-center gap-4 px-3 py-3 bg-green-600 dark:bg-gray-700 rounded-lg cursor-pointer text-white">
          <LayoutDashboard size={20} className="min-w-[20px]" />
          <span className={`whitespace-nowrap transition-all ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>Overview</span>
        </div>
        
        <div className="flex items-center gap-4 px-3 py-3 text-green-300 dark:text-gray-400 hover:bg-green-800 dark:hover:bg-gray-700 hover:text-white rounded-lg cursor-pointer transition-colors">
          <Users size={20} className="min-w-[20px]" />
          <span className={`whitespace-nowrap transition-all ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>Audience</span>
        </div>
        
        <div className="flex items-center gap-4 px-3 py-3 text-green-300 dark:text-gray-400 hover:bg-green-800 dark:hover:bg-gray-700 hover:text-white rounded-lg cursor-pointer transition-colors">
          <Settings size={20} className="min-w-[20px]" />
          <span className={`whitespace-nowrap transition-all ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>Settings</span>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;