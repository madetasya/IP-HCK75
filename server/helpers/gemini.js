// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const gemai = async () => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINIAI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Give me the most popular proms and cons natural disaster in the world.
    response must be a json format
    create without \`\`\`json and \`\`\``;
    try {
        const result = await model.generateContent(prompt);
        return(result.response.text());
        
    } catch (error) {
        console.log(error,"error");
        
    }
    
}

module.exports = gemai