import React, { useState, useEffect } from 'react';
import { getLatestTransactions } from '../services/cryptoAPI';

function BlockchainTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setIsLoading(true);
        setError(null);
        const txData = await getLatestTransactions();
        setTransactions(Array.isArray(txData) ? txData : []);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to load transactions');
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Latest Transactions</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Latest Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No transactions available</p>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.hash || Math.random()} className="text-sm border-b dark:border-gray-700 pb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium truncate w-24">
                  {tx.hash ? tx.hash.substring(0, 8) + '...' : 'Unknown'}
                </span>
                <span className="text-gray-500">
                  {tx.value ? `${tx.value} BTC` : '0 BTC'}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Block: {tx.block || 'Unknown'}</span>
                <span>
                  {tx.time ? new Date(tx.time * 1000).toLocaleTimeString() : 'Unknown time'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlockchainTransactions; 
