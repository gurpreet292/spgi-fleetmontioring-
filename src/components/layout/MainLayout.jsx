import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-green-50 dark:bg-gray-900 overflow-hidden font-sans">
      
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen}
        isMobileOpen={isMobileOpen}
        closeMobile={() => setIsMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Header */}
        <Header 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setIsMobileOpen(true)}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 md:p-6 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;