import { ASSISTANT_CONFIG, openai } from '@/lib/openai'

export const createAssistant = async () => {
  return await openai.beta.assistants.create(ASSISTANT_CONFIG)
}

export const getAssistants = async () => {
  return await openai.beta.assistants.list()
}

export const getAssistant = async (id: string) => {
  return await openai.beta.assistants.retrieve(id)
}

export const createThread = async () => {
  return await openai.beta.threads.create()
}

export const createMessage = async ({
  threadId,
  message,
  role = 'user',
}: {
  threadId: string
  message: string
  role?: 'user' | 'assistant'
}) => {
  return await openai.beta.threads.messages.create(threadId, {
    role,
    content: message,
  })
}

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

// Tools used by the assistant
export const getRockets = async () => {
  const res = await fetch('https://api.spacexdata.com/v4/rockets')
  const data = await res.json()

  return JSON.stringify(data)
}

export const getStarlink = async () => {
  const res = await fetch('https://api.spacexdata.com/v4/starlink')
  const data = await res.json()

  return JSON.stringify(data)
}

export const getDragons = async () => {
  const res = await fetch('https://api.spacexdata.com/v4/dragons')
  const data = await res.json()

  return JSON.stringify(data)
}
