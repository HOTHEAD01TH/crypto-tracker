import React, { useState } from 'react';

function SearchBar({ onAddCoin }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(value)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      
      if (data.coins && data.coins.length > 0) {
        setSearchResults(data.coins.slice(0, 5));
        setShowDropdown(true);
        setError(null);
      } else {
        setSearchResults([]);
        setError('No cryptocurrencies found');
      }
    } catch (err) {
      setError('Failed to search cryptocurrencies');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCoin = (coin) => {
    onAddCoin(coin);
    setSearchTerm('');
    setSearchResults([]);
    setShowDropdown(false);
    setError(null);
  };

  return (
    <div className="relative max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search cryptocurrencies..."
          className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {isLoading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="absolute w-full bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-3 mt-1 z-50">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Search Results Dropdown */}
      {showDropdown && searchResults.length > 0 && (
        <div className="absolute w-full bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
          {searchResults.map((coin) => (
            <button
              key={coin.id}
              onClick={() => handleSelectCoin(coin)}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <img 
                src={coin.thumb} 
                alt={coin.name} 
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium">{coin.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {coin.symbol.toUpperCase()}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar; 