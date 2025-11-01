"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-linear-to-b from-slate-100 via-purple-100 to-white text-cyan-900 px-6 py-16 flex flex-col items-center">
        
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mb-10"
        >
          <h1 className="text-4xl font-bold mb-4 bg-linear-to-tl from-green-400 to-blue-900 bg-clip-text text-transparent">
            Let’s Connect
          </h1>
          <p className="text-lg text-gray-700">
            Have a question, suggestion, or idea to share?  
            We’re always open to feedback and collaboration opportunities.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mt-10">
          {[
            {
              icon: <Mail className="w-10 h-10 text-cyan-600" />,
              title: "Email",
              info: "support@javabugfixer.ai",
              link: "mailto:support@javabugfixer.ai",
              desc: "Feel free to reach out for queries or feedback.",
            },
            {
              icon: <Phone className="w-10 h-10 text-blue-600" />,
              title: "Phone",
              info: "+92 3157847550",
              link: "tel:+923157847550",
              desc: "Whether it’s feedback, bugs, or ideas — drop a message anytime",
            },
            {
              icon: <MapPin className="w-10 h-10 text-cyan-700" />,
              title: "Location",
              info: "Karachi, Pakistan",
              link: "https://www.google.com/maps/place/Karachi",
              desc: "Working remotely & open for collaborations.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white border border-cyan-200 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              
              {/* Clickable Info */}
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-800 font-medium hover:text-blue-600 transition-colors"
              >
                {item.info}
              </Link>

              <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 text-center max-w-2xl"
        >
          <h2 className="text-2xl font-semibold mb-3 text-cyan-700">Thanks for reaching out 🤝</h2>
          <p className="text-gray-700">
            This project is growing every day — and your ideas or feedback can help make it even better.  
            Let’s keep learning, building, and improving together.
          </p>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}

