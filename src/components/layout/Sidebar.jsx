import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { usePermissions } from "../../hooks/usePermissions";

export default function Sidebar() {

  const { user } = useAuth();

  const items = usePermissions(user?.role);

  return (
    <aside className="w-64 bg-green-800 text-white h-screen">

      <nav className="p-4 flex flex-col gap-2">

        {items.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive ? "bg-green-600" : "hover:bg-green-700"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}