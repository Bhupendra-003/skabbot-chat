import { ChatGroq } from "@langchain/groq"

// Initialize the ChatGroq LLM
const llm = new ChatGroq({
  model: "llama3-70b-8192",
  temperature: 0.9,
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
})

// Function to run conversation with memory
export const runConversation = async (messages) => {
  try {
    // Call the model with the messages
    const response = await llm.invoke(messages)

    // Return the content of the response
    return response.content
  } catch (error) {
    console.error("Error during conversation:", error)
    throw new Error("Failed to get response from AI model")
  }
}

