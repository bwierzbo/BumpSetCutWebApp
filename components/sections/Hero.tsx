"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-secondary overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large gradient orb */}
        <motion.div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Secondary orb */}
        <motion.div
          className="absolute bottom-16 -left-24 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Floating volleyball shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-primary/30"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-2/3 left-1/4 w-3 h-3 rounded-full bg-accent/30"
          animate={{ y: [0, -15, 0], x: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/3 left-1/6 w-2 h-2 rounded-full bg-primary-light/40"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <Container className="relative z-10 py-32 md:py-40">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-white/80 font-medium">
              AI-Powered Volleyball Analysis
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
          >
            {siteConfig.tagline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            {siteConfig.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="primary" size="lg" href={siteConfig.appStoreUrl}>
              Download on the App Store
            </Button>
            <Button variant="outline" size="lg" href="#how-it-works">
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
