const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getInsights(symbol) {
  try {
    const prompt = `In 2-3 sentences, provide a quick market summary for ${symbol} cryptocurrency.`;
    
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
    
    // Check if the response has the expected structure
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      console.error("API Error:", data.error);
      return "API Error: " + data.error.message;
    } else {
      console.error("Unexpected API response:", data);
      return "Unable to generate insights at this time.";
    }
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return "Unable to fetch insights at this time.";
  }
}
