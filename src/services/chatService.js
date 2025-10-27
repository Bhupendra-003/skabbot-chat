// Store chat history in memory
const chatHistory = new Map();

// API base for dev/prod. Example: http://localhost:8888 when using `netlify dev`
const apiBase = (import.meta && import.meta.env && import.meta.env.VITE_API_BASE) ? import.meta.env.VITE_API_BASE : '';

// Function to send message to the backend
export const sendMessage = async (prompt, userDetails) => {
  try {
    // Retrieve previous conversation history from memory
    const history = chatHistory.get(userDetails.userId) || [];

    // Process message with memory
    const response = await processMessage(prompt, history);

    // Update conversation history
    history.push({ role: "user", content: prompt });
    history.push({ role: "assistant", content: response });
    chatHistory.set(userDetails.userId, history);

    return response;
  } catch (error) {
    console.error("Error in chat service:", error);
    throw new Error("Failed to get response from chatbot");
  }
};

// Function to process message using LangChain with memory
const processMessage = async (prompt, history) => {
  try {
    // Delegate to server; server adds system instructions
    const response = await runConversation(prompt, history);

    return response;
  } catch (error) {
    console.error("Error processing message:", error);
    throw error;
  }
};

// Function to run conversation via Netlify function
export const runConversation = async (prompt, history) => {
  try {
    const res = await fetch(`${apiBase}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({ prompt, history }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server error: ${res.status}`);
    }

    const data = await res.json();
    return data.response || '';
  } catch (error) {
    console.error("Error during conversation:", error);
    throw new Error(`Failed to get response from AI model: ${error.message}`);
  }
};