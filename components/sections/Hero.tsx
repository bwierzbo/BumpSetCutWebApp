"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Copy column */}
          <div className="text-center lg:text-left">
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight"
            >
              {siteConfig.tagline}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              {siteConfig.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                href={siteConfig.appStoreUrl}
                comingSoon={siteConfig.appStoreComingSoon}
              >
                Download on the App Store
              </Button>
              <Button variant="outline" size="lg" href="#how-it-works">
                Watch Demo
              </Button>
            </motion.div>
          </div>

          {/* Product visual column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            {/* TODO: replace this placeholder phone mockup with a real app screenshot/video */}
            <PhoneMockup />
          </motion.div>
        </div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

/**
 * Branded placeholder phone mockup. Pure CSS/SVG so it ships with no binary asset.
 * TODO: swap the screen contents for a real app screenshot or looping demo video.
 */
function PhoneMockup() {
  return (
    <div className="relative">
      {/* Glow behind the device */}
      <div className="absolute inset-0 -m-8 rounded-[3rem] bg-gradient-to-br from-primary/40 to-accent/30 blur-3xl" />

      {/* Device frame */}
      <div className="relative w-[260px] sm:w-[300px] aspect-[9/19] rounded-[2.75rem] bg-[#0D0D0E] p-3 shadow-2xl ring-1 ring-white/10">
        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-primary via-[#2563EB] to-accent">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0D0D0E] rounded-b-2xl z-10" />

          {/* Faux rally-feed UI */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-white">
            <motion.div
              className="flex items-center justify-center w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm border border-white/25"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Play className="w-9 h-9 fill-white" />
            </motion.div>
            <div className="text-center px-6">
              <p className="text-sm font-semibold tracking-wide">Rally 1 of 12</p>
              <p className="text-xs text-white/70 mt-1">AI-detected highlight</p>
            </div>
          </div>

          {/* Bottom scrub bar hint */}
          <div className="absolute bottom-6 left-5 right-5">
            <div className="h-1.5 rounded-full bg-white/25">
              <div className="h-full w-1/3 rounded-full bg-white" />
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-white/70">
              <span>0:03</span>
              <span>0:09</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
