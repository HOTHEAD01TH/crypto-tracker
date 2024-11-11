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

function HistoricalChart({ symbol, days }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getHistoricalData(symbol, days);
      setChartData({
        labels: data.map((point) => new Date(point[0]).toLocaleDateString()),
        datasets: [
          {
            label: `${symbol.toUpperCase()} Price`,
            data: data.map((point) => point[1]),
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          },
        ],
      });
    }
    fetchData();
  }, [symbol, days]);

  return chartData ? <Line data={chartData} /> : <p>Loading chart...</p>;
}

export default HistoricalChart;
