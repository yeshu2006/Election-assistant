import { GEMINI_API_KEY, GEMINI_CHAT_MODEL, GEMINI_VERIFY_MODEL } from '../config';

const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

const SYSTEM_PROMPT = `
You are the "VoteSmart India AI" assistant.
Your goal is to provide accurate, neutral, and helpful information about Indian elections.
STRICT RULES:
1. Never show political bias or support any political party.
2. If asked about party comparisons, focus on official, factual, data-driven information.
3. Use simple, accessible language.
4. If unsure or if the information is speculative, say "This information needs official verification."
5. Support Hindi and English. Detect and respond in the user's language.
6. For political claim analysis, use: "Likely True", "Misleading", or "Needs Verification". Avoid aggressive wording.
`;

const toGeminiRole = (role) => (role === 'user' ? 'user' : 'model');

const normalizeHistory = (history = []) =>
  history
    .map((message) => {
      const text = message.text || message.content || message.parts?.[0]?.text || '';
      if (!text) return null;
      return {
        role: toGeminiRole(message.role),
        parts: [{ text }],
      };
    })
    .filter(Boolean)
    .slice(-8);

async function generateContent(model, contents, generationConfig = {}) {
  const response = await fetch(`${GEMINI_BASE_URL}/${model}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': GEMINI_API_KEY,
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
      generationConfig: {
        temperature: 0.4,
        topP: 0.9,
        ...generationConfig,
      },
    }),
  });

  if (!response.ok) {
    let message = 'Gemini request failed';
    try {
      const data = await response.json();
      message = data.error?.message || message;
    } catch {
      message = await response.text();
    }
    throw new Error(message);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.map((part) => part.text).join('').trim() || '';
}

const languageInstruction = (language) => {
  if (language === 'hi') {
    return 'Respond only in Hindi using clear, simple Devanagari Hindi, unless the user explicitly asks for another language.';
  }

  if (language === 'en') {
    return 'Respond only in English, unless the user explicitly asks for another language.';
  }

  return 'Detect the user language and respond in the same language.';
};

export async function getChatResponse(message, history = [], language = 'auto') {
  const contents = [
    ...normalizeHistory(history),
    { role: 'user', parts: [{ text: `${languageInstruction(language)}\n\nUser question: ${message}` }] },
  ];

  const text = await generateContent(GEMINI_CHAT_MODEL, contents);
  return text || 'This information needs official verification.';
}

export async function verifyClaim(claim, language = 'auto') {
  const prompt = `
Analyze the following political claim for authenticity:
Claim: "${claim}"
Language instruction: ${languageInstruction(language)}

Return JSON only:
{
  "likelihood": "Likely True" | "Misleading" | "Needs Verification",
  "confidence": number,
  "explanation": "Brief neutral explanation"
}
`;

  const text = await generateContent(
    GEMINI_VERIFY_MODEL,
    [{ role: 'user', parts: [{ text: prompt }] }],
    { temperature: 0.2, responseMimeType: 'application/json' },
  );

  try {
    const json = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] || text);
    return {
      likelihood: json.likelihood || 'Needs Verification',
      confidence: Number(json.confidence) || 0,
      explanation: json.explanation || 'This claim needs official verification.',
    };
  } catch {
    return {
      likelihood: 'Needs Verification',
      confidence: 0,
      explanation: 'Could not analyze the claim. Please verify with official ECI or trusted fact-check sources.',
    };
  }
}
