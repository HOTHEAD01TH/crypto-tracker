import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import NewsFeed from '../components/NewsFeed';

function NewsAnalytics() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="p-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">News & Analytics</h1>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/dashboard" 
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              ← Back to Dashboard
            </Link>
            <div className="border-l pl-4 dark:border-gray-600">
              <ThemeToggle />
            </div>
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