const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are the "VoteSmart India AI" assistant. 
Your goal is to provide accurate, neutral, and helpful information about Indian elections.
STRICT RULES:
1. NEVER show political bias or support any political party.
2. If asked about party comparisons, focus on data-driven facts (e.g., manifestos) or redirect to official ECI resources.
3. Use simple, accessible language.
4. If unsure or if the information is speculative, say "This information needs official verification."
5. Support both Hindi and English. Detect and respond in the user's language.
6. For the "Fake News Detector", analyze political claims based on available facts and assign a likelihood: "Likely True", "Misleading", or "Needs Verification". NEVER use the word "False" directly to avoid sounding aggressive; use "Misleading" or "Not supported by evidence".
`;

async function getChatResponse(userMessage, history = []) {
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
  
  // Filter history to ensure alternating user/model roles starting with user
  let formattedHistory = [];
  
  // Add system instruction as first user message if not already present
  formattedHistory.push({ role: "user", parts: [{ text: SYSTEM_PROMPT }] });
  formattedHistory.push({ role: "model", parts: [{ text: "Understood. I will provide neutral and safe election assistance." }] });

  // Add remaining history, ensuring alternating roles
  let lastRole = "model";
  for (const msg of history) {
    if (msg.role !== lastRole) {
      formattedHistory.push(msg);
      lastRole = msg.role;
    }
  }

  const chat = model.startChat({
    history: formattedHistory,
  });

  const result = await chat.sendMessage(userMessage);
  const response = await result.response;
  return response.text();
}

async function verifyClaim(claim) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    Analyze the following political claim for authenticity:
    Claim: "${claim}"
    
    Response format (JSON only):
    {
      "likelihood": "Likely True" | "Misleading" | "Needs Verification",
      "confidence": number (0-100),
      "explanation": "Brief neutral explanation"
    }
    
    Remember to remain neutral and avoid direct "False" labels.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Extract JSON from response (Gemini sometimes wraps it in markdown)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : { likelihood: "Needs Verification", confidence: 0, explanation: "Could not analyze claim." };
}

module.exports = { getChatResponse, verifyClaim };
