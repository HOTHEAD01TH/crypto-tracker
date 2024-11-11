import React from 'react';
import { Link } from 'react-router-dom';
import PriceCard from '../components/PriceCard';
import InsightCard from '../components/InsightCard';
import HistoricalChart from '../components/HistoricalChart';

const coins = [
  { symbol: 'BTC', name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
  { symbol: 'ETH', name: 'Ethereum', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
  { symbol: 'DOGE', name: 'Dogecoin', logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png' },
  { symbol: 'XRP', name: 'Ripple', logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.png' },
  { symbol: 'SOL', name: 'Solana', logo: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
  { symbol: 'ADA', name: 'Cardano', logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png' },
  { symbol: 'DOT', name: 'Polkadot', logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png' },
  { symbol: 'MATIC', name: 'Polygon', logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png' },
  { symbol: 'LINK', name: 'Chainlink', logo: 'https://cryptologos.cc/logos/chainlink-link-logo.png' }
];

function Home() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <header className="p-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Crypto Tracker</h1>
          <div className="flex items-center gap-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {coins.map(({ symbol, name, logo }) => (
            <div key={symbol} className="space-y-4">
              {/* Coin Card */}
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

              {/* Insight Card */}
              <InsightCard symbol={symbol} name={name} />
            </div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="fixed bottom-4 right-4 flex flex-col gap-2 md:hidden">
          <Link 
            to="/calculator"
            className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </Link>
          <Link 
            to="/"
            className="bg-gray-500 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-4 left-4 bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Home;