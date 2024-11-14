import React, { useState, useEffect } from 'react';
import { getSocialSentiment } from '../services/cryptoAPI';

function SocialSentiment() {
  const [sentiment, setSentiment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSentiment() {
      const data = await getSocialSentiment();
      setSentiment(data);
      setIsLoading(false);
    }
    fetchSentiment();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Social Sentiment</h2>
      <div className="space-y-4">
        {Object.entries(sentiment).map(([coin, data]) => (
          <div key={coin} className="border-b dark:border-gray-700 pb-2">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{coin}</span>
              <span className={`text-sm ${
                data.sentiment > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {data.sentiment > 0 ? '↑' : '↓'} {Math.abs(data.sentiment)}%
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Comments: {data.comments}</span>
              <span>Posts: {data.posts}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialSentiment; 