export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface Conversation {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

export interface AICapability {
  id: string
  title: string
  description: string
  icon: string
  status: 'active' | 'coming-soon'
}
