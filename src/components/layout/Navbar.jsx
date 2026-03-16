import { Menu, Search, Bell } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import logo from "../../assets/images/logo.webp";
export default function Navbar() {
    
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <header className="flex justify-between items-center px-6 py-4 bg-white shadow">

      <div className="flex items-center gap-3">

        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <h1 className="text-green-700 font-semibold text-lg">
          {user?.role} Panel
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">

        <Search size={20} />
        <Bell size={20} />

        <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
          {user?.name?.charAt(0)}
        </div>

      </div>

    </header>
  );
}