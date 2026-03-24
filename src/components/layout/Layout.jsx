import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 md:hidden">
        {sidebarOpen && <Sidebar onClose={() => setSidebarOpen(false)} />}
      </div>

      <div className="flex-1">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main
          key={location.pathname}
          className="p-4 md:p-6 min-h-screen page-open-animate eco-animate-bg"
          style={{
            background: "linear-gradient(160deg, #f0fdf4 0%, #dcfce7 42%, #d1fae5 100%)",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}