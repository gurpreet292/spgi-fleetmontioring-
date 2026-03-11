import React from "react";
import { Menu, Bell, User, Moon, Sun } from "lucide-react";
import { useTheme } from "../../components/context/ThemeContext";

const Header = ({ toggleSidebar }) => {

  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-green-200 dark:border-gray-700 px-4 flex items-center justify-between shadow-sm shrink-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="p-2 hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-green-700 dark:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-green-800 dark:text-green-400 hidden sm:block">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4 text-green-600 dark:text-green-400">
        <button
         onClick={toggleTheme}
         className="p-2 hover:bg-green-50 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
         {theme === "dark" ? <Sun size={20}/> : <Moon size={20}/>}
        </button>

        <button className="p-2 hover:bg-green-50 dark:hover:bg-gray-700 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
        </button>
        <div className="h-9 w-9 bg-green-50 dark:bg-gray-700 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center border border-green-200 dark:border-gray-600 cursor-pointer hover:bg-green-100 dark:hover:bg-gray-600 transition-colors">
          <User size={18} />
        </div>
      </div>
    </header>
  );
};

export default Header;