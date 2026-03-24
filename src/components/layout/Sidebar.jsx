import { NavLink } from "react-router-dom";
import { usePermissions } from "../../hooks/usePermissions";
import { X } from "lucide-react";

export default function Sidebar({ onClose }) {
  const role = localStorage.getItem("role");
  const items = usePermissions(role) || [];

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      onClose && onClose();
    }
  };

  return (
    <aside className="w-64 bg-green-800 text-white h-screen flex flex-col overflow-y-auto">
      {/* Close button for mobile */}
      <div className="md:hidden flex justify-end p-4 border-b border-green-700">
        <button
          onClick={onClose}
          className="p-1 hover:bg-green-700 rounded-lg transition"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="p-4 flex flex-col gap-2 flex-1">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive ? "bg-green-600 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}