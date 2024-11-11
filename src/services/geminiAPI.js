const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getInsights(symbol) {
  try {
    const prompt = `Provide a brief market analysis and insight for ${symbol} cryptocurrency. Include current market sentiment and potential factors affecting its price.`;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      }
    );
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return "Unable to fetch insights at this time.";
  }
}
