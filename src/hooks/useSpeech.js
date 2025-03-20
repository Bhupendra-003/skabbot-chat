"use client"

import { useState } from "react"

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speak = (text) => {
    if (!("speechSynthesis" in window)) {
      console.warn("Text-to-speech not supported in this browser")
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event)
      setIsSpeaking(false)
    }

    // Get available voices
    const voices = window.speechSynthesis.getVoices()

    // Try to find a good English voice
    const englishVoice = voices.find((voice) => voice.lang.includes("en") && voice.name.includes("Female"))

    if (englishVoice) {
      utterance.voice = englishVoice
    }

    window.speechSynthesis.speak(utterance)
  }

  const stop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  return { speak, stop, isSpeaking }
}

