'use client'

import { Message, experimental_useAssistant as useAssistant } from 'ai/react'
import { CornerDownLeft } from 'lucide-react'
import { ChatBubble } from './ChatBubble'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

export const Chat = () => {
  const { status, messages, input, submitMessage, handleInputChange } = useAssistant({ api: '/api/assistant' })

  return (
    <div className="relative mt-16 flex flex-col items-center gap-6 lg:col-span-2">
      <div className="relative flex h-full max-h-[70svh] w-full flex-1 flex-col overflow-auto p-10 lg:col-span-2">
        {messages.map((message: Message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {status === 'in_progress' && (
          <div className="mb-8 h-8 w-full max-w-md animate-pulse rounded-lg bg-gray-300 p-2 dark:bg-gray-600" />
        )}
      </div>
      <form
        onSubmit={submitMessage}
        className="container fixed bottom-6 z-10 mx-auto flex w-full max-w-screen-md flex-col gap-2 overflow-hidden"
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          onChange={handleInputChange}
          value={input}
          disabled={status !== 'awaiting_message'}
          placeholder="Ask about SpaceX rockets, dragons or starlink!"
          className="max-h-12 resize-none border p-3 shadow-none outline-none"
        />
        <div className="flex items-center pt-0">
          <Button type="submit" size="sm" className="ml-auto" disabled={status !== 'awaiting_message'}>
            <span className="hidden md:block">Send Message</span>
            <CornerDownLeft className="ml-2 size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  )
}
