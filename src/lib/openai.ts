import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export const createAssistant = async ({ name, instructions }: { name: string; instructions: string }) => {
  const assistant = await openai.beta.assistants.create({
    name: name,
    instructions: instructions,
    tools: [{ type: 'code_interpreter' }],
    model: 'gpt-4-turbo-preview',
  })

  return assistant
}

export const createThread = async () => {
  const thread = await openai.beta.threads.create()
  return thread
}

//create message
export const createMessage = async ({
  threadId,
  message,
  role = 'user',
}: {
  threadId: string
  message: string
  role?: 'user' | 'assistant'
}) => {
  const messages = await openai.beta.threads.messages.create(threadId, {
    role,
    content: message,
  })
  return messages
}

//run assistants
export const runStream = ({
  assistantId,
  threadId,
  instructions,
}: {
  assistantId: string
  threadId: string
  instructions?: string
}) => {
  return openai.beta.threads.runs.stream(threadId, {
    instructions,
    assistant_id: assistantId,
  })
}
