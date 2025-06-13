"use client";

import { useState } from "react";

const EXAMPLES = [
  {
    label: "🌆 Dickens",
    text: `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way--in short, the period was so far like the present period that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.`,
  },
  {
    label: "🐳 Melville",
    text: `Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet...`,
  },
  {
    label: "🇺🇸 Kennedy",
    text: `In the long history of the world, only a few generations have been granted the role of defending freedom in its hour of maximum danger. I do not shrink from this responsibility, I welcome it... Ask not what your country can do for you--ask what you can do for your country.`,
  },
  {
    label: "🦅 Eagles",
    text: `On a dark desert highway, cool wind in my hair\nWarm smell of colitas, rising up through the air\nUp ahead in the distance, I saw a shimmering light\nMy head grew heavy and my sight grew dim\nI had to stop for the night...`,
  },
];

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [outputs, setOutputs] = useState<{
    vanilla: string;
    fine_tuned: string;
  }>({
    vanilla:
      "Base GPT-4.1 (prompted to use a Baja Spanish dialect) will translate your input here",
    fine_tuned:
      "Fine-tuned GPT-4.1 (trained on Baja Spanish dialect) will translate your input here",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://baja-backend-a5iv.onrender.com/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setOutputs({
          vanilla: "❌ Error from backend: " + errorText,
          fine_tuned: "",
        });
        return;
      }

      const data = await res.json();
      setOutputs(data);
    } catch (err) {
      setOutputs({
        vanilla: "❌ Unexpected client-side error",
        fine_tuned: "",
      });
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-yellow-50 flex flex-col items-center py-10 px-4 text-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-center flex items-center gap-2">
        🌵🏄 Baja GPT-4.1 Translator
      </h1>
      <p className="mb-6 text-center text-gray-700 max-w-xl">
        Compare two GPT-4.1 models translating your English into Spanish with a Baja dialect.
        One is prompted to simulate the dialect, the other is fine-tuned on real Baja-style responses.
      </p>

      <hr className="my-4 border-t-2 border-yellow-200 w-1/3" />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-md rounded p-6 mb-8"
      >
        <label htmlFor="example" className="block text-md font-medium mb-2 text-gray-800">
          Try a famous English passage:
        </label>
        <select
          id="example"
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-gray-300 bg-white text-gray-800 rounded px-3 py-2 mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-200"
        >
          <option value="">-- Choose a literary input --</option>
          {EXAMPLES.map((ex) => (
            <option key={ex.label} value={ex.text}>
              {ex.label}
            </option>
          ))}
        </select>

        <label htmlFor="input" className="block text-md font-medium mb-2 text-gray-800">
          Or enter your own:
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl transition-opacity duration-500">
        <div className="bg-white shadow-lg rounded p-6 border border-blue-300 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-300 text-white text-xs px-2 py-1 rounded shadow">
            Base GPT-4.1 (Prompted)
          </div>
          <h2 className="text-2xl font-semibold mb-2 mt-4">🔵 GPT-4.1 (Prompted)</h2>
          {loading ? (
            <p className="text-yellow-500 italic animate-pulse">
              🌬️ Summoning the Baja winds...
            </p>
          ) : (
            <p className="text-gray-800 whitespace-pre-wrap min-h-[60px] animate-fade-in">
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
            <p className="text-yellow-500 italic animate-pulse">
              🌊 Fetching fine-tuned flavor...
            </p>
          ) : (
            <p className="text-gray-800 whitespace-pre-wrap min-h-[60px] animate-fade-in">
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
