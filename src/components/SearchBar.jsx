import React, { useState } from 'react';

function SearchBar({ onAddCoin }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/list`);
      const coins = await response.json();
      const coin = coins.find(c => c.symbol.toLowerCase() === query.toLowerCase());

      if (coin) {
        onAddCoin(coin);
        setQuery('');
      } else {
        alert('Coin not found');
      }
    } catch (error) {
      console.error('Error fetching coin data:', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a coin..."
        className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add
      </button>
    </div>
  );
}

export default SearchBar; 