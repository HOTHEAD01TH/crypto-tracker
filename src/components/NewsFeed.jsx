import React, { useState, useEffect } from 'react';
import { getNews } from '../services/cryptoAPI';

function NewsFeed() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const newsData = await getNews();
      setNews(newsData);
      setIsLoading(false);
    }
    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Latest Crypto News</h2>
      {news.map((item) => (
        <article 
          key={item.id} 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <div className="flex flex-col sm:flex-row">
              <img 
                src={item.imageurl} 
                alt={item.title} 
                className="w-full sm:w-48 h-48 sm:h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {item.body.substring(0, 150)}...
                </p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                  <span>{new Date(item.published_on * 1000).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{item.source_info.name}</span>
                </div>
              </div>
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}

export default NewsFeed; 