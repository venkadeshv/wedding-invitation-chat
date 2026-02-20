import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import LoadingScreen from './components/LoadingScreen'
import { useChatScript } from './hooks/useChatScript'
import { chatScript } from './data/script'
import './index.css'

function App() {
  const [loading, setLoading] = useState(true);
  const { messages, isTyping, typingSender } = useChatScript(loading ? [] : chatScript);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {!loading && (
        <ChatInterface
          messages={messages}
          isTyping={isTyping}
          typingSender={typingSender}
        />
      )}
    </>
  )
}

export default App
