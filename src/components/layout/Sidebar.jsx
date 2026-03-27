<<<<<<< HEAD
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Trash2,
  Truck,
  Recycle,
  FileText,
  Settings,
  Leaf,
} from "lucide-react";

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Waste Analytics", url: "/waste-analytics", icon: Trash2 },
  { title: "Fleet Monitoring", url: "/fleet-monitoring", icon: Truck },
  { title: "Recycling Metrics", url: "/recycling-metrics", icon: Recycle },
];

const secondaryNavItems = [
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

const Sidebar = ({ isOpen, isMobileOpen, closeMobile }) => {
  const { pathname } = useLocation();

  const renderNavItems = (items) =>
    items.map(({ title, url, icon: Icon }) => {
      return (
        <NavLink
          key={title}
          to={url}
          onClick={closeMobile}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`
          }
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          {isOpen && <span className="text-sm font-medium">{title}</span>}
        </NavLink>
      );
    });

  return (
    <aside
      className={`
        fixed md:static top-0 left-0 z-50 h-screen md:h-full
        ${isOpen ? "w-64" : "w-20"}
        bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out flex flex-col
        
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:relative
        shadow-lg md:shadow-none
      `}
    >
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600">
            <Leaf className="h-5 w-5 text-white" />
          </div>

          {isOpen && (
            <div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                GreenTrack
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Analytics Dashboard
              </p>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-3 mb-4">
          {isOpen && (
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2">
              Main Menu
            </h3>
          )}
          <nav className="space-y-1">{renderNavItems(mainNavItems)}</nav>
        </div>

        <div className="px-3">
          {isOpen && (
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2">
              System
            </h3>
          )}
          <nav className="space-y-1">{renderNavItems(secondaryNavItems)}</nav>
        </div>
      </div>

      {/* Footer */}
      {isOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="rounded-lg bg-green-50 dark:bg-green-900/10 p-3">
            <p className="text-xs font-medium text-gray-900 dark:text-white">
              Shree Pankaj Green Innovation
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              Waste Management Services
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
=======
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
>>>>>>> adminPanel1/main
