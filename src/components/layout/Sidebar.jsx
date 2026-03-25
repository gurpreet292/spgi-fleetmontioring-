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
    <aside
      className="w-64 text-white h-screen overflow-y-auto border-r border-emerald-700/40"
      style={{ background: "linear-gradient(180deg, #14532d 0%, #166534 55%, #15803d 100%)" }}
    >
      <nav className="p-4 flex flex-col gap-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-900/30"
                    : "text-emerald-50/95 hover:bg-emerald-600/35 hover:text-white"
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
