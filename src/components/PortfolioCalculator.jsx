import React, { useState } from 'react';
import { getLivePrice } from '../services/cryptoAPI';

function PortfolioCalculator({ watchlist }) {
  const [holdings, setHoldings] = useState({});
  const [totalValue, setTotalValue] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const calculatePortfolio = async () => {
    setIsCalculating(true);
    let value = 0;
    try {
      for (const symbol of watchlist) {
        const price = await getLivePrice(symbol);
        value += (holdings[symbol] || 0) * price;
      }
      setTotalValue(value);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-center">Portfolio Calculator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {watchlist.map((symbol) => (
          <div key={symbol} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-lg">{symbol}</label>
              <input
                type="number"
                value={holdings[symbol] || ''}
                onChange={(e) => setHoldings({ ...holdings, [symbol]: parseFloat(e.target.value) || 0 })}
                className="w-32 p-2 border rounded dark:bg-gray-600 dark:border-gray-500"
                placeholder="Amount"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={calculatePortfolio}
          disabled={isCalculating}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            isCalculating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isCalculating ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Calculating...
            </span>
          ) : (
            'Calculate Portfolio'
          )}
        </button>

        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
          <p className="text-2xl font-bold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {lastUpdated ? `Last updated: ${lastUpdated}` : 'Not calculated yet'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PortfolioCalculator;
