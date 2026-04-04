import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { ToastProvider } from './contexts/ToastContext';

const AppShell = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="content-area">
        <Header onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

const App = () => (
  <ToastProvider>
    <AppShell />
  </ToastProvider>
);

export default App;
