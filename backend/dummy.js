const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

async function callGemini() {
  try {
    const response = await axios.post(apiUrl, {
      contents: [
        {
          role: "user",
          parts: [{ text: "Hello, who are you?" }],
        },
      ],
    });
    console.log(response.data);
  } catch (error) {
    console.error(
      "Error from Gemini API:",
      error.response?.data || error.message
    );
  }
}

callGemini(); // call the function to execute the API request
