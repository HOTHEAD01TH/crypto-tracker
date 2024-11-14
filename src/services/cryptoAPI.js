const API_BASE_URL = 'https://min-api.cryptocompare.com/data';
const API_KEY = import.meta.env.VITE_CRYPTOCOMPARE_API_KEY;

// const API_BASE_URL = 'https://min-api.cryptocompare.com/data';
// const API_KEY = import.meta.env.VITE_CRYPTOCOMPARE_API_KEY;

export async function getMarketData(symbol) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.RAW[symbol].USD;
  } catch (error) {
    console.error("Error fetching market data:", error);
    return null;
  }
}

// Keep existing functions

export async function getLivePrice(symbol) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.USD;
  } catch (error) {
    console.error("Error fetching live price:", error);
    return null;
  }
}

export async function getHistoricalData(symbol, days) {
  try {
    let endpoint;
    let limit;
    
    if (days <= 1/24) {
      // Hourly data
      endpoint = 'histominute';
      limit = 60;
    } else if (days <= 1) {
      // Daily data by hour
      endpoint = 'histohour';
      limit = 24;
    } else if (days <= 7) {
      // Weekly data by hour
      endpoint = 'histohour';
      limit = days * 24;
    } else if (days <= 30) {
      // Monthly data by day
      endpoint = 'histoday';
      limit = 30;
    } else {
      // Yearly data by day
      endpoint = 'histoday';
      limit = 365;
    }

    const response = await fetch(
      `${API_BASE_URL}/v2/${endpoint}?fsym=${symbol}&tsym=USD&limit=${limit}&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.Data.Data.map(item => [item.time * 1000, item.close]);
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return [];
  }
}

export async function getNews() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/v2/news/?lang=EN&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.Data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export async function getSocialSentiment() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/social/coin/latest?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.Data;
  } catch (error) {
    console.error("Error fetching sentiment:", error);
    return {};
  }
}

export async function getLatestTransactions() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/blockchain/latest?api_key=${API_KEY}`
    );
    const data = await response.json();
    return Array.isArray(data.Data) ? data.Data : [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}
