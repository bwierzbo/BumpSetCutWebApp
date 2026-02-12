"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/content";

export default function CTA() {
  return (
    <Section className="bg-[#1A2332] relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/10 via-transparent to-[#00C896]/10 pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Ready to Level Up Your Volleyball Game?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-white/70 mb-8"
          >
            Join thousands of players and coaches using {siteConfig.name} to
            capture, review, and share their best volleyball moments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="primary" size="lg" href={siteConfig.appStoreUrl}>
              Download on iOS
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="#how-it-works"
              className="border-white text-white hover:bg-white hover:text-[#1A2332]"
            >
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
