"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Target,
  Smartphone,
  FolderOpen,
  Globe,
  Download,
  Star,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { features } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Target,
  Smartphone,
  FolderOpen,
  Globe,
  Download,
  Star,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section id="features" className="bg-background">
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
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground"
          >
            Smart Volleyball Analysis
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-foreground-muted max-w-2xl mx-auto text-lg"
          >
            Everything you need to capture, analyze, and share your best
            volleyball moments.
          </motion.p>
        </div>

        {/* Feature cards grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-border p-6 md:p-8 transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  {Icon && <Icon className="w-6 h-6 text-primary" />}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
