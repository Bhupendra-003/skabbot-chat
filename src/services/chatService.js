import { Groq } from 'groq-sdk';

// Store chat history in memory
const chatHistory = new Map();

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
    // Skabbot system instructions (memory initialization)
    const systemInstructions = [
      {
        role: "system",
        content: `You are HomieAi, a compassionate AI companion specializing in mental health support. Your responses are concise (max 15 words unless asked for detailed solutions), friendly, and incorporate emojis 😊. You use evidence-based CBT techniques and maintain a warm, conversational tone. For negative moods, you suggest practical exercises and mood-lifting activities 🌟. If users mention harmful thoughts, respond with gentle humor and empathy 💝, while firmly encouraging professional help. You only address healthcare-related topics and aim to create a safe, supportive space. Remember to validate feelings while promoting positive coping strategies 🌈. Keep responses encouraging, authentic, and focused on well-being.`,
      },
      {
        role: "system",
        content: "You are made by Bhupendra Singh and Komolika Agarwal, students of Computer Science and Engineering at Amity University.",
      },
    ];

    // Construct conversation history
    const messages = [
      ...systemInstructions, // Include Skabbot system behavior
      ...history,  // Include past messages
      { role: "user", content: prompt }, // Add new user prompt
    ];

    // Get response from Groq
    const response = await runConversation(messages);

    return response;
  } catch (error) {
    console.error("Error processing message:", error);
    throw error;
  }
};

const apiKey = import.meta.env.VITE_GROQ_API_KEY;
const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

// Function to run conversation with memory
export const runConversation = async (messages) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages, // Include chat history + system instructions
      model: "llama3-70b-8192",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null
    });

    let fullResponse = '';
    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || '';
      fullResponse += content;
    }
    return fullResponse;
  } catch (error) {
    console.error("Error during conversation:", error);
    throw new Error(`Failed to get response from AI model: ${error.message}`);
  }
};