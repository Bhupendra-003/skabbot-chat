"use client"
import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import ChatInterface from "./ChatInterface"
import { useChatStore } from "../store/chatStore"
import { useLocalStorage } from "../hooks/useLocalStorage"

const ChatPage = () => {
  const [sidebarActive, setSidebarActive] = useState(false)
  const [xp, setXp] = useLocalStorage("xp", 0)
  const [streak, setStreak] = useLocalStorage("streak", 0)
  const [lastPlayed, setLastPlayed] = useLocalStorage("lastPlayed", new Date().toISOString())
  const [lastLogin, setLastLogin] = useLocalStorage("lastLogin", new Date().toISOString())
  const { messages } = useChatStore()

  useEffect(() => {
    // Update last login date
    setLastLogin(new Date().toISOString())

    // Check if it's a new day to reset streak
    const lastPlayedDate = new Date(lastPlayed).setHours(0, 0, 0, 0)
    const today = new Date().setHours(0, 0, 0, 0)
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    // If last played was before yesterday, reset streak
    if (lastPlayedDate < yesterday.setHours(0, 0, 0, 0)) {
      setStreak(1)
    }
  }, [])

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive)
  }

  const updateXp = () => {
    // Add 10 XP per message
    const newXp = xp + 10
    setXp(newXp)

    // If XP reaches 1000, reset to 0
    if (newXp >= 1000) {
      setXp(0)
    }

    return newXp
  }

  const updateStreak = () => {
    const today = new Date().setHours(0, 0, 0, 0)
    const lastPlayedDate = new Date(lastPlayed).setHours(0, 0, 0, 0)

    // Only update streak if it's a new day
    if (today > lastPlayedDate) {
      const newStreak = streak + 1
      setStreak(newStreak)
      setLastPlayed(new Date().toISOString())
      return newStreak
    }

    return streak
  }

  return (
    <div className="app-container">
      <Navbar toggleSidebar={toggleSidebar} xp={xp} streak={streak} updateStreak={updateStreak} />
      <Sidebar active={sidebarActive} toggleSidebar={toggleSidebar} />
      <ChatInterface updateXp={updateXp} userDetails={{ xp, streak, lastPlayed, lastLogin }} />
    </div>
  )
}

export default ChatPage

