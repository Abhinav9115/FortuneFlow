import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ChartPieIcon, 
  CurrencyDollarIcon, 
  BellIcon, 
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface NavItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', icon: HomeIcon, path: '/' },
  { name: 'Portfolio', icon: ChartPieIcon, path: '/portfolio' },
  { name: 'Transactions', icon: CurrencyDollarIcon, path: '/transactions' },
  { name: 'Alerts', icon: BellIcon, path: '/alerts' },
  { name: 'Settings', icon: CogIcon, path: '/settings' },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div 
      className={`h-screen bg-white dark:bg-neutral-focus border-r border-gray-200 dark:border-neutral shadow-md transition-all duration-300 z-10 ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-neutral">
        {!isCollapsed && (
          <h1 className="text-2xl font-bold bg-gradient-to-r from-electric-blue to-cyber-teal bg-clip-text text-transparent">Pulse Co.</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-electric-blue/30"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-6 h-6 text-electric-blue" />
          ) : (
            <ChevronLeftIcon className="w-6 h-6 text-electric-blue" />
          )}
        </button>
      </div>

      <nav className="p-4">
        <div className={`mb-6 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 px-3 mb-2">Main Menu</p>
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '');
            return (
              <li key={item.name} className="hover-lift">
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-electric-blue/10 text-electric-blue shadow-neon font-semibold'
                      : 'text-neutral-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral hover:text-neutral-800 dark:hover:text-white'
                  }`}
                >
                  <item.icon className={`w-6 h-6 ${isActive ? 'text-electric-blue' : ''}`} />
                  {!isCollapsed && (
                    <span className={`ml-3 transition-all duration-200 ${isActive ? 'transform translate-x-1' : ''}`}>{item.name}</span>
                  )}
                  {isActive && !isCollapsed && (
                    <div className="ml-auto w-1.5 h-8 bg-electric-blue rounded-full"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        
        <div className={`mt-8 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <div className="px-3 py-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <h3 className="font-medium text-sm mb-1 text-electric-blue">Pro Dashboard</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Upgrade to access premium features and analytics</p>
            <button className="text-xs py-1.5 px-3 bg-electric-blue text-white rounded-lg w-full hover:bg-electric-blue/90 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}; 