import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PriceCard from './components/PriceCard';
import InsightCard from './components/InsightCard';
import HistoricalChart from './components/HistoricalChart';
import Calculator from './pages/Calculator';

const coins = [
  { symbol: 'BTC', name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
  { symbol: 'ETH', name: 'Ethereum', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
  { symbol: 'DOGE', name: 'Dogecoin', logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png' },
  { symbol: 'XRP', name: 'Ripple', logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.png' },
  { symbol: 'SOL', name: 'Solana', logo: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
  { symbol: 'ADA', name: 'Cardano', logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png' }
];

function Home() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <header className="p-4 text-center flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">Crypto Tracker</h1>
        <Link to="/calculator" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Calculator
        </Link>
      </header>
      
      <main className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {coins.map(({ symbol, name, logo }) => (
          <div key={symbol} className="space-y-4">
            <div className="flex items-center gap-2 p-2">
              <img src={logo} alt={name} className="w-8 h-8" />
              <h2 className="font-semibold">{name}</h2>
            </div>
            <PriceCard symbol={symbol} />
            <InsightCard symbol={symbol} />
            <HistoricalChart symbol={symbol} days={30} />
          </div>
        ))}
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
