// src/components/layout/Layout.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children, currentPage, setCurrentPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 h-full overflow-hidden">
        <Sidebar 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isSidebarOpen={isSidebarOpen}
        />
        
        <main 
          className="flex-1 p-4 overflow-y-auto md:p-6"
          onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
        >
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;