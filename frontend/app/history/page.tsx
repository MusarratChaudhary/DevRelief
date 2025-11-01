"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, History as HistoryIcon } from "lucide-react";

interface HistoryItem {
  id: number;
  error: string;
  solution: string;
  timestamp: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<HistoryItem | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      router.push("/auth/login");
      return;
    }

    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        setHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("History fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading…
        </p>
      </div>
    );

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 shadow-md flex flex-col md:flex-row mt-0 relative">
        {/* Mobile History Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
        >
          <HistoryIcon size={22} />
        </button>

        {/* Sidebar (Desktop View) */}
        <div className="hidden md:block w-1/3 lg:w-1/4 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-900">History</h2>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </div>

          {history.length === 0 ? (
            <p className="text-gray-600 text-sm">No saved errors yet.</p>
          ) : (
            <ul className="space-y-2">
              {history.map((item) => (
                <li
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`p-3 rounded-md cursor-pointer truncate text-sm ${
                    selected?.id === item.id
                      ? "bg-blue-100 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.error}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 bg-white z-50 flex flex-col w-4/5 sm:w-2/3 shadow-lg"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold text-blue-900">History</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-red-500"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {history.length === 0 ? (
                  <p className="text-gray-600 text-sm">No saved errors yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {history.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => {
                          setSelected(item);
                          setMenuOpen(false);
                        }}
                        className={`p-3 rounded-md cursor-pointer truncate text-sm ${
                          selected?.id === item.id
                            ? "bg-blue-100 font-semibold"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {item.error}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="p-4 border-t">
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 text-sm"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detail Panel */}
        <div className="flex-1 p-6 overflow-y-auto mt-4 md:mt-0">
          {selected ? (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-md font-semibold text-red-600 mb-4 whitespace-pre-wrap overflow-x-auto">
                {selected.error}
              </h3>
              <pre className="bg-gray-900 text-green-300 p-4 rounded-lg text-sm whitespace-pre-wrap overflow-x-auto">
                {selected.solution}
              </pre>
              <p className="text-xs text-gray-500 mt-3">
                {new Date(selected.timestamp).toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-gray-600 text-center mt-20">
              Select an error from the left to view details.
            </p>
          )}
        </div>
      </div>
    </>
  );
}









