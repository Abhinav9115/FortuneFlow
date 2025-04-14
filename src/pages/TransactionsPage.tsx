import { useState } from 'react';
import { ArrowUpTrayIcon, ArrowDownTrayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// Mock transaction data
const transactions = [
  { id: 1, date: '2023-04-12T14:32:00', type: 'buy', asset: 'AAPL', quantity: 10, price: 235, total: 2350, status: 'completed' },
  { id: 2, date: '2023-04-10T09:15:00', type: 'sell', asset: 'TSLA', quantity: 5, price: 210, total: 1050, status: 'completed' },
  { id: 3, date: '2023-04-08T11:45:00', type: 'deposit', asset: 'USD', quantity: 5000, price: 1, total: 5000, status: 'completed' },
  { id: 4, date: '2023-04-05T13:20:00', type: 'buy', asset: 'MSFT', quantity: 8, price: 297.50, total: 2380, status: 'completed' },
  { id: 5, date: '2023-04-01T10:05:00', type: 'buy', asset: 'AMZN', quantity: 6, price: 164.23, total: 985.38, status: 'completed' },
  { id: 6, date: '2023-03-28T15:40:00', type: 'withdrawal', asset: 'USD', quantity: 1000, price: 1, total: 1000, status: 'completed' },
  { id: 7, date: '2023-03-25T14:10:00', type: 'sell', asset: 'NVDA', quantity: 12, price: 89.75, total: 1077, status: 'completed' },
  { id: 8, date: '2023-03-20T09:30:00', type: 'buy', asset: 'GOOG', quantity: 5, price: 123.45, total: 617.25, status: 'completed' },
  { id: 9, date: '2023-03-15T11:20:00', type: 'deposit', asset: 'USD', quantity: 2500, price: 1, total: 2500, status: 'completed' },
  { id: 10, date: '2023-03-10T16:15:00', type: 'buy', asset: 'META', quantity: 15, price: 183.25, total: 2748.75, status: 'completed' },
];

// Filter options
const filterOptions = {
  types: ['All', 'Buy', 'Sell', 'Deposit', 'Withdrawal'],
  dateRanges: ['All Time', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year'],
};

export const TransactionsPage = () => {
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');

  const filteredTransactions = transactions.filter((transaction) => {
    // Apply type filter
    if (typeFilter !== 'All' && transaction.type !== typeFilter.toLowerCase()) {
      return false;
    }

    // Apply date filter
    const transactionDate = new Date(transaction.date);
    const now = new Date();
    
    switch (dateFilter) {
      case 'Last 7 Days':
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
        return transactionDate >= sevenDaysAgo;
      case 'Last 30 Days':
        const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
        return transactionDate >= thirtyDaysAgo;
      case 'Last 90 Days':
        const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 90));
        return transactionDate >= ninetyDaysAgo;
      case 'This Year':
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        return transactionDate >= startOfYear;
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Transaction History</h2>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <span className="px-3 text-sm text-neutral-600 dark:text-neutral-400">Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="py-2 px-3 rounded-r-lg bg-transparent focus:outline-none"
              >
                {filterOptions.types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <span className="px-3 text-sm text-neutral-600 dark:text-neutral-400">Period:</span>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="py-2 px-3 rounded-r-lg bg-transparent focus:outline-none"
              >
                {filterOptions.dateRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <th className="text-left py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Asset</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Quantity</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Price</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Total</th>
                <th className="text-center py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-neutral-200 dark:border-neutral-700">
                  <td className="py-3 px-4 text-sm">
                    {new Date(tx.date).toLocaleDateString()} <span className="text-neutral-500 dark:text-neutral-400 text-xs">{new Date(tx.date).toLocaleTimeString()}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {tx.type === 'buy' && <ArrowDownTrayIcon className="w-4 h-4 text-success mr-2" />}
                      {tx.type === 'sell' && <ArrowUpTrayIcon className="w-4 h-4 text-danger mr-2" />}
                      {tx.type === 'deposit' && <ArrowDownTrayIcon className="w-4 h-4 text-success mr-2" />}
                      {tx.type === 'withdrawal' && <ArrowUpTrayIcon className="w-4 h-4 text-danger mr-2" />}
                      <span className="capitalize">{tx.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">{tx.asset}</td>
                  <td className="py-3 px-4 text-right">{tx.quantity.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">${tx.price.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">${tx.total.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs capitalize">{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
            <ArrowDownTrayIcon className="w-6 h-6 text-success mb-2" />
            <span className="font-medium">Buy Assets</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
            <ArrowUpTrayIcon className="w-6 h-6 text-danger mb-2" />
            <span className="font-medium">Sell Assets</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
            <ArrowDownTrayIcon className="w-6 h-6 text-success mb-2" />
            <span className="font-medium">Deposit Funds</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
            <ArrowPathIcon className="w-6 h-6 text-primary mb-2" />
            <span className="font-medium">Recurring Invest</span>
          </button>
        </div>
      </div>
    </div>
  );
}; 