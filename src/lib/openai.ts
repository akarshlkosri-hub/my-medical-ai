import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAIResponse(prompt: string) {
  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful medical AI assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 800,
  });

  return response.choices[0].message?.content || "No response";
}
