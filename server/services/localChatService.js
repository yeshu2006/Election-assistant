// Local knowledge base for chatbot - works without external APIs
const ELECTION_KB = {
  "how do i vote": `To vote in India:
1. Check your name in the voter list
2. Go to your assigned polling booth on voting day
3. Carry a valid ID (Aadhaar, PAN, Passport, etc.)
4. Mark your choice on the EVM
5. Your vote is confirmed by VVPAT receipt

Voting hours are typically 7 AM to 6 PM. You can also vote earlier if you're 60+ years old.`,

  "what id do i need": `Valid IDs for voting in India:
• Aadhaar Card
• PAN Card
• Passport
• Voter ID Card
• Driver's License
• Government ID with photo
• Armed Forces ID
• Pension Book

Any of these documents are acceptable. You must present it at your polling booth.`,

  "where is my booth": `To find your polling booth:
1. Visit the Election Commission website
2. Enter your voter ID or name
3. Your booth location will be displayed
4. You can also check on our 'My Area' page
5. Contact your local Election Commission office

Your booth is usually assigned in your locality or ward.`,

  "what is vvpat": `VVPAT (Voter Verifiable Paper Audit Trail):
• It's a paper trail system for voting
• After marking on EVM, VVPAT prints a receipt
• Receipt shows your voting choice
• You can verify it matches your vote
• Receipt goes in a box (not with you)
• This ensures voting transparency and security
• Protects against electronic manipulation

VVPAT is an important security measure in Indian elections.`,

  "how does evm work": `EVM (Electronic Voting Machine):
1. Machine displays all candidates and parties
2. You press the button next to your choice
3. Confirmation light illuminates
4. Vote is recorded electronically
5. VVPAT prints your vote on paper
6. Your vote is stored securely

The EVM is tamper-proof and independently verified before and after voting.`,

  "who can vote": `To be eligible to vote in India:
• Indian citizen
• 18 years or older
• Registered in voter list
• Not disqualified by law
• Usually must have resided 3+ months in constituency

You cannot vote if:
• You have criminal convictions
• You are of unsound mind
• You have been disqualified by Election Commission`,

  "what are voter rights": `Your rights as a voter:
1. Right to vote freely without pressure
2. Right to secret ballot (privacy)
3. Right to receive voting assistance
4. Right to question Election officials
5. Right to check voter list
6. Right to file complaints
7. Right to know about candidates
8. Right to get duplicate voter ID

Report any violations to the Election Commission immediately.`,

  "what is lok sabha": `Lok Sabha (Lower House of Parliament):
• 543 seats total
• Members elected for 5 years
• Directly elected by voters
• National legislative body
• Lower house of Indian Parliament
• Requires simple majority to form government
• Prime Minister usually from Lok Sabha
• Every state has multiple seats based on population`,

  "what is state assembly": `State Assembly (Legislative Assembly):
• Elected at state level
• Members called MLAs (Members of Legislative Assembly)
• Number varies by state (100-400+ seats)
• Elected for 5 years
• Forms state government
• Chief Minister leads state
• Passes state-level laws
• Different from Lok Sabha elections`,

  "what documents do i need": `Documents to bring for voting:
1. Valid ID (Aadhaar, PAN, Passport, etc.)
2. Voter ID card (optional but helpful)
3. Come 15 minutes early

You don't need: Birth certificate, bank passbook, or other documents.

Note: First-time voters should check if they're registered.`,

  "how to check voter list": `To check voter list:
1. Visit Election Commission website
2. Go to voter search/registration page
3. Enter your name and state
4. Search your constituency
5. Look for your name in published list
6. You can also check at your local polling booth

If your name is missing, file an application for inclusion immediately.`,

  "when is election": `Election Schedule 2024:
Phase 1-6: April-May 2024
Results: June 4, 2024
State elections vary by state and scheduled periodically.

To know exact dates for your state, check Election Commission website or your local election office.`,

  "what is eci": `Election Commission of India (ECI):
• Independent constitutional authority
• Supervises all elections
• Ensures free and fair elections
• Regulates political parties
• Handles voter registration
• Investigates electoral violations
• Enforces Model Code of Conduct

Contact ECI for election complaints or information.`,

  "can i vote early": `Early Voting:
• Senior citizens (60+) can vote earlier in some states
• People with disabilities can get assistance
• Contact your local polling booth for arrangements
• Apply in advance if possible
• Postal voting available for specific categories

Check with your Election Commission office for exact provisions.`,

  "what is mock vote": `Mock Vote (NOTA - None Of The Above):
• You can choose "None of the Above"
• Shows dissatisfaction with all candidates
• Votes are recorded separately
• Does not affect election results
• Way to exercise your democratic right
• Your voice matters even if you vote NOTA`,

  "default": `I'm your VoteSmart AI assistant! I can help with:
• Voting procedures and dates
• Voter ID and registration
• Polling booth location
• Election information
• Candidate details
• Voter rights and laws

What would you like to know about Indian elections?`
};

// Function to find best matching question
function findBestMatch(query) {
  const lowerQuery = query.toLowerCase().trim();
  
  // Exact matches first
  if (ELECTION_KB[lowerQuery]) {
    return ELECTION_KB[lowerQuery];
  }
  
  // Keyword matching
  for (const [key, answer] of Object.entries(ELECTION_KB)) {
    if (key === "default") continue;
    const keywords = key.split(" ");
    const matches = keywords.filter(kw => lowerQuery.includes(kw));
    if (matches.length > 0) {
      return answer;
    }
  }
  
  // Return default if no match
  return ELECTION_KB.default;
}

async function getLocalChatResponse(userMessage, history = []) {
  // Simulate slight delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
  
  const answer = findBestMatch(userMessage);
  return answer;
}

async function getLocalVerifyClaim(claim) {
  await new Promise(resolve => setTimeout(resolve, 600));
  const lowerClaim = claim.toLowerCase();
  
  if (lowerClaim.includes('cancel') || lowerClaim.includes('postpone')) {
    return {
      likelihood: "Misleading",
      confidence: 85,
      explanation: "The Election Commission rarely cancels voting. Official announcements are always made on eci.gov.in. Please verify this claim."
    };
  }
  if (lowerClaim.includes('evm') && (lowerClaim.includes('hack') || lowerClaim.includes('tamper'))) {
    return {
      likelihood: "Misleading",
      confidence: 90,
      explanation: "EVMs used by ECI are standalone machines with strict administrative and security protocols, making them highly tamper-resistant."
    };
  }
  
  return {
    likelihood: "Needs Verification",
    confidence: 50,
    explanation: "This is an offline fallback response. To get deep AI analysis, please configure a valid Gemini API key. In the meantime, verify this claim on official ECI sources."
  };
}

module.exports = {
  getLocalChatResponse,
  getLocalVerifyClaim,
  findBestMatch
};
