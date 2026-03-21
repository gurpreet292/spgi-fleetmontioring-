import { Menu, Search, Bell, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/spgi-logo.png";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { user } = useAuth();

  return (
    <header className="flex justify-between items-center px-4 md:px-6 py-4 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 hover:bg-emerald-50 text-emerald-800 rounded-lg transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="flex items-center gap-2 md:gap-3">
          <img src={logo} alt="logo" className="w-7 h-7 md:w-8 md:h-8 object-contain" />
          <h1 className="text-emerald-800 font-semibold text-sm md:text-lg truncate">
            {user?.role} Panel
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 hover:bg-emerald-50 text-emerald-700 rounded-lg transition-colors hidden sm:block">
          <Search size={20} />
        </button>
        <button className="p-2 hover:bg-emerald-50 text-emerald-700 rounded-lg transition-colors">
          <Bell size={20} />
        </button>

        <div className="w-9 h-9 md:w-10 md:h-10 bg-emerald-700 text-white rounded-full flex items-center justify-center font-semibold text-sm md:text-base shadow-md shadow-emerald-200">
          {user?.name?.charAt(0)}
        </div>
      </div>
    </header>
  );
}