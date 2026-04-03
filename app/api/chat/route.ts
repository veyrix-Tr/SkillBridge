import { NextResponse } from 'next/server';
import { skillBotPrompt } from '@/lib/prompt';

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

    // Build conversation history for Gemini
    // First message is system prompt as user, then alternate user/model
    const contents: { role: string; parts: { text: string }[] }[] = [
      {
        role: 'user',
        parts: [{ text: skillBotPrompt }],
      },
      {
        role: 'model',
        parts: [{ text: "Got it! I'm SkillBot, ready to help students explore careers and answer their questions." }],
      },
    ];

    // Add conversation history (skip the first AI greeting message)
    const conversationMessages = messages.slice(0, -1); // all except latest
    const latestMessage = messages[messages.length - 1];

    for (const msg of conversationMessages) {
      // Skip the default greeting
      if (msg.text === "Hello! I'm your AI assistant. How can I help you today?") continue;

      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      });
    }

    // Add the latest user message
    contents.push({
      role: 'user',
      parts: [{ text: latestMessage.text }],
    });

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

      if (response.status === 429) {
        const retryAfter = errorData?.error?.message?.match(/retry in (\d+\.\d+)s/)?.[1] || '60';
        return NextResponse.json({
          error: 'RATE_LIMIT',
          message: `Too many requests. Please retry after ${Math.ceil(parseFloat(retryAfter))} seconds.`,
          retryAfter: parseFloat(retryAfter),
        }, { status: 429 });
      }

      return NextResponse.json(
        { error: 'Gemini API failed' },
        { status: 500 }
      );
    }

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text)
        .join('') || 'Sorry, I could not generate a response.';

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}