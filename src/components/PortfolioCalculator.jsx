import React, { useState } from 'react';
import { getLivePrice } from '../services/cryptoAPI';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' }
];

function formatCurrencyValue(value, currencyCode) {
  const formatter = new Intl.NumberFormat(currencyCode === 'INR' ? 'en-IN' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  });
  return formatter.format(value);
}

function PortfolioCalculator({ watchlist }) {
  const [holdings, setHoldings] = useState({});
  const [totalValue, setTotalValue] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [exchangeRate, setExchangeRate] = useState(1);

  const calculatePortfolio = async () => {
    setIsCalculating(true);
    try {
      // First get the exchange rate
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${selectedCurrency.code}`
      );
      const rateData = await response.json();
      const rate = rateData[selectedCurrency.code];
      setExchangeRate(rate);

      // Calculate portfolio value in USD first
      let valueUSD = 0;
      for (const symbol of watchlist) {
        const price = await getLivePrice(symbol);
        valueUSD += (holdings[symbol] || 0) * price;
      }
      
      // Convert to selected currency
      setTotalValue(valueUSD * rate);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-2xl font-bold">Portfolio Calculator</h3>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Currency:</label>
          <select
            value={selectedCurrency.code}
            onChange={(e) => {
              const currency = currencies.find(c => c.code === e.target.value);
              setSelectedCurrency(currency);
            }}
            className="p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 min-w-[200px]"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.symbol} {currency.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {watchlist.map((symbol) => (
          <div key={symbol} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-lg">{symbol}</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={holdings[symbol] || ''}
                  onChange={(e) => setHoldings({ ...holdings, [symbol]: parseFloat(e.target.value) || 0 })}
                  className="w-32 p-2 border rounded dark:bg-gray-600 dark:border-gray-500"
                  placeholder="Amount"
                />
                <span className="text-sm text-gray-500">coins</span>
              </div>
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
            <span className="flex items-center justify-center">
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
          <p className="text-2xl font-bold">
            {selectedCurrency.symbol}
            {formatCurrencyValue(totalValue, selectedCurrency.code)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {lastUpdated ? `Last updated: ${lastUpdated}` : 'Not calculated yet'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PortfolioCalculator;
