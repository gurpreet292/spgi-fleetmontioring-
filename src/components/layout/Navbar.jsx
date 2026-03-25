import { Menu, Search, Bell, X, LogOut, User as UserIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/spgi-logo.png";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

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
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-emerald-100 bg-white/90 px-4 py-4 shadow backdrop-blur-md md:px-6">
      <div className="flex items-center gap-3">
        <button
          className="rounded-lg p-2 text-emerald-800 transition-colors hover:bg-emerald-50 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="flex items-center gap-2 md:gap-3">
          <img src={logo} alt="logo" className="h-7 w-7 object-contain md:h-8 md:w-8" />
          <h1 className="truncate text-sm font-semibold text-emerald-800 md:text-lg">
            {user?.role || "Admin"} Panel
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="hidden rounded-lg p-2 text-emerald-700 transition-colors hover:bg-emerald-50 sm:block">
          <Search size={20} />
        </button>
        <button className="rounded-lg p-2 text-emerald-700 transition-colors hover:bg-emerald-50">
          <Bell size={20} />
        </button>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white shadow-md shadow-emerald-200 md:h-10 md:w-10 md:text-base"
            aria-label="Profile menu"
            aria-expanded={profileOpen}
          >
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </button>

          {profileOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
              <div className="border-b border-gray-200 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500">{user?.role || "Guest"}</p>
              </div>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 transition hover:bg-gray-100"
                onClick={() => setProfileOpen(false)}
              >
                <UserIcon size={16} />
                <span className="text-sm">Profile</span>
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 flex w-full items-center gap-2 border-t border-gray-200 px-4 py-2 pt-2 text-left text-red-600 transition hover:bg-red-50"
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
