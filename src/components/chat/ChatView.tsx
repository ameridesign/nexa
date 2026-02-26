import { useRef, useEffect } from 'react'
import { Bot } from 'lucide-react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import type { ChatMessage as ChatMessageType } from '../../types'

interface ChatViewProps {
  messages: ChatMessageType[]
  onSendMessage: (content: string) => void
  isLoading: boolean
}

export default function ChatView({ messages, onSendMessage, isLoading }: ChatViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-col h-full bg-audi-dark">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-audi-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-audi-card border border-audi-border flex items-center justify-center">
            <Bot size={16} className="text-audi-gray-300" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-white">Audi AI Assistant</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] text-audi-gray-500">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-audi-card border border-audi-border text-[10px] text-audi-gray-400 uppercase tracking-wider">
            GPT-4 Turbo
          </span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={onSendMessage} disabled={isLoading} />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-audi-card border border-audi-border flex items-center justify-center mb-6">
        <Bot size={28} className="text-audi-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">How can I help you today?</h3>
      <p className="text-sm text-audi-gray-500 max-w-md">
        Ask me anything about Audi vehicles, technology, engineering, or let me help you with
        analysis and creative tasks.
      </p>
      <div className="grid grid-cols-2 gap-3 mt-8 max-w-lg">
        {[
          'Tell me about the Audi e-tron GT performance specs',
          'Analyze the latest EV market trends',
          'Help me draft a technical report',
          'Compare quattro vs standard drivetrain',
        ].map((prompt) => (
          <button
            key={prompt}
            className="text-left p-3 rounded-xl bg-audi-card border border-audi-border text-xs text-audi-gray-300 hover:bg-audi-card-hover hover:border-audi-gray-700 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-audi-card border border-audi-border flex items-center justify-center shrink-0">
        <Bot size={14} className="text-audi-gray-300" />
      </div>
      <div className="bg-audi-card border border-audi-border rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-audi-gray-500 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-audi-gray-500 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-audi-gray-500 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}
