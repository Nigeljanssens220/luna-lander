import type { Message } from 'ai/react'

export const ChatBubble = ({ message }: { message: Message }) => {
  return (
    <div className="grid grid-cols-6 gap-2">
      <strong className="text-sm">{`${message.role}: `}</strong>
      <p key={message.id} className="col-span-5 whitespace-pre-wrap text-sm">
        {message.role !== 'data' && message.content}
        <br />
        <br />
      </p>
    </div>
  )
}
