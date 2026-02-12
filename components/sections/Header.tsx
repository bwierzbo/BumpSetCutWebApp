"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { navLinks, siteConfig } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="text-xl md:text-2xl font-bold text-primary">
            {siteConfig.name}
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                    scrolled ? "text-foreground" : "text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button variant="primary" size="sm" href={siteConfig.appStoreUrl}>
              Download
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className={`w-6 h-6 ${scrolled ? "text-foreground" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? "text-foreground" : "text-white"}`} />
            )}
          </button>
        </nav>
      </Container>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 bg-white z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center gap-8 pt-16">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button
                variant="primary"
                size="md"
                href={siteConfig.appStoreUrl}
                onClick={handleLinkClick}
              >
                Download
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
