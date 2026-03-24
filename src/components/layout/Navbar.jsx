import { Menu, LogOut, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/images/logo.webp";

export default function Navbar({ onSidebarToggle, sidebarOpen }) {
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [profileOpen]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-4 md:px-6 py-4 bg-white shadow sticky top-0 z-40">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          onClick={onSidebarToggle}
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          {/* Logo Container */}
          <div className="flex items-center justify-center flex-shrink-0">
            <div className="relative w-12 h-12 bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10 bg-white"></div>
              {/* Logo */}
              <img src={logo} alt="logo" className="w-7 h-7 object-contain relative z-10 drop-shadow-md" />
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
            </div>
          </div>
          
          {/* Brand Text */}
          <div className="min-w-0 flex flex-col">
            <h1 className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700 md:text-base leading-tight">
              {role ? role : "Admin"}
            </h1>
            <p className="text-xs text-gray-500 font-medium">Panel</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold hover:bg-green-700 transition"
            aria-label="Profile menu"
            aria-expanded={profileOpen}
          >
            {name ? name.charAt(0).toUpperCase() : "U"}
          </button>

          {/* Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-900">{name || "User"}</p>
                <p className="text-xs text-gray-500">{role || "Guest"}</p>
              </div>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700 transition"
                onClick={() => {
                  setProfileOpen(false);
                  // Add profile page navigation when available
                }}
              >
                <User size={16} />
                <span className="text-sm">Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 transition border-t border-gray-200 mt-2 pt-2"
              >
                <LogOut size={16} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}