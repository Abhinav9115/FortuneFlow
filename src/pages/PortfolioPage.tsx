import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const assets = [
  { name: 'Stocks', value: 60, color: '#1a365d' },
  { name: 'Bonds', value: 20, color: '#319795' },
  { name: 'Crypto', value: 10, color: '#805ad5' },
  { name: 'Cash', value: 10, color: '#dd6b20' },
];

const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, avgPrice: 145.87, currentPrice: 173.21, value: 8660.50, change: 18.74 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 30, avgPrice: 224.93, currentPrice: 299.16, value: 8974.80, change: 33.00 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 15, avgPrice: 134.23, currentPrice: 169.87, value: 2548.05, change: 26.55 },
  { symbol: 'GOOG', name: 'Alphabet Inc.', shares: 12, avgPrice: 117.29, currentPrice: 139.10, value: 1669.20, change: 18.59 },
  { symbol: 'META', name: 'Meta Platforms Inc.', shares: 25, avgPrice: 187.35, currentPrice: 202.72, value: 5068.00, change: 8.20 },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 18, avgPrice: 216.42, currentPrice: 185.10, value: 3331.80, change: -14.47 },
];

const riskData = [
  { name: 'Low Risk', value: 30, color: '#48bb78' },
  { name: 'Medium Risk', value: 50, color: '#ecc94b' },
  { name: 'High Risk', value: 20, color: '#e53e3e' },
];

export const PortfolioPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="card lg:col-span-3">
        <h2 className="text-2xl font-bold mb-6">My Portfolio</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <th className="text-left py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Symbol</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Name</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Shares</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Avg. Price</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Current Price</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Value</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Change %</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.symbol} className="border-b border-neutral-200 dark:border-neutral-700">
                  <td className="py-3 px-4 font-medium">{stock.symbol}</td>
                  <td className="py-3 px-4">{stock.name}</td>
                  <td className="py-3 px-4 text-right">{stock.shares}</td>
                  <td className="py-3 px-4 text-right">${stock.avgPrice.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">${stock.currentPrice.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">${stock.value.toFixed(2)}</td>
                  <td className={`py-3 px-4 text-right ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-6">Asset Allocation</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={assets}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {assets.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-6">Risk Assessment</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-6">Investment Performance</h2>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Total Value</span>
              <span className="font-bold">$125,750.25</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Initial Investment</span>
              <span className="font-bold">$100,000.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Total Gain/Loss</span>
              <span className="font-bold text-success">+$25,750.25 (25.75%)</span>
            </div>
          </div>
          <hr className="border-neutral-200 dark:border-neutral-700" />
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">YTD Return</span>
              <span className="font-bold text-success">+15.75%</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">1 Year Return</span>
              <span className="font-bold text-success">+22.30%</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">3 Year Return</span>
              <span className="font-bold text-success">+45.65%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 