"use client";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-b from-gray-600 via-zinc-300 to-gray-200 text-cyan-900 px-6 py-16 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-6"
        >
          <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy 🔒</h1>
          <p className="text-gray-700 leading-relaxed">
            At <strong>DevRelief</strong>, your privacy is our top priority. This policy
            explains how we collect, use, and protect your personal and coding data.
          </p>

          <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
          <p className="text-gray-700">
            We collect only essential data such as your name, email address, and the code
            snippets you choose to debug. We do not permanently store any debugging logs.
          </p>

          <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Data</h2>
          <p className="text-gray-700">
            Your information is used solely to provide AI-powered debugging services,
            enhance performance, and send product updates (if you opt-in).
          </p>

          <h2 className="text-2xl font-semibold mt-6">3. Data Protection</h2>
          <p className="text-gray-700">
            We use encryption and secure cloud infrastructure to keep your information safe.
            No data is shared with third parties without consent.
          </p>

          <h2 className="text-2xl font-semibold mt-6">4. Cookies</h2>
          <p className="text-gray-700">
            Our site may use cookies to improve user experience. You can disable them in
            your browser settings.
          </p>

          <h2 className="text-2xl font-semibold mt-6">5. Updates to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy periodically. The latest version will always
            be available on this page.
          </p>

          <p className="text-gray-700 mt-8">
            If you have any questions, contact us at 
            <a href="mailto:support@devrelief.ai" className="text-cyan-600 font-medium"> support@devrelief.ai</a>.
          </p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
