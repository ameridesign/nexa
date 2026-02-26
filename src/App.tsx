import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './components/dashboard/Dashboard'
import ChatView from './components/chat/ChatView'
import SettingsView from './components/dashboard/SettingsView'
import { useChat } from './hooks/useChat'

function App() {
  const {
    conversations,
    activeConversationId,
    messages,
    isLoading,
    createNewChat,
    sendMessage,
    selectConversation,
  } = useChat()

  const conversationList = conversations.map((c) => ({ id: c.id, title: c.title }))

  return (
    <BrowserRouter>
      <Layout
        onNewChat={createNewChat}
        conversations={conversationList}
        activeConversationId={activeConversationId}
        onSelectConversation={selectConversation}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard onNewChat={createNewChat} totalChats={conversations.length} />
            }
          />
          <Route
            path="/chat"
            element={
              <ChatView
                messages={messages}
                onSendMessage={sendMessage}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
