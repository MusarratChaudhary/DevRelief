"use client";

import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const [errorText, setErrorText] = useState("");
  const [codeText, setCodeText] = useState("");
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);

  const handleFix = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return ;
        const res=await fetch("https://devrelief.onrender.com/api/fix", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization:`Bearer ${token}`},
        body: JSON.stringify({ error: errorText, code: codeText }),
        credentials: "include",
    });
      const data = await res.json();
      console.log("Fix Response:", data);
      const sol = data.solution || data.error || "No solution returned.";
      setSolution(sol);
  }
     catch (err: any) {
      setErrorText(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-b  from-gray-950 via-gray-500 to-gray-50 p-4">
      <section className="w-full max-w-3xl bg-gray-100 rounded-xl shadow-xl p-6 sm:p-10">
        <div className='text-2xl md:text-4xl font-extrabold mb-12 text-center bg-linear-to-r from-black via-blue-950 to-blue-900 text-transparent bg-clip-text tracking-tight'>
          <Typewriter
           words={['AI POWERED - JAVA BUG FIXER.']}
           loop={false}
           cursor
           typeSpeed={80}
           deleteSpeed={0}
           delaySpeed={1000}
           />
          </div>
          
        <p className="text-center text-gray-700 mb-8 -mt-5 font-semibold md:tracking-wide">
          Paste your Java error and optional code snippet to get an instant AI-generated fix.
        </p>

        {/* ---- Input Form ---- */}
        <div className="space-y-6">
          <div>
            <label className="block font-semibold mb-2 text-blue-900">
              Error / Stack Trace
            </label>
            <textarea
              className="w-full h-40 resize-y p-3 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Paste your Java error here..."
              value={errorText}
              onChange={(e) => setErrorText(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-blue-900">
              Code Snippet (optional)
            </label>
            <textarea
              className="w-full h-48 sm:h-60 resize-y p-3 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Paste related code here..."
              value={codeText}
              onChange={(e) => setCodeText(e.target.value)}
            />
          </div>

          <button
            onClick={handleFix}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 rounded-md bg-gray-300 text-blue-950 font-bold
                       hover:bg-blue-950 hover:text-white shadow-gray-400 shadow-xl disabled:opacity-60 transition-colors duration-200"
          >
            {loading ? "Fixing…" : "Fix It"}
          </button>
        </div>

        {/* ---- Solution Box ---- */}
        {solution && (
          <div className="mt-8 bg-gray-50 border border-gray-300 rounded-md p-4 max-h-80 overflow-y-auto">
            <h2 className="font-bold text-blue-900 mb-2">Solution:</h2>
            <pre className="whitespace-pre-wrap text-gray-800 text-sm sm:text-base">
              {solution}
            </pre>

          </div>
        )}
      </section>
    </main>
  );
}


