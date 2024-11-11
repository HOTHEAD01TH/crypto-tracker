import React, { useState } from 'react';
import { getInsights } from '../services/geminiAPI';

function InsightCard({ symbol, name }) {
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getInsights(symbol);
      setInsights(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!insights && !isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
        <button
          onClick={fetchInsights}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Get {name} Insights
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{name} Market Insights</h3>
        <button
          onClick={fetchInsights}
          className="text-blue-500 hover:text-blue-600 text-sm"
          disabled={isLoading}
        >
          Refresh
        </button>
      </div>

      <div className="text-sm">
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{insights}</p>
        )}
      </div>
    </div>
  );
}

export default InsightCard;
