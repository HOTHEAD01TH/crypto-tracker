import React, { useEffect, useState } from 'react';
import { getLivePrice } from '../services/cryptoAPI';

function PriceCard({ symbol }) {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    async function fetchPrice() {
      const livePrice = await getLivePrice(symbol);
      setPrice(livePrice);
    }
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div className="p-4 border rounded shadow-md bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold capitalize">{symbol}</h3>
      <p>Price: ${price ? price.toFixed(2) : 'Loading...'}</p>
    </div>
  );
}

export default PriceCard;
