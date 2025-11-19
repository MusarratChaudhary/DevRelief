"use client";
import Link from "next/link";
import Image from "next/image";
import DevRelief from "../public/images/DevRelief.png"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-0">
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-center md:text-left">
        
        <div>
          <Link href='/'><Image src={DevRelief} alt="DevRelief Logo" className="ml-20 md:ml-0 w-30 md:w-40"/></Link>
          <p className="text-sm">
            AI-powered bug fixer for developers. Starting with Java errors,
            expanding to all major programming languages soon.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/HowItWorks" className="hover:text-white">HowItWorks</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link href="https://x.com/Musarrat0?t=FOlfjnjMV5DIrn84t3uJ6Q&s=08" className="hover:text-blue-400">Twitter</Link>
            <Link href="https://www.linkedin.com/in/musarrat-chaudhary-4b62512a9" className="hover:text-blue-400">LinkedIn</Link>
            <Link href="https://github.com/MusarratChaudhary" className="hover:text-blue-400">GitHub</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} DevRelief. All rights reserved.
      </div>
    </footer>
  );
}
