const { GeminiAI } = require("@google/generative-ai");

const getDisasterSlogan = async () => {
  const gemini = new GeminiAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  try {
    const response = await gemini.generateText({
      model: "gemini-1.5-flash",
      prompt:
        "Berikan HANYA SATU slogan TANPA PENJELASAN tentang bencana alam yang sering terjadi minggu ini",
      temperature: 1,
      maxOutputTokens: 64,
      topP: 0.95,
    });

    return response?.text || "Tidak ada bencana yang dilaporkan saat ini.";
  } catch (error) {
    console.error("Error fetching slogan from GeminiAI:", error);
    return "Terjadi kesalahan saat mengambil data dari GeminiAI.";
  }
};

module.exports = getDisasterSlogan;
