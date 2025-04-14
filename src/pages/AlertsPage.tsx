import { useState } from 'react';
import { BellIcon, PlusIcon, XMarkIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

// Mock alerts data
const initialAlerts = [
  { id: 1, asset: 'AAPL', condition: 'above', price: 180, status: 'active', created: '2023-04-10' },
  { id: 2, asset: 'BTC', condition: 'below', price: 40000, status: 'active', created: '2023-04-05' },
  { id: 3, asset: 'TSLA', condition: 'below', price: 175, status: 'triggered', created: '2023-03-28', triggered: '2023-04-01' },
  { id: 4, asset: 'MSFT', condition: 'above', price: 300, status: 'triggered', created: '2023-03-20', triggered: '2023-03-25' },
  { id: 5, asset: 'AMZN', condition: 'above', price: 170, status: 'active', created: '2023-04-11' },
];

// Notifications data
const notifications = [
  { id: 1, type: 'price_alert', message: 'TSLA dropped below $175.00', date: '2023-04-01T09:32:15', read: true },
  { id: 2, type: 'price_alert', message: 'MSFT rose above $300.00', date: '2023-03-25T14:15:30', read: true },
  { id: 3, type: 'system', message: 'Your portfolio has been rebalanced successfully', date: '2023-03-22T11:45:00', read: true },
  { id: 4, type: 'dividend', message: 'You received a dividend payment of $142.50 from AAPL', date: '2023-03-15T08:30:00', read: false },
  { id: 5, type: 'system', message: 'Your account statement for March 2023 is available', date: '2023-04-02T07:00:00', read: false },
  { id: 6, type: 'news', message: 'Breaking: Federal Reserve hikes interest rates by 0.25%', date: '2023-03-22T16:30:00', read: false },
];

export const AlertsPage = () => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [isCreatingAlert, setIsCreatingAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({ asset: '', condition: 'above', price: '' });

  // Handler to toggle notification read status
  const toggleReadStatus = (id: number) => {
    // In a real app, you would update this via an API call
    console.log(`Toggling read status for notification ${id}`);
  };

  // Handler to create a new alert
  const handleCreateAlert = () => {
    if (!newAlert.asset || !newAlert.price) return;
    
    const nextId = Math.max(...alerts.map(a => a.id)) + 1;
    const today = new Date().toISOString().split('T')[0];
    
    setAlerts([
      ...alerts,
      {
        id: nextId,
        asset: newAlert.asset,
        condition: newAlert.condition,
        price: parseFloat(newAlert.price as string),
        status: 'active',
        created: today
      }
    ]);
    
    setNewAlert({ asset: '', condition: 'above', price: '' });
    setIsCreatingAlert(false);
  };

  // Handler to delete an alert
  const handleDeleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Price Alerts</h2>
            <button
              onClick={() => setIsCreatingAlert(true)}
              className="btn-primary flex items-center"
              disabled={isCreatingAlert}
            >
              <PlusIcon className="w-5 h-5 mr-1" />
              Add Alert
            </button>
          </div>

          {isCreatingAlert && (
            <div className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">New Price Alert</h3>
                <button
                  onClick={() => setIsCreatingAlert(false)}
                  className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Asset Symbol</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g. AAPL"
                    value={newAlert.asset}
                    onChange={(e) => setNewAlert({ ...newAlert, asset: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Condition</label>
                  <select
                    className="input"
                    value={newAlert.condition}
                    onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value })}
                  >
                    <option value="above">Price Above</option>
                    <option value="below">Price Below</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="0.00"
                    value={newAlert.price}
                    onChange={(e) => setNewAlert({ ...newAlert, price: e.target.value })}
                  />
                </div>
              </div>
              <button onClick={handleCreateAlert} className="btn-primary">
                Create Alert
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Asset</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Condition</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Price</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Created</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-neutral-600 dark:text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {alerts.length > 0 ? (
                  alerts.map((alert) => (
                    <tr key={alert.id} className="border-b border-neutral-200 dark:border-neutral-700">
                      <td className="py-3 px-4 font-medium">{alert.asset}</td>
                      <td className="py-3 px-4 capitalize">{alert.condition}</td>
                      <td className="py-3 px-4 text-right">${alert.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs uppercase ${
                          alert.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {alert.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{alert.created}</td>
                      <td className="py-3 px-4 flex justify-center space-x-2">
                        <button className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700">
                          <PencilIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                        </button>
                        <button 
                          className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
                          onClick={() => handleDeleteAlert(alert.id)}
                        >
                          <TrashIcon className="w-4 h-4 text-danger" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-neutral-500">
                      No price alerts set. Create one to monitor specific assets.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Notifications</h2>
            <span className="px-2 py-1 bg-primary text-xs text-white rounded-full">{notifications.filter(n => !n.read).length} new</span>
          </div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-3 rounded-lg border ${
                  notification.read 
                    ? 'border-neutral-200 dark:border-neutral-700' 
                    : 'border-primary bg-primary/5'
                }`}
              >
                <div className="flex items-start">
                  <BellIcon className={`w-5 h-5 mr-2 mt-0.5 ${notification.read ? 'text-neutral-400' : 'text-primary'}`} />
                  <div className="flex-1">
                    <p className={`${notification.read ? 'text-neutral-600 dark:text-neutral-400' : 'font-medium'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {new Date(notification.date).toLocaleString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <button 
                      className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700"
                      onClick={() => toggleReadStatus(notification.id)}
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Alert Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-neutral-300 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-neutral-300 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span>SMS Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-neutral-300 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 