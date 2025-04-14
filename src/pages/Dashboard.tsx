import { StatsCard } from '../components/StatsCard';
import { CreditCard } from '../components/CreditCard';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { ArrowTrendingUpIcon, CreditCardIcon, BanknotesIcon, ChartPieIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  // Mock data for stats cards
  const statsData = [
    { 
      title: 'Total Balance', 
      value: '$24,521.28', 
      change: 8.14,
      color: '#9ac1f0',
      icon: <BanknotesIcon className="w-5 h-5" /> 
    },
    { 
      title: 'Investments', 
      value: '$16,854.35', 
      change: 12.6,
      color: '#72fa93',
      icon: <ArrowTrendingUpIcon className="w-5 h-5" /> 
    },
    { 
      title: 'Credit Score', 
      value: '785', 
      change: 2.3,
      color: '#a0e548',
      icon: <CreditCardIcon className="w-5 h-5" /> 
    },
    { 
      title: 'Returns', 
      value: '$2,416.32', 
      change: -1.8,
      color: '#e45f2b',
      icon: <ChartPieIcon className="w-5 h-5" /> 
    }
  ];

  // Mock data for analytics
  const portfolioAnalytics = [
    { name: 'Stocks', value: 48 },
    { name: 'Bonds', value: 21 },
    { name: 'Cash', value: 15 },
    { name: 'Crypto', value: 10 },
    { name: 'Real Estate', value: 6 }
  ];

  const expenseAnalytics = [
    { name: 'Housing', value: 35 },
    { name: 'Food', value: 20 },
    { name: 'Transportation', value: 15 },
    { name: 'Utilities', value: 10 },
    { name: 'Entertainment', value: 12 },
    { name: 'Other', value: 8 }
  ];

  // Generate chart data
  const generateChartData = (trend: 'up' | 'down' | 'volatile', points = 12) => {
    const data = [];
    let value = 50;
    
    for (let i = 0; i < points; i++) {
      if (trend === 'up') {
        value += Math.random() * 10 - 2; // Mostly up
      } else if (trend === 'down') {
        value -= Math.random() * 10 - 2; // Mostly down
      } else {
        value += Math.random() * 20 - 10; // Volatile
      }
      
      // Keep within bounds
      value = Math.max(10, Math.min(90, value));
      data.push(value);
    }
    
    return data;
  };

  // Add chart data to stats
  const statsWithCharts = statsData.map((stat, index) => {
    const trend = index === 3 ? 'down' : 'up';
    return {
      ...stat,
      chart: generateChartData(trend)
    };
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Financial Dashboard</h1>
      
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsWithCharts.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            color={stat.color}
            chart={stat.chart}
            icon={stat.icon}
          />
        ))}
      </div>
      
      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Credit Card */}
        <div className="lg:col-span-1">
          <CreditCard
            balance="$24,521.28"
            cardNumber="4562 1122 4594 7852"
            expiry="12/24"
            name="ALEX MORGAN"
            onClick={() => console.log('Card clicked')}
          />
        </div>
        
        {/* Portfolio Distribution */}
        <div className="lg:col-span-2">
          <AnalyticsCard
            title="Portfolio Distribution"
            items={portfolioAnalytics}
            total="$24,521.28"
            timeRange="Last Month"
            onTimeRangeChange={(range) => console.log(`Changed to ${range}`)}
          />
        </div>
      </div>
      
      {/* Expense Analysis */}
      <div className="mb-8">
        <AnalyticsCard
          title="Monthly Expenses"
          items={expenseAnalytics}
          total="$3,428.75"
          timeRange="Last Month"
          onTimeRangeChange={(range) => console.log(`Changed to ${range}`)}
        />
      </div>
    </div>
  );
};

export default Dashboard; 