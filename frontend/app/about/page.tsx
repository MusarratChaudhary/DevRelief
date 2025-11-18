"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"; 
import { Code, Brain, Rocket, Users } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import M_Chaudhry from "../public/images/M_Chaudhry.jpeg"

export default function AboutPage() {
  return (
    <>
      <Header />

      <div className="relative overflow-hidden font-sans bg-linear-to-b from-gray-900 via-gray-800 to-blue-950">
        <div className="relative z-10 min-h-screen text-white flex flex-col items-center px-6 py-20 space-y-20">

          {/* ===== Hero Section ===== */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-center max-w-3xl"
          >
            <motion.h1
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "linear",
              }}
              className="text-5xl md:text-6xl font-extrabold mb-6 bg-linear-to-r from-green-300 via-cyan-300 to-blue-400 bg-size-[200%_auto] bg-clip-text text-transparent drop-shadow-lg"
            >
              About Our Startup
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-gray-300 text-lg leading-relaxed"
            >
              Building the next generation of AI tools that fix, explain, and optimize code — 
              making debugging faster, smarter, and human-friendly.
            </motion.p>
          </motion.div>

          {/* ===== Features Section ===== */}
          <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
            {[
              {
                icon: <Brain className="w-12 h-12 text-green-400" />,
                title: "AI-Powered Debugging",
                desc: "Our Gemini-based AI model not only fixes bugs but also explains them in simple words — helping you learn and improve.",
                delay: 0.2,
              },
              {
                icon: <Code className="w-12 h-12 text-blue-400" />,
                title: "Multi-Language Expansion",
                desc: "Currently focused on Java, but we’re bringing AI debugging for Python, JavaScript, and C++ very soon.",
                delay: 0.4,
              },
              {
                icon: <Rocket className="w-12 h-12 text-pink-400" />,
                title: "Speed + Learning",
                desc: "Instant fixes, clean UI, & detailed explanations — empowering developers to debug faster, learn deeper, & code smarter.",
                delay: 0.6,
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.7 }}
                viewport={{ once: true }}
              >
                <Card className="bg-blue-950 backdrop-blur-lg border border-gray-700 hover:border-green-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-green-500/30 shadow-md rounded-3xl">
                  <CardContent className="flex flex-col items-center p-8 space-y-5 text-center">
                    {feature.icon}
                    <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-gray-300">{feature.desc}</p> 
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* ===== Our Story Section ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="max-w-5xl text-center space-y-5"
          >
            <h2 className="text-4xl font-bold bg-linear-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-md">
              Our Story
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              DevRelief was created with one simple mission — to make debugging less stressful
              and more educational. It began as a personal idea to simplify complex debugging
              and evolved into an AI-powered assistant loved by developers and learners alike.
            </p>
          </motion.div>

          {/* ===== Meet the Developer Section ===== */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold bg-linear-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-10 drop-shadow-md">
              Meet the Developer
            </h2>

            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(52,211,153,0.4)" }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-blue-950 backdrop-blur-lg border border-gray-700 rounded-3xl p-8 w-full max-w-md mx-auto shadow-lg"
            >
            <div className="object-cover aspect-square mx-auto mb-4 h-32 w-32 rounded-full border-4 border-green-400 shadow-green-400/40 shadow-lg overflow-clip bg-gray-900">
              <Image
              src={M_Chaudhry}
              alt="Developer"
              height={100}
              width={100}
              className="-mt-2 w-32"/>
            </div>
              <h3 className="text-2xl font-semibold text-white">Musarrat Chaudhary</h3>
              <p className="text-gray-400 mb-2">Frontend Developer | GIAIC Student</p> 
              <p className="text-gray-300 text-sm leading-relaxed"> 
                Creator of DevRelief — combining AI and code to solve real-world problems.
                Passionate about learning, innovation, and making coding more accessible.
              </p>
            </motion.div>
          </motion.div>

          {/* ===== Project Journey Section ===== */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-3xl"
          >
            <h2 className="text-4xl font-bold bg-linear-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-6 drop-shadow-md">
              Project Journey
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed"> 
              DevRelief was developed over the course of <span className="font-semibold text-cyan-300">3 months</span>,
              built with dedication and countless hours of learning. The frontend was created using
              <span className="font-semibold text-green-300"> Next.js</span> and 
              <span className="font-semibold text-green-300"> Tailwind CSS</span>, while the backend is powered by
              <span className="font-semibold text-green-300"> Python Flask</span> and 
              <span className="font-semibold text-green-300"> Gemini AI</span>.
            </p>
            <p className="text-gray-400 mt-4">
              Every feature, animation, and design decision reflects a balance between creativity and functionality —
              making DevRelief not just a startup, but a personal milestone in learning and growth.
            </p>
          </motion.div>

          {/* ===== Who It’s For Section ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full max-w-6xl text-center"
          >
            <h2 className="text-4xl font-bold bg-linear-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-8 drop-shadow-md">
              Who It’s For
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "Students learning to code smarter",
                "Developers fixing real-world bugs",
                "Freelancers boosting productivity",
                "Educators teaching debugging concepts",
                "Teams building AI-integrated tools",
                "Startups creating future-ready products",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/70 border border-gray-700 hover:border-green-500 hover:bg-gray-700/70 backdrop-blur-lg rounded-2xl p-6 transition-all hover:shadow-green-300/20"
                >
                  <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <p className="text-gray-300 text-sm">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}