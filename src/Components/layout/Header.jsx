import React, { useState } from "react";
import { Menu, Bell, User, Moon, Sun, ChevronDown,
  Pencil, Wallet, Crown, Headphones } from "lucide-react";
import { useTheme } from "../../components/context/ThemeContext";

const Header = ({ toggleSidebar }) => {

  const [showNotification, setShowNotification] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

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

        <button
          onClick={() => setShowNotification(!showNotification)}
          className="p-2 hover:bg-green-50 dark:hover:bg-gray-700 rounded relative"
     >
        <Bell size={20} />

      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="relative">

  <div
    onClick={() => setShowProfile(!showProfile)}
    className="flex items-center gap-2 cursor-pointer bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow hover:shadow-md transition"
  >

    {/* Avatar */}
    <img
      src="https://i.pravatar.cc/40"
      alt="profile"
      className="w-8 h-8 rounded-full"
    />

    {/* Name + Email */}
    <div className="text-left hidden md:block">
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
        Navjot Kaur
      </p>
      <p className="text-xs text-gray-500">
        navjot@gmail.com
      </p>
    </div>

    <ChevronDown size={16} />
  </div>

   {showProfile && (
  <div className="absolute right-0 top-12 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2">

    <button className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
      <User size={18} />
      Profile
    </button>

    <button className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
      <Pencil size={18} />
      Edit Profile
    </button>

    <button className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
      <Wallet size={18} />
      Wallet
    </button>

    <button className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
      <Crown size={18} />
      Upgrade Plan
    </button>

    <button className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
      <Headphones size={18} />
      Help Center
    </button>

  </div>
)}
</div> 
</div>
    </header>
  );
};

export default Header;