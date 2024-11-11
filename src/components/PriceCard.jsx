import React, { useEffect, useState } from 'react';
import { getLivePrice } from '../services/cryptoAPI';

function PriceCard({ symbol }) {
  const [price, setPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPrice() {
      setIsLoading(true);
      const livePrice = await getLivePrice(symbol);
      setPrice(livePrice);
      setIsLoading(false);
      
    }
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-gray-500 dark:text-gray-400">Current Price</span>
        {isLoading ? (
          <div className="animate-pulse h-6 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
        ) : (
          <span className="text-xl font-bold">${price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        )}
      </div>
    </div>
  );
}

export default PriceCard;
