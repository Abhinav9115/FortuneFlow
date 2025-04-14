import { useState, useMemo } from 'react';
import { PerformanceChart } from '../components/PerformanceChart';

// Mock data for the dashboard
const portfolioData = {
  totalValue: 125750.25,
  dailyChange: 1250.75,
  dailyChangePercentage: 1.25,
  ytdReturn: 15.75,
  allocation: {
    stocks: 60,
    bonds: 20,
    crypto: 10,
    cash: 10,
  },
};

// Generate mock chart data
const generateChartData = (timeRange: string) => {
  const now = new Date();
  const data = [];
  let points = 0;
  let baseValue = 100000;

  switch (timeRange) {
    case '1D':
      points = 24;
      for (let i = 0; i < points; i++) {
        const date = new Date(now);
        date.setHours(date.getHours() - (points - i));
        data.push({
          date: date.toLocaleString(),
          value: baseValue + Math.random() * 10000,
        });
      }
      break;
    case '1W':
      points = 7;
      for (let i = 0; i < points; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - (points - i));
        data.push({
          date: date.toLocaleDateString(),
          value: baseValue + Math.random() * 15000,
        });
      }
      break;
    case '1M':
      points = 30;
      for (let i = 0; i < points; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - (points - i));
        data.push({
          date: date.toLocaleDateString(),
          value: baseValue + Math.random() * 25000,
        });
      }
      break;
    default:
      points = 30;
      for (let i = 0; i < points; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - (points - i));
        data.push({
          date: date.toLocaleDateString(),
          value: baseValue + Math.random() * 25000,
        });
      }
  }

  return data;
};

export const DashboardPage = () => {
  const [timeRange, setTimeRange] = useState('1M');
  const chartData = useMemo(() => generateChartData(timeRange), [timeRange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Portfolio Summary Card */}
      <div className="card lg:col-span-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Portfolio Summary
          </h2>
          <div className="flex space-x-2">
            {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-primary text-white'
                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Value</p>
            <p className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Daily Change</p>
            <p className={`text-2xl font-bold ${portfolioData.dailyChange >= 0 ? 'text-success' : 'text-danger'}`}>
              ${Math.abs(portfolioData.dailyChange).toLocaleString()}
              <span className="text-base ml-1">
                ({portfolioData.dailyChangePercentage}%)
              </span>
            </p>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">YTD Return</p>
            <p className={`text-2xl font-bold ${portfolioData.ytdReturn >= 0 ? 'text-success' : 'text-danger'}`}>
              {portfolioData.ytdReturn}%
            </p>
          </div>
        </div>

        <div className="h-64">
          <PerformanceChart data={chartData} timeRange={timeRange} />
        </div>
      </div>

      {/* Asset Allocation Card */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Asset Allocation</h2>
        <div className="space-y-4">
          {Object.entries(portfolioData.allocation).map(([asset, percentage]) => (
            <div key={asset} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="capitalize">{asset}</span>
                <span>{percentage}%</span>
              </div>
              <div className="h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities Card */}
      <div className="card lg:col-span-3">
        <h2 className="text-xl font-bold mb-6">Recent Activities</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <th className="text-left py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Asset</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <td className="py-3 px-4 text-sm">Apr 12, 2024</td>
                <td className="py-3 px-4 text-sm">Buy</td>
                <td className="py-3 px-4 text-sm">AAPL</td>
                <td className="py-3 px-4 text-sm text-right">$2,350.00</td>
                <td className="py-3 px-4 text-sm"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
              </tr>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <td className="py-3 px-4 text-sm">Apr 10, 2024</td>
                <td className="py-3 px-4 text-sm">Sell</td>
                <td className="py-3 px-4 text-sm">TSLA</td>
                <td className="py-3 px-4 text-sm text-right">$1,050.00</td>
                <td className="py-3 px-4 text-sm"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
              </tr>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <td className="py-3 px-4 text-sm">Apr 8, 2024</td>
                <td className="py-3 px-4 text-sm">Deposit</td>
                <td className="py-3 px-4 text-sm">Cash</td>
                <td className="py-3 px-4 text-sm text-right">$5,000.00</td>
                <td className="py-3 px-4 text-sm"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}; 