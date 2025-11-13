"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirm) {
      setError("All fields are required");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("https://devrelief.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || "Signup failed");
      }
      // On success: redirect to login page
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup}
       className="bg-white p-8 rounded-lg shadow-md w-80 md:w-full max-w-sm space-y-5"
      >
        <h1 className="text-2xl font-bold text-center text-blue-900">Sign Up</h1>

        {error && (
          <p className="text-red-600 text-center text-sm font-medium">{error}</p>
        )}

        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Re-enter password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-blue-600 hover:underline"
          >
            Log In
          </a>
        </p>
      </form>
    </div>
  );
}

