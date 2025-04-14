import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

interface DataPoint {
  date: string;
  value: number;
  secondValue?: number;
}

interface PerformanceChartProps {
  data: DataPoint[];
  timeRange: string;
  type?: 'area' | 'line';
  colors?: {
    primary: string;
    secondary?: string;
  };
  showGrid?: boolean;
  showAxis?: boolean;
  height?: number;
  simpleChart?: boolean;
}

export const PerformanceChart = ({ 
  data, 
  timeRange,
  type = 'area',
  colors = { primary: '#9ac1f0', secondary: '#e45f2b' },
  showGrid = true,
  showAxis = true,
  height = 300,
  simpleChart = false
}: PerformanceChartProps) => {
  const formatYAxis = (value: number) => `$${value.toLocaleString()}`;
  
  const formatTooltip = (value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value'];

  const formatXAxis = useMemo(() => {
    switch (timeRange) {
      case '1D':
        return (date: string) => date.split(' ')[1]; // Show only time
      case '1W':
      case '1M':
        return (date: string) => date.split(' ')[0]; // Show only date
      default:
        return (date: string) => date;
    }
  }, [timeRange]);

  if (simpleChart) {
    return (
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={colors.primary} 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      {type === 'area' ? (
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />}
          {showAxis && (
            <>
              <XAxis
                dataKey="date"
                tickFormatter={formatXAxis}
                tick={{ fill: '#a0aec0' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fill: '#a0aec0' }}
                tickLine={false}
                axisLine={false}
                width={80}
              />
            </>
          )}
          <Tooltip
            formatter={formatTooltip}
            contentStyle={{
              backgroundColor: '#252b3b',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              color: '#fff'
            }}
          />
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={colors.primary}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
          {data[0]?.secondValue && colors.secondary && (
            <>
              <defs>
                <linearGradient id="colorSecondValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors.secondary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="secondValue"
                stroke={colors.secondary}
                fillOpacity={1}
                fill="url(#colorSecondValue)"
              />
            </>
          )}
        </AreaChart>
      ) : (
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />}
          {showAxis && (
            <>
              <XAxis
                dataKey="date"
                tickFormatter={formatXAxis}
                tick={{ fill: '#a0aec0' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fill: '#a0aec0' }}
                tickLine={false}
                axisLine={false}
                width={80}
              />
            </>
          )}
          <Tooltip
            formatter={formatTooltip}
            contentStyle={{
              backgroundColor: '#252b3b',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              color: '#fff'
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={colors.primary}
            strokeWidth={2}
            dot={false}
          />
          {data[0]?.secondValue && colors.secondary && (
            <Line
              type="monotone"
              dataKey="secondValue"
              stroke={colors.secondary}
              strokeWidth={2}
              dot={false}
            />
          )}
        </LineChart>
      )}
    </ResponsiveContainer>
  );
}; 