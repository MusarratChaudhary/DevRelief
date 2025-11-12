"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is this platform about?",
    answer:
      "Our AI-powered platform helps developers detect, understand, and fix Java errors instantly with smart explanations and learning insights.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes! The core features are free during the early stage. In future, we’ll offer premium plans with advanced debugging tools and cloud-based features.",
  },
  {
    question: "Will you support other languages?",
    answer:
      "Absolutely! We’re starting with Java, but soon expanding to Python, JavaScript, and C++.",
  },
  {
    question: "How secure is my code data?",
    answer:
      "Your code and error logs are never stored permanently. All debugging data is encrypted and automatically deleted after processing.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-b from-gray-800 via-gray-500 to-green-100 text-cyan-950 flex flex-col items-center px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-10 text-center bg-linear-to-r from-green-100 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          Frequently Asked Questions 💬
        </motion.h1>

        <div className="w-full max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-cyan-200 bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex justify-between items-center w-full px-5 py-4 text-left font-medium text-lg hover:bg-cyan-50 transition"
              >
                {faq.question}
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform ${
                    openIndex === index ? "rotate-180 text-cyan-600" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="px-5 pb-4 text-gray-700"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
