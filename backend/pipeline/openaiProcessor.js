import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function rewriteText(text) {
  const prompt = `Rewrite the following text in exactly 20 words:\n\n${text}`;
  
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI error:", error.message);
    return text;
  }
}

export { rewriteText };
