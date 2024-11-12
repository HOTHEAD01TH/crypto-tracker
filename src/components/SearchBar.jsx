import React, { useState } from 'react';

function SearchBar({ onAddCoin }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
      const data = await response.json();
      setSearchResults(data.coins);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleAddCoin = (coin) => {
    onAddCoin(coin);
    setQuery('');
    setSearchResults([]);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-2 w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a coin..."
          className="flex-grow p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>
      {searchResults.length > 0 && (
        <ul className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-h-60 overflow-y-auto">
          {searchResults.map((coin) => (
            <li
              key={coin.id}
              className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleAddCoin(coin)}
            >
              <div className="flex items-center gap-2">
                <img src={coin.thumb} alt={coin.name} className="w-6 h-6" />
                <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
              </div>
              <button className="text-blue-500 hover:underline">Add</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar; 