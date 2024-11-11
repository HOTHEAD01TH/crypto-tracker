import React, { useEffect, useState } from 'react';
import { getInsights } from '../services/geminiAPI';

function InsightCard({ symbol }) {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    async function fetchInsights() {
      const data = await getInsights(symbol);
      setInsights(data);
    }
    fetchInsights();
  }, [symbol]);

  return (
    <div className="p-4 border rounded shadow-md bg-blue-50 dark:bg-blue-900">
      <h3 className="text-lg font-semibold capitalize">{symbol} Insights</h3>
      <p>{insights ? insights : 'Loading insights...'}</p>
    </div>
  );
}

export default InsightCard;
