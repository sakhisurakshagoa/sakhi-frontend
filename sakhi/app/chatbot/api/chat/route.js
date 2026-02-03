import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { messages } = await req.json();

  try {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  });

  return Response.json({
    reply: response.output_text,
  });

} catch (err) {
  if (err.code === "insufficient_quota") {
    return Response.json(
      { error: "quota_exceeded" },
      { status: 429 }
    );
  }

  throw err;
}
}