import { useState, useCallback } from 'react'
import type { ChatMessage, Conversation } from '../types'

const DEMO_RESPONSES: Record<string, string> = {
  default:
    "I'm the Audi AI Assistant, ready to help you with engineering analysis, technical documentation, market research, and more. How can I assist you today?",
  etron:
    "The Audi e-tron GT delivers exceptional performance with its dual electric motors producing up to 637 hp in RS trim. It accelerates from 0-100 km/h in just 3.3 seconds and features an 800V architecture for rapid charging — reaching 80% in approximately 23 minutes at a 270 kW station. The quattro all-wheel drive system ensures optimal traction in all conditions.",
  quattro:
    "Audi's quattro all-wheel drive system has been a cornerstone of the brand since 1980. The latest generation uses an electronic torque vectoring system that can distribute power between front and rear axles in milliseconds. Compared to standard front-wheel drive, quattro provides significantly better traction, handling stability, and acceleration performance — especially in adverse conditions.",
  market:
    "The global EV market continues strong growth with key trends: battery costs have decreased 13% year-over-year, charging infrastructure expanded by 40% globally, and premium EV segment (where Audi competes) grew 28%. Audi's market share in the premium EV segment stands at approximately 8.5%, with the Q4 e-tron and e-tron GT leading in their respective segments.",
}

function getResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes('e-tron') || lower.includes('etron') || lower.includes('performance')) {
    return DEMO_RESPONSES.etron
  }
  if (lower.includes('quattro') || lower.includes('drivetrain') || lower.includes('awd')) {
    return DEMO_RESPONSES.quattro
  }
  if (lower.includes('market') || lower.includes('trend') || lower.includes('ev')) {
    return DEMO_RESPONSES.market
  }
  return DEMO_RESPONSES.default
}

function generateId() {
  return Math.random().toString(36).substring(2, 11)
}

function generateTitle(message: string): string {
  return message.length > 40 ? message.substring(0, 40) + '...' : message
}

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const activeConversation = conversations.find((c) => c.id === activeConversationId)
  const messages = activeConversation?.messages ?? []

  const createNewChat = useCallback(() => {
    const id = generateId()
    const newConv: Conversation = {
      id,
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setConversations((prev) => [newConv, ...prev])
    setActiveConversationId(id)
    return id
  }, [])

  const sendMessage = useCallback(
    (content: string) => {
      let convId = activeConversationId

      if (!convId) {
        convId = createNewChat()
      }

      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content,
        timestamp: new Date(),
      }

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id !== convId) return conv
          const isFirst = conv.messages.length === 0
          return {
            ...conv,
            title: isFirst ? generateTitle(content) : conv.title,
            messages: [...conv.messages, userMessage],
            updatedAt: new Date(),
          }
        })
      )

      setIsLoading(true)

      // Simulate AI response
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content: getResponse(content),
          timestamp: new Date(),
        }

        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id !== convId) return conv
            return {
              ...conv,
              messages: [...conv.messages, aiMessage],
              updatedAt: new Date(),
            }
          })
        )

        setIsLoading(false)
      }, 1000 + Math.random() * 1500)
    },
    [activeConversationId, createNewChat]
  )

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id)
  }, [])

  return {
    conversations,
    activeConversationId,
    messages,
    isLoading,
    createNewChat,
    sendMessage,
    selectConversation,
  }
}
