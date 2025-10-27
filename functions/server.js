const express = require("express");
const serverless = require("serverless-http");
const Groq = require("groq-sdk");

const app = express();

app.use(express.json());

// CORS middleware for local development (frontend on 5173)
app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowedOrigins = ["http://localhost:5173", "http://localhost:8888"];
    
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    
    // Handle preflight requests
    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }
    
    next();
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from the server!" });
});

app.post("/api/chat", async (req, res) => {
    try {
        const { prompt, history = [] } = req.body || {};

        if (!prompt || typeof prompt !== "string") {
            return res.status(400).json({ error: "Invalid prompt" });
        }

        const groqApiKey = process.env.GROQ_API_KEY;
        if (!groqApiKey) {
            return res.status(500).json({ error: "Missing GROQ_API_KEY on server" });
        }

        const groq = new Groq({ apiKey: groqApiKey });

        const systemInstructions = [
            {
                role: "system",
                content:
                    "You are HomieAi, a compassionate AI companion specializing in mental health support. Your responses are concise (max 15 words unless asked for detailed solutions), friendly, and incorporate emojis. You use evidence-based CBT techniques and maintain a warm, conversational tone. For negative moods, you suggest practical exercises and mood-lifting activities. If users mention harmful thoughts, respond with gentle humor and empathy , while firmly encouraging professional help. You only address healthcare-related topics and aim to create a safe, supportive space. Remember to validate feelings while promoting positive coping strategies. Keep responses encouraging, authentic, and focused on well-being. You have to talk in Hinglish but not pure, you can use most commonly used english words in between if user talk in Hinglish",
            },
            {
                role: "system",
                content:
                    "You are made by Bhupendra Singh and Komolika Agarwal, students of Computer Science and Engineering at Amity University.",
            },
        ];

        const messages = [
            ...systemInstructions,
            ...(Array.isArray(history) ? history : []),
            { role: "user", content: prompt },
        ];

        const completion = await groq.chat.completions.create({
            messages,
            model: "openai/gpt-oss-120b",
            temperature: 1,
            max_completion_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null,
        });

        const response = completion?.choices?.[0]?.message?.content || "";
        return res.json({ response });
    } catch (error) {
        console.error("/api/chat error:", error);
        return res.status(500).json({ error: error.message || "Server error" });
    }
});

module.exports.handler = serverless(app);