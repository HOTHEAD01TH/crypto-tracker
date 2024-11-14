import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PriceCard from '../components/priceCard';
import InsightCard from '../components/InsightCard';
import HistoricalChart from '../components/HistoricalChart';
import ThemeToggle from '../components/ThemeToggle';
import SearchBar from '../components/SearchBar';

function Home() {
  const [coins, setCoins] = useState([
    { symbol: 'BTC', name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
    { symbol: 'ETH', name: 'Ethereum', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
    { symbol: 'DOGE', name: 'Dogecoin', logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png' },
    { symbol: 'XRP', name: 'Ripple', logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.png' },
    { symbol: 'SOL', name: 'Solana', logo: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
    { symbol: 'ADA', name: 'Cardano', logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png' },
    { symbol: 'DOT', name: 'Polkadot', logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png' },
    { symbol: 'MATIC', name: 'Polygon', logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png' },
    { symbol: 'LINK', name: 'Chainlink', logo: 'https://cryptologos.cc/logos/chainlink-link-logo.png' }
  ]);

  const addCoin = (coin) => {
    const newCoin = {
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      logo: coin.thumb
    };
    setCoins([...coins, newCoin]);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <header className="p-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Crypto Tracker</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link 
              to="/news" 
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              News & Analytics
            </Link>
            <Link 
              to="/calculator" 
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Portfolio Calculator
            </Link>
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              Exit to Home
            </Link>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <SearchBar onAddCoin={addCoin} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {coins.map(({ symbol, name, logo }) => (
            <div key={symbol} className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700">
                  <img src={logo} alt={name} className="w-10 h-10" />
                  <h2 className="text-xl font-bold">{name}</h2>
                </div>
                
                <div className="p-4">
                  <PriceCard symbol={symbol} />
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700">
                  <HistoricalChart symbol={symbol} days={30} />
                </div>
              </div>

              <InsightCard symbol={symbol} name={name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;