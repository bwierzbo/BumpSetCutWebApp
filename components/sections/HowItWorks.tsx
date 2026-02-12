"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Video, Bot, Clapperboard, type LucideIcon } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { howItWorks } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Video,
  Bot,
  Clapperboard,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section id="how-it-works" className="bg-white">
      <Container>
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-wider text-primary mb-3"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground"
          >
            From Game Video to Highlight Reel in Minutes
          </motion.h2>
        </div>

        {/* Steps */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-14 left-[20%] right-[20%] h-0.5 bg-border" />

          {howItWorks.map((step) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div
                key={step.step}
                variants={stepVariants}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/25">
                  <span className="text-lg font-bold text-white">
                    {step.step}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  {Icon && <Icon className="w-6 h-6 text-primary" />}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
