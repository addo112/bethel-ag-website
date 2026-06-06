import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback if no API key is provided
    if (!apiKey || apiKey === "your-gemini-api-key-here") {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({ 
        answer: "I am running in demo mode because the Gemini API key has not been configured yet. Once the administrator adds the API key to the environment variables, I will be able to answer your questions accurately from a biblical perspective!" 
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `You are an expert Bible teacher and theologian from Bethel Assembly of God Church. 
    Answer the following question from a biblical perspective, quoting relevant scriptures where applicable. 
    Keep your answer concise, encouraging, and focused on helping the believer grow in Christ.
    
    Question: ${query}`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return NextResponse.json({ answer: response.text });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
