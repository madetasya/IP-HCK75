const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const { Article } = require("../models");

const gemini = async (location) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    // Ambil artikel terkait bencana dari NewsAPI
    const response = await newsapi.v2.everything({
      q: "bencana",
      from: new Date(
        new Date().setDate(new Date().getDate() - 30)
      ).toISOString(),
      to: new Date().toISOString(),
      language: "id",
      sortBy: "relevancy",
    });

    // Batasi dan format artikel untuk dikirim ke AI
    const articles = response.articles.slice(0, 5).map((article) => ({
      title: article.title,
      description:
        article.description.length > 150
          ? article.description.substring(0, 150) + "..."
          : article.description, // Batasi deskripsi menjadi 150 karakter
      url: article.url,
      publishedAt: article.publishedAt,
    }));

    const data = JSON.stringify(articles);
    console.log(data, "=====");

    // Ambil data bencana dari database
    const disasterData = await Article.findAll();
    const disaster = JSON.stringify(disasterData);

    // Prompt yang akan dikirim ke AI
    const prompt = `Here are news articles about natural disasters:${disaster} 
      Please analyze these articles and combine them with the following data about disasters: ${disaster}. 
      Provide key insights and recommendations in JSON format
       create without \`\`\`json and \`\`\``;

    console.log({ prompt });

    // Panggil model Gemini AI untuk menghasilkan konten
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text(); // Pastikan untuk menunggu hasil teks

    console.log(responseText, "ini response");

    // Parsing hasil dari AI
    try {
      return JSON.parse(responseText.trim())
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
