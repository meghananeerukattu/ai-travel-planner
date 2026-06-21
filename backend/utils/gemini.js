const { GoogleGenAI } = require("@google/genai");
console.log("API KEY EXISTS:", !!process.env.GEMINI_API_KEY);
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


const generateTravelPlan = async (
  destination,
  durationDays,
  budgetTier,
  interests
) => {
 const prompt = `
Generate a travel plan.

Destination: ${destination}
Days: ${durationDays}
Budget: ${budgetTier}
Interests: ${interests.join(", ")}

Return ONLY valid JSON in exactly this format:

{
  "itinerary": [
    {
      "day": 1,
      "activities": [
        "Activity 1",
        "Activity 2"
      ]
    }
  ],
  "hotels": [
    {
      "name": "Hotel Name"
    }
  ],
  "estimatedBudget": {
    "flights": 500,
    "accommodation": 400,
    "food": 200,
    "activities": 150,
    "total": 1250
  },
  "packingList": [
    "Passport",
    "Power Bank",
    "Comfortable Shoes"
  ]
}

Do not include markdown.
Do not include explanations.
Return JSON only.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

const cleanedText = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return JSON.parse(cleanedText);
};


module.exports = generateTravelPlan;