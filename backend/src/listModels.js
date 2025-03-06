const genAI = require("@google/generative-ai");
require("dotenv").config();

const googleAI = new genAI.GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    const models = await googleAI.listModels();
    console.log(models);
}

listModels();
