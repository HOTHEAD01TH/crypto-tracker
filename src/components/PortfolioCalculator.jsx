import React, { useState } from 'react';
import { getLivePrice } from '../services/cryptoAPI';

function PortfolioCalculator({ watchlist }) {
  const [holdings, setHoldings] = useState({});
  const [totalValue, setTotalValue] = useState(0);

  const calculatePortfolio = async () => {
    let value = 0;
    for (const symbol of watchlist) {
      const price = await getLivePrice(symbol);
      value += (holdings[symbol] || 0) * price;
    }
    setTotalValue(value);
  };

  return (
    <div className="p-4 border rounded shadow-md bg-green-50 dark:bg-green-900">
      <h3 className="text-lg font-semibold">Portfolio Calculator</h3>
      {watchlist.map((symbol) => (
        <div key={symbol} className="flex justify-between my-2">
          <label className="capitalize">{symbol}</label>
          <input
            type="number"
            value={holdings[symbol] || ''}
            onChange={(e) => setHoldings({ ...holdings, [symbol]: parseFloat(e.target.value) || 0 })}
            className="border p-1 w-20"
          />
        </div>
      ))}
      <button onClick={calculatePortfolio} className="mt-4 bg-blue-500 text-white py-1 px-3 rounded">
        Calculate
      </button>
      <p className="mt-2">Total Value: ${totalValue.toFixed(2)}</p>
    </div>
  );
}

export default PortfolioCalculator;
