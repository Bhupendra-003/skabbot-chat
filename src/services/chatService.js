import { Groq } from 'groq-sdk';

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
const processMessage = async (prompt) => {
  try {
    // Use the memory.js functionality to get a response
    const response = await runConversation([{ role: "user", content: prompt }])

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


const apiKey = import.meta.env.VITE_GROQ_API_KEY
const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

// Function to run conversation with memory
export const runConversation = async (messages) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      "messages": messages, // Use the input messages
      "model": "llama3-70b-8192",
      "temperature": 1,
      "max_completion_tokens": 1024,
      "top_p": 1,
      "stream": true,
      "stop": null
    });

    let fullResponse = '';
    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || '';
      fullResponse += content;
      // If you want to process each chunk individually (e.g., for real-time display), you can do it here.
      // console.log("Streaming Chunk:", content);
    }
    return fullResponse; // Return the complete response
  } catch (error) {
    console.error("Error during conversation:", error);
    console.error("Error details:", error.response?.data); // Log more error details if available
    throw new Error(`Failed to get response from AI model: ${error.message}`);
  }
};

