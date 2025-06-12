"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [outputs, setOutputs] = useState<{
    vanilla: string;
    fine_tuned: string;
  }>({
    vanilla: "Base GPT-4.1 (prompted to use a Baja Spanish dialect) will translate your input here",
    fine_tuned: "Fine-tuned GPT-4.1 (trained on Baja Spanish dialect) will translate your input here",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("📤 Sending:", input);
      const res = await fetch("https://baja-backend-a5iv.onrender.com/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Backend returned error:", errorText);
        setOutputs({
          vanilla: "❌ Error from backend: " + errorText,
          fine_tuned: "",
        });
        return;
      }

      const data = await res.json();
      console.log("✅ Got response:", data);
      setOutputs(data);
    } catch (err) {
      console.error("❌ Unexpected fetch error:", err);
      setOutputs({
        vanilla: "❌ Unexpected client-side error",
        fine_tuned: "",
      });
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-yellow-50 flex flex-col items-center py-10 px-4 text-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 flex items-center gap-2">
        🌵🏄 Baja GPT-4.1 Translator
      </h1>
      <p className="mb-8 text-center text-gray-700 max-w-xl">
        Compare two GPT-4.1 models translating your English into Spanish with a Baja dialect.
        One is prompted to simulate the dialect, the other is fine-tuned on real Baja-style responses.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-md rounded p-6 mb-8"
      >
        <label htmlFor="input" className="block text-lg font-medium mb-2 text-gray-800">
          Enter English sentence:
        </label>
        <input
          id="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-gray-900 placeholder-gray-500"
          placeholder="Where is the nearest pharmacy?"
        />
        <button
          type="submit"
          disabled={!input || loading}
          className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? "Translating..." : "Translate"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        <div className="bg-white shadow-lg rounded p-6 border border-blue-300 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-300 text-white text-xs px-2 py-1 rounded shadow">
            Base GPT-4.1 (Prompted)
          </div>
          <h2 className="text-2xl font-semibold mb-2 mt-4">🔵 GPT-4.1 (Prompted)</h2>
          {loading ? (
            <p className="text-gray-500 italic">Translating with base model...</p>
          ) : (
            <p className="text-gray-800 whitespace-pre-wrap min-h-[60px]">
              {outputs?.vanilla}
            </p>
          )}
        </div>

        <div className="bg-white shadow-lg rounded p-6 border border-green-400 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-400 text-white text-xs px-2 py-1 rounded shadow">
            Fine-Tuned GPT-4.1 for Baja
          </div>
          <h2 className="text-2xl font-semibold mb-2 mt-4">🟠 GPT-4.1 (Fine-Tuned)</h2>
          {loading ? (
            <p className="text-gray-500 italic">Translating with fine-tuned model...</p>
          ) : (
            <p className="text-gray-800 whitespace-pre-wrap min-h-[60px]">
              {outputs?.fine_tuned}
            </p>
          )}
        </div>
      </div>

      <footer className="mt-10 text-sm text-gray-600 text-center">
        Powered by GPT-4.1 🌊🌞 · Fine-tuned with ❤️ on OpenAI
      </footer>
    </main>
  );
}
