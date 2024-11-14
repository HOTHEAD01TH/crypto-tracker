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

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const timeframe = timeframes.find(t => t.value === selectedTimeframe);
      const data = await getHistoricalData(symbol, timeframe.days);
      
      setChartData({
        labels: data.map((point) => {
          const date = new Date(point[0]);
          // Format date based on timeframe
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
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.1,
            fill: true,
          },
        ],
      });
      setIsLoading(false);
    }
    fetchData();
  }, [symbol, selectedTimeframe]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(156, 163, 175)',
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

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
