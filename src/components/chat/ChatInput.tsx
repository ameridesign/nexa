import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Mic } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`
    }
  }, [input])

  const handleSubmit = () => {
    if (!input.trim() || disabled) return
    onSend(input.trim())
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="border-t border-border-subtle bg-black/80 backdrop-blur-sm p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-2 bg-surface-input border border-border-default rounded-2xl px-4 py-3 focus-within:border-[rgba(255,255,255,0.2)] transition-colors">
          <button className="text-text-muted hover:text-text-tertiary transition-colors pb-0.5">
            <Paperclip size={18} />
          </button>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Audi AI..."
            disabled={disabled}
            rows={1}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-text-dim outline-none resize-none max-h-40"
          />
          <button className="text-text-muted hover:text-text-tertiary transition-colors pb-0.5">
            <Mic size={18} />
          </button>
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || disabled}
            className={`p-1.5 rounded-lg transition-colors ${
              input.trim() && !disabled
                ? 'bg-btn-active hover:bg-[#D4123A] text-white'
                : 'bg-surface-card text-text-dim'
            }`}
          >
            <Send size={14} />
          </button>
        </div>
        <p className="text-center text-[10px] text-text-dim mt-2">
          Audi AI can make mistakes. Please verify important information.
        </p>
      </div>
    </div>
  )
}
