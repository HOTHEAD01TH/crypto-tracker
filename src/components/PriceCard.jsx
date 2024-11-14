import React, { useEffect, useState } from 'react';
import { getMarketData } from '../services/cryptoAPI';

function PriceCard({ symbol }) {
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getMarketData(symbol);
      setMarketData(data);
      setIsLoading(false);
    }
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [symbol]);

  const formatPercent = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      {/* Loading skeleton */}
      <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
    </div>;
  }

  return (
    <div className="space-y-4">
      {/* Price and 24h Change */}
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">
          ${marketData?.PRICE.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
        <span className={`text-sm font-semibold ${
          marketData?.CHANGEPCT24HOUR > 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          {formatPercent(marketData?.CHANGEPCT24HOUR)}
        </span>
      </div>

      {/* Trading Volume */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">24h Volume</p>
          <p className="font-medium">${marketData?.VOLUME24HOUR.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Market Cap</p>
          <p className="font-medium">${marketData?.MKTCAP.toLocaleString()}</p>
        </div>
      </div>

      {/* High/Low */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">24h High</p>
          <p className="font-medium text-green-500">${marketData?.HIGH24HOUR.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">24h Low</p>
          <p className="font-medium text-red-500">${marketData?.LOW24HOUR.toLocaleString()}</p>
        </div>
      </div>

      {/* Price Changes */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
          <p className="text-gray-500 dark:text-gray-400">1h</p>
          <p className={marketData?.CHANGEPCTHOUR > 0 ? 'text-green-500' : 'text-red-500'}>
            {formatPercent(marketData?.CHANGEPCTHOUR)}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
          <p className="text-gray-500 dark:text-gray-400">24h</p>
          <p className={marketData?.CHANGEPCT24HOUR > 0 ? 'text-green-500' : 'text-red-500'}>
            {formatPercent(marketData?.CHANGEPCT24HOUR)}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
          <p className="text-gray-500 dark:text-gray-400">7d</p>
          <p className={marketData?.CHANGEPCTDAY > 0 ? 'text-green-500' : 'text-red-500'}>
            {formatPercent(marketData?.CHANGEPCTDAY * 7)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PriceCard;
