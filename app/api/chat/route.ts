import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'No messages provided' },
        { status: 400 }
      );
    }

    // ✅ Use only the latest message
    const latestMessage = messages[messages.length - 1];

    // ✅ System instruction (CRITICAL FIX)
    const systemPrompt = `
You are SkillBot, an AI mentor.

Rules:
- Give clear, very short, helpful, and complete answers
- Avoid one-word replies
- Be very concise but informative and if possible use as less words as possible
- Help with learning, coding, and problem solving
`;

    // ✅ Build Gemini-compatible format
    const contents = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
      {
        role: 'user',
        parts: [{ text: latestMessage.text }],
      },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contents }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', errorData);

      // ✅ Handle rate limit specifically
      if (response.status === 429) {
        const retryAfter = errorData?.error?.message?.match(/retry in (\d+\.\d+)s/)?.[1] || '60';
        return NextResponse.json({
          error: 'RATE_LIMIT',
          message: `Out of credits. Please retry after ${retryAfter} seconds.`,
          retryAfter: parseFloat(retryAfter)
        }, { status: 429 });
      }

      return NextResponse.json(
        { error: 'Gemini API failed' },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log("Gemini Data:", JSON.stringify(data, null, 2));
    console.log("-------------------");

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        .join('') || 'Sorry, I could not generate a response.';

    console.log("Gemini Response:", reply);

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('API route error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}