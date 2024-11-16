const API_KEY = import.meta.env.VITE_CRYPTOCOMPARE_API_KEY;

export const getMarketData = async (symbol) => {
  try {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
};