"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gray-200 border-b-2 border-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 h-20">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-cyan-900 font-extrabold">
          DevRelief
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 font-medium text-cyan-900">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="text-gray-400">|</span>

          <Link href="/history" className="hover:text-blue-600">History</Link>
          <span className="text-gray-400">|</span>

          <Link href="/HowItWorks" className="hover:text-blue-600">How It Works</Link>
          <span className="text-gray-400">|</span>

          {/* Auth Links */}
          {isLoggedIn ? (
            <button type="button" onClick={handleLogout} className="hover:text-blue-600 font-semibold">
              Logout
            </button>
          ) : (
            <>
              <Link href="/auth/signUp" className="hover:text-blue-600">Sign Up</Link>
              <span className="text-gray-400">|</span>
              <Link href="/auth/login" className="hover:text-blue-600">Login</Link>
            </>
          )}
          <span className="text-gray-400">|</span>

          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          <span className="text-gray-400">|</span>

          {/* HeroUI Dropdown for Desktop */}
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" className="font-medium text-cyan-900 hover:text-blue-600 -ml-3">
                More ▼
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="More Options" className="absolute right-0  mt-2 w-44 bg-gray-50 text-gray-700 font-medium rounded-lg shadow-lg py-2 z-10">
              <DropdownItem key="about" as={Link} href="/about" className="block px-4 py-1 hover:bg-gray-100">
                About Us
              </DropdownItem>
              <DropdownItem key="faq" as={Link} href="/faq" className="block px-4 py-1 hover:bg-gray-100">
                FAQ
              </DropdownItem>
              <DropdownItem key="privacy" as={Link} href="/privacyPolicy" className="block px-4 py-1 hover:bg-gray-100">
                Privacy Policy
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Mobile Menu Button For Responsive*/}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white px-6 py-4 space-y-3 shadow text-cyan-900 font-medium"
          >
            <Link href="/" className="block hover:text-blue-600">Home</Link>
            <Link href="/history" className="block hover:text-blue-600">History</Link>
            <Link href="/HowItWorks" className="block hover:text-blue-600">How It Works</Link>
            <Link href="/contact" className="block hover:text-blue-600">Contact</Link>

            {/* HeroUI Dropdown for Mobile */}
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" className="font-medium text-cyan-900 hover:text-blue-600 -mt-2 -ml-4">
                  More ▼
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="More Options" className="absolute -mt-2 w-44 bg-gray-100 text-gray-700 font-medium rounded-lg shadow-lg py-2 z-10">
                <DropdownItem key="about" as={Link} href="/about" className="block px-4 py-1 hover:bg-gray-100">
                  About Us
                </DropdownItem>
                <DropdownItem key="faq" as={Link} href="/faq" className="block px-4 py-1 hover:bg-gray-100">
                  FAQ
                </DropdownItem>
                <DropdownItem key="privacy" as={Link} href="/privacyPolicy" className="block px-4 py-1 hover:bg-gray-100">
                  Privacy Policy
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
