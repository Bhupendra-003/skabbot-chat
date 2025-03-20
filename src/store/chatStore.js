import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useChatStore = create(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: "chat-storage",
    },
  ),
)

