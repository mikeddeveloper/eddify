import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY, // hidden on server
});

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { name, moods } = req.body;
  const moodText = moods?.join(", ") || "mixed emotions";

  try {
    const prompt = `Create a short Christian affirmation for ${name} feeling ${moodText}.
Include Bible verse references (just the references) and end with '— eddiffy'.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const affirmation = response.choices[0].message.content;
    res.status(200).json({ affirmation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ affirmation: "Oops, something went wrong." });
  }
}
