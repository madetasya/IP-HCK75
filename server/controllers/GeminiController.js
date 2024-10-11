const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const { Article } = require("../models");

const gemini = async (location) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    // Ambil data bencana dari database
    const disasterData = await Article.findAll();
    const disaster = JSON.stringify(disasterData);

    // Batasi panjang data yang dikirim ke AI jika terlalu besar
    const maxInputLength = 2000; // Batasan karakter yang dikirim
    const limitedDisasterData =
      disaster.length > maxInputLength
        ? disaster.substring(0, maxInputLength)
        : disaster;

    // Prompt yang akan dikirim ke AI
    const prompt = `Here are news articles about natural disasters: ${limitedDisasterData}. 
      Please analyze these articles and combine them with the following data about disasters: ${limitedDisasterData}. 
      Provide key insights and recommendations in JSON format.
      create without \`\`\`json and \`\`\``;

    console.log({ prompt });

    // Panggil model Gemini AI untuk menghasilkan konten
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text(); // Pastikan untuk menunggu hasil teks

    console.log(responseText, "ini response");

    // Parsing hasil dari AI
    try {
      return JSON.parse(responseText.trim());
    } catch (parsingError) {
      console.error("Error parsing JSON response from AI:", parsingError);
      throw parsingError;
    }
  } catch (error) {
    console.error(
      "Error during AI content generation or data fetching:",
      error
    );
    throw error;
  }
};

module.exports = gemini;
