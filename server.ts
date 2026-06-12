import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for PathForge AI Mentor leveraging server-side Gemini API
  app.post("/api/mentor", async (req, res) => {
    try {
      const { message, chatHistory, studentContext } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        // Fallback gracefully to simulated responses if the API key is not configured yet
        return res.json({
          text: getSimulatedMentorReply(message, studentContext),
          simulated: true
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = `You are "PathForge Mentor", an elite, supportive, and motivational futuristic AI mentor on the "PathForge AI" edtech gaming platform.
Your student's name is ${studentContext?.name || "Explorer"}.
Their active track is "${studentContext?.activeTrackTitle || "Discovery"}".
They have ${studentContext?.xp || 0} XP and are at Level ${studentContext?.level || 1} with a streak of ${studentContext?.streak || 1} days.
Completed lessons so far: ${studentContext?.completedLessonsCount || 0}.

Your tone:
- Encourage them with sci-fi, video-game style analogies (e.g., "unlocking system nodes", "synaptic calibration", "leveling up neural pathways").
- Keep responses concise (under 3 paragraphs), well-formatted with markdown and bullet points.
- Explain technical topics (software dev, machine learning, prompt engineering, content diffusion) simply but accurately.
- Provide direct, useful, motivational study help! Keep code snippets short if relevant.`;

      const prompt = `Student says: "${message}"`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.8,
        }
      });

      const text = response.text || "I apologize, Cadet. My sensory grid suffered a transient brownout. Please ping me again!";
      return res.json({ text, simulated: false });

    } catch (error: any) {
      console.error("Gemini API error in /api/mentor:", error);
      return res.status(200).json({
        error: error.message || "Failed to communicate with mentor node",
        text: "I am experiencing quantum interference in my cerebral matrix. Let's switch to my local subroutines: " + getSimulatedMentorReply(req.body.message, req.body.studentContext),
        simulated: true
      });
    }
  });

  // Simulated responder with contextual answers
  function getSimulatedMentorReply(message: string, studentContext: any): string {
    const msg = message.toLowerCase();
    const name = studentContext?.name || "Cadet";
    const track = studentContext?.activeTrackTitle || "assigned track";

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("welcome")) {
      return `### ⚡️ Synaptic Bridge Established!

Greetings, **${name}**! I am your **PathForge Mentor** node. 

I see you are forging your path in the **${track}** track. You've dialed in with **${studentContext?.xp || 0} XP**! 

How can I help calibrate your neural pathways today? Ask me to:
* 📖 Explain a concept from your lessons
* 🗺️ Suggest your next optimization step
* 🚀 Give you a quick boost of learning motivation!`;
    }

    if (msg.includes("lesson") || msg.includes("explain") || msg.includes("what is") || msg.includes("how does") || msg.includes("why")) {
      return `### 🧠 Synaptic Breakdown: Concept Analysis

Fascinating query! When analyzing heavy technological frameworks, I recommend thinking about them through system inputs and expected outputs:

1. **Isolate Modularity**: Break down concepts into isolated atomic rules. For example, in Software Dev, separate database schemas from your business logic layer.
2. **Predict Bounds**: Run micro-feedback code trials. Change one variable at a time (e.g., temperature configs or database values) and monitor deviations in telemetry.
3. **Draft Context**: Always write structural mock-arrays first to verify your formulas are coherent.

*Cadet Progress Note:* I recommend completing your active node under **${track}** to unlock the accompanying module evaluation quiz. Ready to run compile operations? Let me know what you need clarified!`;
    }

    if (msg.includes("next") || msg.includes("step") || msg.includes("what should i do") || msg.includes("roadmap")) {
      return `### 🎯 Strategic Trajectory Recalibration

Based on your current telemetry (**Level ${studentContext?.level || 1}**, **${studentContext?.completedLessonsCount || 0} nodes synchronized**):

1. **Complete Unlocked Lessons**: Enter your Roadmaps tab, select the active glowing neon node, and click through the 5 micro-lessons.
2. **Attempt the Module Evaluation**: Complete the interactive Quiz node positioned directly after the lessons to receive up to 150 bonus XP and level up instantly.
3. **Lock Continuous Days**: Preserve your daily streak (**Current streak: ${studentContext?.streak || 0} days**). A daily session sustains 2.4x retention rates!

Which segment shall we attack first, ${name}?`;
    }

    if (msg.includes("motivation") || msg.includes("hard") || msg.includes("stuck") || msg.includes("fail") || msg.includes("tired")) {
      return `### 🚀 System Overdrive: Motivation Node Activated

Listen carefully, **${name}**:
Every compiler error is a signature of synaptic evolution. In the modern era of AI, we do not succeed because our first attempts compile flawlessly; we succeed because we are relentless adapters.

* **Your current Level**: Level ${studentContext?.level || 1}
* **Active Streak**: ${studentContext?.streak || 1} Days Active
* **Synaptic Status**: Resilient

Your cerebral core is fully compatible with this curriculum. Take a deep breath, break down the active lesson card into simple sentences, and try one more iteration. Let's conquer this **${track}** node!`;
    }

    return `### 📡 Neural Node Response Received

Acknowledged, **${name}**. Analyzing query regarding optimization loops...

To help you forge your path in **${track}**:
* **Keep modular**: Keep files separated into small components to avoid system token limitations.
* **Test inputs**: Ensure you complete all 5 micro-lessons within a node to trigger the automated quiz module.
* **Inquire further**: Ask me questions like *"How do autonomous agents work?"* or *"What is database type safety?"* for specific deep dives.

Forge on, Cadet! I am listening.`;
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
