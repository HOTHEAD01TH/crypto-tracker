import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import PortfolioCalculator from '../components/PortfolioCalculator';

function Calculator() {
  const coins = ['BTC', 'ETH', 'DOGE', 'XRP', 'SOL', 'ADA', 'DOT', 'LINK', 'MATIC', 'UNI'];
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Portfolio Calculator</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link 
              to="/dashboard" 
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
        
        <PortfolioCalculator watchlist={coins} />
      </div>
    </div>
  );
}

export default Calculator; 