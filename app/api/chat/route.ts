/** @format */

// import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { convertToCoreMessages, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// const openai = createOpenAI({
//   compatibility: "strict",
//   apiKey: process.env.OPENAI_API_KEY,
// });

const openai = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log("messages", messages);

  if (messages.length) {
    const coreMessages = convertToCoreMessages(messages);
    // return new Response(JSON.stringify({ messages }));

    const result = streamText({
      model: openai("gemini-1.5-pro"),
      messages: coreMessages,
    });

    return result.toDataStreamResponse();
  }
}
