// pages/api/claude.js
// Uses Groq's API — fast, free tier available, OpenAI-compatible format.
// Get your free key at: https://console.groq.com

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY not set in environment variables" });
  }

  try {
    const { prompt, system } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1500,
        temperature: 0.8,
        messages: [
          {
            role: "system",
            content: system || "You are an elite social media strategist and creative director for AI influencers. Your output is sharp, trend-aware, and platform-optimized.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "Error generating content.";
    res.status(200).json({ text });

  } catch (err) {
    console.error("Groq API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

/*
 AVAILABLE GROQ MODELS (swap into "model" above):
 -------------------------------------------------
 "llama-3.3-70b-versatile"   <- best quality, still very fast (recommended)
 "llama-3.1-8b-instant"      <- fastest, great for simple content
 "llama3-70b-8192"           <- solid all-rounder
 "mixtral-8x7b-32768"        <- great for long-form content (32K context)
 "gemma2-9b-it"              <- lightweight, good for captions
 -------------------------------------------------
 Groq free tier: ~14,400 requests/day on most models
 Docs: https://console.groq.com/docs/models
*/
