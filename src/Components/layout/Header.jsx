import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="h-16 bg-white border-b border-green-200 px-4 flex items-center justify-between shadow-sm shrink-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="p-2 hover:bg-green-50 rounded-lg transition-colors text-green-700 focus:outline-none focus:ring-2 focus:ring-green-100"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-green-800 hidden sm:block">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4 text-green-600">
        <button className="p-2 hover:bg-green-50 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-9 w-9 bg-green-50 text-green-600 rounded-full flex items-center justify-center border border-green-200 cursor-pointer hover:bg-green-100 transition-colors">
          <User size={18} />
        </div>
      </div>
    </header>
  );
};

export default Header;