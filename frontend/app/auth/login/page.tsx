"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("Logging in…");
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      // Save token
      localStorage.setItem("token", data.token);
      router.push("/history");
     } catch (err: any) {
      setMsg(err.message);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-100 to-gray-100">
      <form onSubmit={handleLogin}
        className="w-96 md:w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-blue-900">Log In</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-800 transition"
        >
          Log In
        </button>

        {msg && <p className="text-center text-sm text-gray-700">{msg}</p>}
      </form>
    </div>
  );
}

