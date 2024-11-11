const API_BASE_URL = 'https://min-api.cryptocompare.com/data';
const API_KEY = import.meta.env.VITE_CRYPTOCOMPARE_API_KEY;

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
    const response = await fetch(
      `${API_BASE_URL}/v2/histoday?fsym=${symbol}&tsym=USD&limit=${days}&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.Data.Data.map(item => [item.time * 1000, item.close]);
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return [];
  }
}
