import OpenAI from "openai";

import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = "Rewrite the text in upto 20 words concise - Experience ultra-realistic text-to-image generation with Freepik, offering real-time editing and infinite scrolling features that enhance creative image development for designers worldwide."

const completion = openai.chat.completions.create({
  model: "gpt-3.5-turb",
  store: true,
  messages: [
    {"role": "user", "content": prompt},
  ],
});

completion.then((result) => console.log(result.choices[0].message));