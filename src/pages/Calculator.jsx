import React from 'react';
import PortfolioCalculator from '../components/PortfolioCalculator';

function Calculator() {
  const coins = ['BTC', 'ETH', 'DOGE', 'XRP', 'SOL', 'ADA', 'DOT', 'LINK', 'MATIC', 'UNI'];
  
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white p-4">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">Portfolio Calculator</h1>
      </header>
      <div className="max-w-2xl mx-auto">
        <PortfolioCalculator watchlist={coins} />
      </div>
    </div>
  );
}

export default Calculator; 