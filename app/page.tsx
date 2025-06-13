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
        <label className="block text-lg font-medium mb-2 text-gray-800">
          Choose a sample or type your own:
        </label>
        <select
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-gray-900"
          onChange={(e) => setInput(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Select a famous passage…</option>
          <option value="It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way--in short, the period was so far like the present period that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.">🌆 Dickens</option>
          <option value="Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to sea as soon as I can.">🐳 Melville</option>
          <option value="In the long history of the world, only a few generations have been granted the role of defending freedom in its hour of maximum danger. I do not shrink from this responsibility, I welcome it. I do not believe that any of us would exchange places with any other people or any other generation. The energy, the faith, the devotion which we bring to this endeavor will light our country and all who serve it and the glow from that fire can truly light the world. And so, my fellow Americans: ask not what your country can do for you--ask what you can do for your country. My fellow citizens of the world: ask not what America will do for you, but what together we can do for the freedom of man.">🇺🇸 Kennedy</option>
          <option value="On a dark desert highway, cool wind in my hair Warm smell of colitas, rising up through the air Up ahead in the distance, I saw a shimmering light. My head grew heavy and my sight grew dim, I had to stop for the night. There she stood in the doorway. I heard the mission bell. And I was thinking to myself 'This could be Heaven or this could be Hell.' Then she lit up a candle, and she showed me the way. There were voices down the corridor; I thought I heard them say: Welcome to the Hotel California. Such a lovely place (Such a lovely place), Such a lovely face. Plenty of room at the Hotel California. Any time of year (Any time of year), You can find it here.">🦅 Eagles</option>
        </select>

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
