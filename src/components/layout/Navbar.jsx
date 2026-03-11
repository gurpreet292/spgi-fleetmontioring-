import { Menu, Search, Bell } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

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

        <h1 className="text-green-700 font-semibold">
          SPGI Admin Panel
        </h1>

      </div>

      <div className="flex items-center gap-4">

        <Search size={20} />
        <Bell size={20} />

        <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">

          {user?.username?.charAt(0)}

        </div>

      </div>

    </header>
  );
}