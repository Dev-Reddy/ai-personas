import generateChatResponse from "@/actions/chatResponse";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { messages, persona } = await req.json();

  // Process messages and generate a response
  const response = await generateChatResponse(messages, persona.id);

  return NextResponse.json(
    {
      success: true,
      data: response,
    },
    {
      status: 200,
    }
  );
};
