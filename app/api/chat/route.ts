import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai"
import { ASSISTANT_SYSTEM, buildKnowledgeBase } from "@/lib/knowledge"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: "openai/gpt-4.1-mini",
    system: ASSISTANT_SYSTEM + buildKnowledgeBase(),
    messages: await convertToModelMessages(messages),
    temperature: 0.3,
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  })
}
