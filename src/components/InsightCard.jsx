import React, { useEffect, useState } from 'react';
import { getInsights } from '../services/geminiAPI';

function InsightCard({ symbol }) {
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchInsights() {
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
    }
    fetchInsights();
  }, [symbol]);

  return (
    <div className="p-4 border rounded shadow-md bg-blue-50 dark:bg-blue-900">
      <h3 className="text-lg font-semibold capitalize">{symbol} Insights</h3>
      {isLoading ? (
        <p className="animate-pulse">Loading insights...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <p>{insights}</p>
      )}
    </div>
  );
}

export default InsightCard;
