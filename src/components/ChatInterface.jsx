"use client"

import { useState, useEffect, useRef } from "react"
import { useChatStore } from "../store/chatStore"
import { sendMessage } from "../services/chatService"
import { useSpeech } from "../hooks/useSpeech"

const ChatInterface = ({ updateXp, userDetails }) => {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { messages, addMessage } = useChatStore()
  const messageAreaRef = useRef(null)
  const { speak } = useSpeech()

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message to UI
    addMessage({ content: input, sender: "user" })
    setInput("")
    setIsLoading(true)

    try {
      // Send message to backend
      const response = await sendMessage(input, userDetails)

      // Add bot response to UI
      addMessage({ content: response, sender: "bot" })

      // Update XP
      updateXp()

      // Speak the response
      speak(response)
    } catch (error) {
      console.error("Error sending message:", error)
      addMessage({ content: `Error: ${error.message}`, sender: "bot" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <div className="message-area" ref={messageAreaRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`msg-${msg.sender}`}>
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="dots-loading msg-bot">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
      <div className="message-input">
        <form className="input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="message-field"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="send-button">
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatInterface

