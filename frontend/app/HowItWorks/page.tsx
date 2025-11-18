"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Brain, Code2, Bug, Sparkles, Timer, Globe,} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Input Your Error",
      description: "Paste your Java error (e.g., NullPointerException) into the input box.",
      icon: "📝",
    },
    {
      title: "Get Instant Solution",
      description: "Click 'Fix It' to get a clear explanation and working code fix from our AI.",
      icon: "⚙️",
    },
    {
      title: "Save to History",
      description: "Your error and solution are saved automatically for future reference.",
      icon: "💾",
    },
    {
      title: "View History",
      description: "Access your saved history anytime to review past fixes and learn from them.",
      icon: "📊",
    },
  ];

  const features = [
    {
      icon: <Brain className="w-10 h-10 text-cyan-500" />,
      title: "AI-Powered Debugging",
      desc: "Instantly understand your errors with AI-driven explanations and solutions.",
    },
    {
      icon: <Code2 className="w-10 h-10 text-cyan-500" />,
      title: "Code Explanation",
      desc: "Paste your code and let DevRelief explain what it does — great for learning.",
    },
    {
      icon: <Bug className="w-10 h-10 text-cyan-500" />,
      title: "Error Insights",
      desc: "Learn why an error occurs, not just how to fix it — perfect for deeper understanding.",
    },
    {
      icon: <Globe className="w-10 h-10 text-cyan-500" />,
      title: "Multi-Language Support",
      desc: "Java debugging available now — multi-language support coming soon",
    },
    {
      icon: <Timer className="w-10 h-10 text-cyan-500" />,
      title: "Save Time",
      desc: "Get real-time debugging suggestions that save hours of frustration.",
    },
    {
      icon: <Sparkles className="w-10 h-10 text-cyan-500" />,
      title: "Smart Learning",
      desc: "Debug smarter with built-in tips, insights, and AI-generated examples.",
    },
  ];

  return (
    <>
      <Header />

      {/* Background*/}
      <div className="relative mx-auto bg-linear-to-b from-gray-200 via-purple-100 to-pink-50 overflow-hidden">
      <div className="absolute inset-0 -z-10" />

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 px-6 md:px-16 text-center">
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-black via-blue-900 to-purple-500 bg-clip-text text-transparent mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          How DevRelief Works
        </motion.h2>

        <motion.p
          className="text-gray-800 max-w-2xl mx-auto mb-16 text-lg font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Our AI-powered system helps developers fix Java errors instantly — fast, smart, and accurate.
        </motion.p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-md border border-gray-100 p-8 rounded-2xl shadow-gray-500 shadow-lg hover:shadow-gray-600 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-6 px-6 md:px-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold bg-linear-to-r from-black via-blue-900 to-purple-500 bg-clip-text text-transparent text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Powerful Features to Debug Smarter
        </motion.h2>

        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Explore the intelligent tools that make DevRelief your trusted coding companion.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-gray-600 shadow-lg hover:shadow-gray-500 hover:shadow-2xl transition duration-300 border border-cyan-100"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-cyan-700 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Developers Love Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold bg-linear-to-r from-black via-blue-900 to-purple-500 bg-clip-text text-transparent mb-6">
            Why Developers Love DevRelief 💙
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-10">
            DevRelief makes debugging simple, educational, and stress-free. Whether you’re a student
            learning code or a professional solving tough bugs, our AI ensures you spend less time fixing
            and more time creating.
          </p>
        </motion.div>
      </section>

      </div>

      <Footer />
    </>
  );
}






