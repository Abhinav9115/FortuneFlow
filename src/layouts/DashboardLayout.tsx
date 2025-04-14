import { ReactNode, useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-neutral text-neutral dark:text-white transition-colors duration-200">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="w-16 h-16 rounded-full border-4 border-electric-blue/20 border-t-electric-blue animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-electric-blue to-cyber-teal rounded-full opacity-80"></div>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium animate-pulse">Loading Dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen text-neutral dark:text-white transition-colors duration-200 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 animate-fadeIn">
          {children}
        </main>
        <footer className="py-3 px-6 border-t border-gray-200 dark:border-neutral text-center text-xs text-gray-500 dark:text-gray-400">
          <p>© 2024 FortuneFlow. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}; 