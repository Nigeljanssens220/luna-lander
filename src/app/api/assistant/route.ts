import { env } from '@/env.mjs'
import { createMessage, createThread, getDragons, getRockets, getStarlink, runStream } from '@/helpers/openai'
import { isAuthenticated } from '@/lib/auth'
import { openai } from '@/lib/openai'
import { experimental_AssistantResponse } from 'ai'

export const runtime = 'edge'

export async function POST(req: Request) {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Parse the request body
  const input: {
    threadId: string | null
    message: string
  } = await req.json()

  // Create a thread if needed
  const threadId = input.threadId ?? (await createThread()).id

  // Add a message to the thread
  const createdMessage = await createMessage({ threadId, message: input.message })

  return experimental_AssistantResponse({ threadId, messageId: createdMessage.id }, async ({ forwardStream }) => {
    // Run the assistant on the thread
    const stream = runStream({ threadId, assistantId: env.ASSISTANT_ID })

    // forward run status would stream message deltas
    let runResult = await forwardStream(stream)

    // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
    while (runResult?.status === 'requires_action' && runResult.required_action?.type === 'submit_tool_outputs') {
      const toolCalls = runResult.required_action.submit_tool_outputs.tool_calls
      const toolOutputs = toolCalls.map(async (toolCall) => {
        switch (toolCall.function.name) {
          case 'getRockets': {
            const rockets = await getRockets()

            return {
              tool_call_id: toolCall.id,
              output: rockets,
            }
          }

          case 'getStarlink': {
            const starlink = await getStarlink()

            return {
              tool_call_id: toolCall.id,
              output: starlink,
            }
          }

          case 'getDragons': {
            const dragons = await getDragons()

            return {
              tool_call_id: toolCall.id,
              output: dragons,
            }
          }

          default:
            throw new Error(`Unknown tool call function: ${toolCall.function.name}`)
        }
      })

      const toolOutsputs = await Promise.all(toolOutputs)

      runResult = await forwardStream(
        openai.beta.threads.runs.submitToolOutputsStream(threadId, runResult.id, {
          tool_outputs: toolOutsputs,
        }),
      )
    }
  })
}
