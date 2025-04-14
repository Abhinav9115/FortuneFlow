import { useState } from 'react';
import { UserCircleIcon, LockClosedIcon, MoonIcon, BellIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
  });

  const [appearanceForm, setAppearanceForm] = useState({
    theme: 'system',
    compactMode: false,
    animationsEnabled: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      priceAlerts: true,
      marketNews: false,
      portfolioUpdates: true,
      promotions: false,
    },
    push: {
      priceAlerts: true,
      marketNews: true,
      portfolioUpdates: true,
      promotions: false,
    },
  });

  const [currencySettings, setCurrencySettings] = useState({
    primaryCurrency: 'USD',
    showDecimals: true,
    showCurrencySymbol: true,
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile form submission
    console.log('Profile form submitted:', profileForm);
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle security form submission
    console.log('Security form submitted:', securityForm);
  };

  const handleAppearanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle appearance form submission
    console.log('Appearance form submitted:', appearanceForm);

    // Actually apply the theme preference in a real app
    if (appearanceForm.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (appearanceForm.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System preference would be handled via media query
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <div className="card overflow-hidden">
          <nav className="flex flex-col">
            <button
              className={`flex items-center p-3 text-left ${
                activeTab === 'profile'
                  ? 'bg-primary text-white'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <UserCircleIcon className="w-5 h-5 mr-3" />
              <span>Profile</span>
            </button>
            <button
              className={`flex items-center p-3 text-left ${
                activeTab === 'security'
                  ? 'bg-primary text-white'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
              onClick={() => setActiveTab('security')}
            >
              <LockClosedIcon className="w-5 h-5 mr-3" />
              <span>Security</span>
            </button>
            <button
              className={`flex items-center p-3 text-left ${
                activeTab === 'appearance'
                  ? 'bg-primary text-white'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
              onClick={() => setActiveTab('appearance')}
            >
              <MoonIcon className="w-5 h-5 mr-3" />
              <span>Appearance</span>
            </button>
            <button
              className={`flex items-center p-3 text-left ${
                activeTab === 'notifications'
                  ? 'bg-primary text-white'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              <BellIcon className="w-5 h-5 mr-3" />
              <span>Notifications</span>
            </button>
            <button
              className={`flex items-center p-3 text-left ${
                activeTab === 'regional'
                  ? 'bg-primary text-white'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
              onClick={() => setActiveTab('regional')}
            >
              <GlobeAltIcon className="w-5 h-5 mr-3" />
              <span>Regional</span>
            </button>
          </nav>
        </div>
      </div>

      <div className="md:col-span-3">
        {activeTab === 'profile' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    className="input"
                    value={profileForm.firstName}
                    onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    className="input"
                    value={profileForm.lastName}
                    onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  className="input"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="input"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                />
              </div>
              <div className="pt-4">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
            <form onSubmit={handleSecuritySubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <input
                  type="password"
                  className="input"
                  value={securityForm.currentPassword}
                  onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  className="input"
                  value={securityForm.newPassword}
                  onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="input"
                  value={securityForm.confirmPassword}
                  onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                />
              </div>
              <div className="flex items-center pt-2">
                <input
                  id="twoFactor"
                  type="checkbox"
                  className="w-4 h-4 text-primary focus:ring-primary border-neutral-300 rounded"
                  checked={securityForm.twoFactorEnabled}
                  onChange={(e) => setSecurityForm({ ...securityForm, twoFactorEnabled: e.target.checked })}
                />
                <label htmlFor="twoFactor" className="ml-2 block text-sm">
                  Enable Two-Factor Authentication
                </label>
              </div>
              <div className="pt-4">
                <button type="submit" className="btn-primary">
                  Update Security Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Appearance Settings</h2>
            <form onSubmit={handleAppearanceSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Theme</label>
                <div className="flex flex-wrap gap-3">
                  <label className="relative">
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      className="sr-only peer"
                      checked={appearanceForm.theme === 'light'}
                      onChange={() => setAppearanceForm({ ...appearanceForm, theme: 'light' })}
                    />
                    <div className="w-24 h-24 bg-white border-2 border-neutral-200 rounded-lg peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary flex flex-col items-center justify-center cursor-pointer">
                      <div className="w-16 h-16 rounded-md bg-neutral-100 mb-2"></div>
                      <span className="text-sm">Light</span>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      className="sr-only peer"
                      checked={appearanceForm.theme === 'dark'}
                      onChange={() => setAppearanceForm({ ...appearanceForm, theme: 'dark' })}
                    />
                    <div className="w-24 h-24 bg-neutral-800 border-2 border-neutral-700 rounded-lg peer-checked:border-accent peer-checked:ring-2 peer-checked:ring-accent flex flex-col items-center justify-center cursor-pointer">
                      <div className="w-16 h-16 rounded-md bg-neutral-700 mb-2"></div>
                      <span className="text-sm text-white">Dark</span>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="theme"
                      value="system"
                      className="sr-only peer"
                      checked={appearanceForm.theme === 'system'}
                      onChange={() => setAppearanceForm({ ...appearanceForm, theme: 'system' })}
                    />
                    <div className="w-24 h-24 bg-gradient-to-b from-white to-neutral-800 border-2 border-neutral-200 rounded-lg peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary flex flex-col items-center justify-center cursor-pointer">
                      <div className="w-16 h-16 rounded-md bg-gradient-to-b from-neutral-100 to-neutral-700 mb-2"></div>
                      <span className="text-sm bg-white rounded px-2">System</span>
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  id="compactMode"
                  type="checkbox"
                  className="w-4 h-4 text-primary focus:ring-primary border-neutral-300 rounded"
                  checked={appearanceForm.compactMode}
                  onChange={(e) => setAppearanceForm({ ...appearanceForm, compactMode: e.target.checked })}
                />
                <label htmlFor="compactMode" className="ml-2 block text-sm">
                  Use Compact Mode
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="animations"
                  type="checkbox"
                  className="w-4 h-4 text-primary focus:ring-primary border-neutral-300 rounded"
                  checked={appearanceForm.animationsEnabled}
                  onChange={(e) => setAppearanceForm({ ...appearanceForm, animationsEnabled: e.target.checked })}
                />
                <label htmlFor="animations" className="ml-2 block text-sm">
                  Enable Animations
                </label>
              </div>
              <div className="pt-4">
                <button type="submit" className="btn-primary">
                  Save Appearance Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Notification Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Price Alerts</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationSettings.email.priceAlerts}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          email: {
                            ...notificationSettings.email,
                            priceAlerts: e.target.checked
                          }
                        })}
                      />
                      <div className="w-11 h-6 bg-neutral-300 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Market News</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationSettings.email.marketNews}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          email: {
                            ...notificationSettings.email,
                            marketNews: e.target.checked
                          }
                        })}
                      />
                      <div className="w-11 h-6 bg-neutral-300 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Portfolio Updates</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationSettings.email.portfolioUpdates}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          email: {
                            ...notificationSettings.email,
                            portfolioUpdates: e.target.checked
                          }
                        })}
                      />
                      <div className="w-11 h-6 bg-neutral-300 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Price Alerts</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationSettings.push.priceAlerts}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          push: {
                            ...notificationSettings.push,
                            priceAlerts: e.target.checked
                          }
                        })}
                      />
                      <div className="w-11 h-6 bg-neutral-300 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Market News</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationSettings.push.marketNews}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          push: {
                            ...notificationSettings.push,
                            marketNews: e.target.checked
                          }
                        })}
                      />
                      <div className="w-11 h-6 bg-neutral-300 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Portfolio Updates</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationSettings.push.portfolioUpdates}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          push: {
                            ...notificationSettings.push,
                            portfolioUpdates: e.target.checked
                          }
                        })}
                      />
                      <div className="w-11 h-6 bg-neutral-300 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button className="btn-primary">
                  Save Notification Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'regional' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Regional Settings</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Currency Display</label>
                <select
                  className="input"
                  value={currencySettings.primaryCurrency}
                  onChange={(e) => setCurrencySettings({ ...currencySettings, primaryCurrency: e.target.value })}
                >
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                  <option value="JPY">Japanese Yen (JPY)</option>
                  <option value="CAD">Canadian Dollar (CAD)</option>
                  <option value="AUD">Australian Dollar (AUD)</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  id="showDecimals"
                  type="checkbox"
                  className="w-4 h-4 text-primary focus:ring-primary border-neutral-300 rounded"
                  checked={currencySettings.showDecimals}
                  onChange={(e) => setCurrencySettings({ ...currencySettings, showDecimals: e.target.checked })}
                />
                <label htmlFor="showDecimals" className="ml-2 block text-sm">
                  Show Decimal Places
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="showCurrencySymbol"
                  type="checkbox"
                  className="w-4 h-4 text-primary focus:ring-primary border-neutral-300 rounded"
                  checked={currencySettings.showCurrencySymbol}
                  onChange={(e) => setCurrencySettings({ ...currencySettings, showCurrencySymbol: e.target.checked })}
                />
                <label htmlFor="showCurrencySymbol" className="ml-2 block text-sm">
                  Show Currency Symbol
                </label>
              </div>
              <div className="pt-4">
                <button type="submit" className="btn-primary">
                  Save Regional Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}; 