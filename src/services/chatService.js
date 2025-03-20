import { runConversation } from "../utils/memory"

// Function to send message to the backend
export const sendMessage = async (prompt, userDetails) => {
  try {
    // Get response from LangChain
    const response = await processMessage(prompt, userDetails)

    // Store in MongoDB
    await storeConversation(prompt, response)

    return response
  } catch (error) {
    console.error("Error in chat service:", error)
    throw new Error("Failed to get response from chatbot")
  }
}

// Function to process message using LangChain
const processMessage = async (prompt, userDetails) => {
  try {
    // Use the memory.js functionality to get a response
    const response = await runConversation([
      {
        role: "system",
        content: `You are SKABBOT, a compassionate AI companion specializing in mental health support. Your responses are concise (max 15 words unless asked for detailed solutions), friendly, and incorporate emojis 😊. You use evidence-based CBT techniques and maintain a warm, conversational tone. For negative moods, you suggest practical exercises and mood-lifting activities 🌟. If users mention harmful thoughts, respond with gentle humor and empathy 💝, while firmly encouraging professional help. You only address healthcare-related topics and aim to create a safe, supportive space. Remember to validate feelings while promoting positive coping strategies 🌈. Keep responses encouraging, authentic, and focused on well-being.`,
      },
      {
        role: "system",
        content:
          "You are made by Bhupendra Singh and Komolika Agarwal, students of Computer Science and Engineering at Amity University. ",
      },
      {
        role: "user",
        content: `Additional context: User has ${userDetails.xp} XP, ${userDetails.streak} streak, last played on ${new Date(userDetails.lastPlayed).toLocaleDateString()}, and last logged in on ${new Date(userDetails.lastLogin).toLocaleDateString()}.`,
      },
      { role: "user", content: `User's current mood: ${prompt}` },
      { role: "user", content: prompt },
    ])

    return response
  } catch (error) {
    console.error("Error processing message:", error)
    throw error
  }
}

// Function to store conversation in MongoDB
const storeConversation = async (prompt, response) => {
  try {
    const result = await fetch("https://api.mongodb.com/app/skabbot-abcde/endpoint/storeConversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        response,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!result.ok) {
      throw new Error("Failed to store conversation")
    }

    return await result.json()
  } catch (error) {
    console.error("Error storing conversation:", error)
    // Don't throw here - we don't want to break the chat flow if storage fails
  }
}

