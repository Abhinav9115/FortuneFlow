import { useState } from 'react';
import { ChevronDownIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

interface AnalyticsItem {
  name: string;
  value: number;
}

interface AnalyticsCardProps {
  title: string;
  items: AnalyticsItem[];
  total?: string;
  timeRange?: string;
  onTimeRangeChange?: (range: string) => void;
}

export const AnalyticsCard = ({ 
  title, 
  items,
  total,
  timeRange = 'Last Month',
  onTimeRangeChange
}: AnalyticsCardProps) => {
  const [isTimeRangeOpen, setIsTimeRangeOpen] = useState(false);
  const timeRanges = ['Last Month', 'Last Week', 'Last Year', 'All Time'];
  
  // Sort items by value in descending order
  const sortedItems = [...items].sort((a, b) => b.value - a.value);
  
  // Find maximum value for scaling
  const maxValue = Math.max(...items.map(item => item.value));
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button 
              className="flex items-center space-x-1 text-sm text-neutral-400 px-2 py-1 rounded hover:bg-neutral-700"
              onClick={() => setIsTimeRangeOpen(!isTimeRangeOpen)}
            >
              <span>{timeRange}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>
            
            {isTimeRangeOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg py-1 z-10">
                {timeRanges.map(range => (
                  <button
                    key={range}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      range === timeRange ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-700'
                    }`}
                    onClick={() => {
                      onTimeRangeChange?.(range);
                      setIsTimeRangeOpen(false);
                    }}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button className="text-neutral-400 hover:text-white p-1">
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {sortedItems.map((item, index) => {
          // Scale progress based on maximum value
          const progress = (item.value / maxValue) * 100;
          
          // Alternate colors based on index
          const barColors = ['#e45f2b', '#f6c445', '#a0e548', '#72fa93', '#9ac1f0'];
          const colorIndex = index % barColors.length;
          
          return (
            <div key={item.name} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span>{item.name}</span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${progress}%`, 
                    backgroundColor: barColors[colorIndex]
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {total && (
        <div className="mt-6 pt-4 border-t border-neutral-700 flex justify-between items-center">
          <span className="text-lg font-medium">Total</span>
          <span className="text-lg font-bold">{total}</span>
        </div>
      )}
    </div>
  );
}; 