import { ReactNode } from 'react';
import { PerformanceChart } from './PerformanceChart';
import { ChevronUpIcon, ChevronDownIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  color: string;
  chart?: any[];
  icon?: ReactNode;
}

export const StatsCard = ({ title, value, change, color, chart, icon }: StatsCardProps) => {
  const isPositive = change >= 0;
  
  // Create simple chart data if provided
  const chartData = chart || Array.from({ length: 20 }, (_, i) => ({
    date: i.toString(),
    value: Math.random() * 100 + 50
  }));

  return (
    <div className="stats-card group">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <h3 className="text-sm font-medium text-neutral-400">{title}</h3>
        </div>
        <button className="text-neutral-400 hover:text-white p-1">
          <EllipsisHorizontalIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="stats-value">{value}</div>
      
      <div className={`stats-change ${isPositive ? 'stats-change-positive' : 'stats-change-negative'}`}>
        {isPositive ? (
          <ChevronUpIcon className="w-4 h-4 mr-1" />
        ) : (
          <ChevronDownIcon className="w-4 h-4 mr-1" />
        )}
        <span>{Math.abs(change).toFixed(2)}%</span>
      </div>

      <div className="stats-chart h-20 mt-2">
        <PerformanceChart 
          data={chartData} 
          timeRange="1M" 
          simpleChart 
          type="area"
          colors={{ primary: color }}
        />
      </div>
    </div>
  );
}; 