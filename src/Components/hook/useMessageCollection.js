
import { useState } from 'react'

/**
 * A custom hook for managing the conversation between the user and the AI.
 *
 * @returns {Object} An object containing the `messages` array and the `addMessage` function.
 */
const useMessageCollection = () => {
  const initialMsg = {
    id: 1,
    createdAt: Date.now(),
    text: '**Hello!** *How can I help you today?*',
    ai: true
  }
  const [messages, setMessages] = useState([initialMsg]);
  // console.log("chat",messages)

  





  /**
  * A function for adding a new message to the collection.
  *
  * @param {Object} messages - The message to add to the collection.
  */
  const addMessage = (messages) => {
   setMessages((prev) => [...prev, messages]);
    
  }

  const clearMessages = () => setMessages([initialMsg])

  return [messages, addMessage, clearMessages];
}

export default useMessageCollection