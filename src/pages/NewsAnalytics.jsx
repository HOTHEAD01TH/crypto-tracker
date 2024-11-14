import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import NewsFeed from '../components/NewsFeed';

function NewsAnalytics() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="p-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">News & Analytics</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link 
              to="/dashboard" 
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="max-w-4xl mx-auto">
          <NewsFeed />
        </div>
      </main>
    </div>
  );
}

export default NewsAnalytics; 