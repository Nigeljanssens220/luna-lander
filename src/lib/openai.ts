import OpenAI from 'openai'
import type { AssistantCreateParams, AssistantTool } from 'openai/resources/beta/assistants/assistants.mjs'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

const rocketsTool: AssistantTool = {
  type: 'function',
  function: {
    name: 'getRockets',
    description: 'Get information about SpaceX rockets',
  },
}

const starlinkTool: AssistantTool = {
  type: 'function',
  function: {
    name: 'getStarlink',
    description: 'Get information about starlink',
  },
}

const dragonsTool: AssistantTool = {
  type: 'function',
  function: {
    name: 'getDragons',
    description: 'Get information about SpaceX dragons.',
  },
}

export const ASSISTANT_CONFIG: AssistantCreateParams = {
  name: 'Luna',
  instructions:
    'You are a helpful assistant. If you are asked about a rocket, starlink, or dragons, provide information \
    about them using the getRockets function for rockets, getStartlink for starlink or getDragons for dragons. \
    Then answer the user their question with the data exclusively. If you are asked about something else, ask \
    the user to clarify.',
  model: 'gpt-3.5-turbo',
  tools: [rocketsTool, starlinkTool, dragonsTool],
}
