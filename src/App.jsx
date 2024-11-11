import React, { useState } from 'react';
import PriceCard from './components/PriceCard';
import InsightCard from './components/InsightCard';
import PortfolioCalculator from './components/PortfolioCalculator';
import HistoricalChart from './components/HistoricalChart';

function App() {
  const [watchlist, setWatchlist] = useState(['BTC', 'ETH', 'DOGE']);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <header className="p-4 text-center">
        <h1 className="text-2xl font-bold">Crypto Tracker</h1>
      </header>
      
      <main className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {watchlist.map((symbol) => (
          <div key={symbol} className="space-y-4">
            <PriceCard symbol={symbol} />
            <InsightCard symbol={symbol} />
            <HistoricalChart symbol={symbol} days={30} />
          </div>
        ))}
        <PortfolioCalculator watchlist={watchlist} />
      </main>
    </div>
  );
}

export default App;
