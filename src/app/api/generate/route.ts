import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/openai";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const result = await generateAIResponse(prompt);
  return NextResponse.json({ result });
}
