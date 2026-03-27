import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/spgi-logo.png";

const Header = ({ toggleSidebar, toggleMobileSidebar }) => {
  const [showProfile, setShowProfile] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const roleName = user?.role || localStorage.getItem("role") || "Guest";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-green-200 dark:border-gray-700 px-4 flex items-center justify-between shadow-sm shrink-0 z-10">
      
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        
        {/* Mobile Button */}
        <button
          onClick={toggleMobileSidebar}
          className="p-2 md:hidden hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-green-700 dark:text-green-400"
        >
          <Menu size={24} />
        </button>

        {/* Desktop Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 hidden md:block hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-green-700 dark:text-green-400"
        >
          <Menu size={24} />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <img src={logo} alt="SPGI" className="h-8 w-8 object-contain" />
          <div>
            <p className="text-sm font-semibold text-green-800 dark:text-green-400">
              Shree Pankaj Green Innovation
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-300 capitalize">{roleName} Panel</p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4 text-green-600 dark:text-green-400">
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-green-50 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notification */}
        <button
          onClick={() => setShowProfile(false)}
          className="p-2 hover:bg-green-50 dark:hover:bg-gray-700 rounded relative"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div ref={profileMenuRef} className="relative">
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 cursor-pointer rounded-full border border-emerald-100 bg-white px-3 py-1 shadow-sm transition hover:border-emerald-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <img src={logo} alt="profile" className="w-8 h-8 rounded-full object-contain bg-white" />

            <div className="text-left hidden md:block">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500 capitalize">{roleName}</p>
            </div>

            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${showProfile ? "rotate-180" : "rotate-0"}`}
            />
          </div>

          {showProfile && (
            <div className="absolute right-0 top-12 z-40 w-72 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl shadow-emerald-100/60 dark:border-gray-700 dark:bg-gray-800 dark:shadow-black/30">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-white">
                <p className="text-sm font-semibold">{user?.name || "User"}</p>
                <p className="text-xs capitalize text-emerald-50">{roleName}</p>
              </div>

              <div className="p-2">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-red-600 transition hover:bg-red-50 dark:hover:bg-gray-700"
              >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;