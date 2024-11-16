import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getHistoricalData } from '../services/cryptoAPI';
import { useTheme } from '../context/ThemeContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const timeframes = [
  { label: '1H', value: '1h', days: 1/24 },
  { label: '24H', value: '24h', days: 1 },
  { label: '7D', value: '7d', days: 7 },
  { label: '30D', value: '30d', days: 30 },
  { label: '1Y', value: '1y', days: 365 }
];

function HistoricalChart({ symbol }) {
  const [chartData, setChartData] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const chartThemes = {
    light: {
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      gridColor: 'rgba(156, 163, 175, 0.1)',
      textColor: 'rgb(55, 65, 81)'
    },
    dark: {
      borderColor: 'rgb(96, 165, 250)',
      backgroundColor: 'rgba(96, 165, 250, 0.1)',
      gridColor: 'rgba(75, 85, 99, 0.2)',
      textColor: 'rgb(209, 213, 219)'
    }
  };

  const currentTheme = chartThemes[theme === 'dark' ? 'dark' : 'light'];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: theme === 'dark' ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
        titleColor: currentTheme.textColor,
        bodyColor: currentTheme.textColor,
        borderColor: currentTheme.gridColor,
        borderWidth: 1
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        position: 'right',
        grid: {
          color: currentTheme.gridColor,
        },
        ticks: {
          color: currentTheme.textColor,
          callback: (value) => `$${value.toLocaleString()}`
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const timeframe = timeframes.find(t => t.value === selectedTimeframe);
        const data = await getHistoricalData(symbol, timeframe.days);
        
        if (data && Array.isArray(data)) {
          setChartData({
            labels: data.map((point) => {
              const date = new Date(point[0]);
              if (timeframe.days <= 1) {
                return date.toLocaleTimeString();
              } else if (timeframe.days <= 7) {
                return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
              }
              return date.toLocaleDateString();
            }),
            datasets: [
              {
                label: `${symbol} Price`,
                data: data.map((point) => point[1]),
                borderColor: currentTheme.borderColor,
                backgroundColor: currentTheme.backgroundColor,
                tension: 0.1,
                fill: true,
              },
            ],
          });
        } else {
          console.error('Invalid historical data format:', data);
        }
      } catch (error) {
        console.error('Error fetching historical data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [symbol, selectedTimeframe, theme]);

  return (
    <div className="space-y-4">
      {/* Timeframe Selector */}
      <div className="flex justify-center gap-2">
        {timeframes.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setSelectedTimeframe(value)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
              ${selectedTimeframe === value 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : null}
        {chartData && <Line data={chartData} options={options} />}
      </div>
    </div>
  );
}

export default HistoricalChart;
