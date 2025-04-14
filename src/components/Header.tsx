import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  BellIcon,
  UserCircleIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState(1);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <header className="bg-white dark:bg-neutral py-4 px-6 border-b border-gray-200 dark:border-neutral-focus shadow-sm transition-colors duration-200 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-lg font-medium tracking-wide">Hello, <span className="font-bold text-electric-blue dark:text-electric-blue">Magz</span></h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{formattedDate} | {formattedTime}</p>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 dark:bg-neutral-focus rounded-lg py-1 px-2">
            <div className="px-3 py-1 rounded-md bg-white dark:bg-neutral shadow-sm flex items-center space-x-1">
              <ArrowTrendingUpIcon className="w-4 h-4 text-success" />
              <span className="text-xs font-medium">Day</span>
            </div>
            <div className="px-3 py-1 rounded-md hover:bg-white/50 dark:hover:bg-neutral/50 flex items-center space-x-1 cursor-pointer transition-colors">
              <span className="text-xs font-medium">Week</span>
            </div>
            <div className="px-3 py-1 rounded-md hover:bg-white/50 dark:hover:bg-neutral/50 flex items-center space-x-1 cursor-pointer transition-colors">
              <span className="text-xs font-medium">Month</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input 
              className="py-2 pl-10 pr-4 w-64 bg-gray-100 dark:bg-neutral-focus border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electric-blue/30" 
              placeholder="Search dashboard..." 
            />
          </div>
          
          <div className="md:hidden relative">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-focus transition-colors">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-focus relative transition-colors">
              <BellIcon className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 w-5 h-5 flex items-center justify-center bg-danger text-white rounded-full text-xs animate-pulse">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          <ThemeToggle />

          <div className="relative hidden md:block">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 pl-3 pr-4 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-focus transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-electric-blue to-cyber-teal flex items-center justify-center text-white text-sm font-bold">
                RA
              </div>
              <span className="font-medium group-hover:text-electric-blue transition-colors">Ruman A.</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-focus rounded-xl shadow-neon py-3 z-50 border border-gray-200 dark:border-neutral animate-fadeIn">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-neutral mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-electric-blue to-cyber-teal flex items-center justify-center text-white font-bold">
                      RA
                    </div>
                    <div>
                      <h4 className="font-medium">Ruman Ahmed</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">ruman@example.com</p>
                    </div>
                  </div>
                </div>
                <a href="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral space-x-3 transition-colors">
                  <UserCircleIcon className="w-5 h-5 text-gray-500" />
                  <span>Profile</span>
                </a>
                <a href="/settings" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral space-x-3 transition-colors">
                  <ChartBarIcon className="w-5 h-5 text-gray-500" />
                  <span>My Dashboard</span>
                </a>
                <hr className="my-2 border-gray-200 dark:border-neutral" />
                <a href="/logout" className="flex items-center px-4 py-2 text-danger hover:bg-gray-100 dark:hover:bg-neutral space-x-3 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </a>
              </div>
            )}
          </div>
          
          <div className="md:hidden relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-focus"
            >
              <UserCircleIcon className="w-6 h-6 text-primary" />
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-focus rounded-lg shadow-neon py-1 z-50 border border-gray-200 dark:border-neutral">
                <a href="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral">Profile</a>
                <a href="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral">Settings</a>
                <hr className="my-1 border-gray-200 dark:border-neutral" />
                <a href="/logout" className="block px-4 py-2 text-danger hover:bg-gray-100 dark:hover:bg-neutral">Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}; 