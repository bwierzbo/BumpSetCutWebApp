"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { faqItems } from "@/lib/content";
import Link from "next/link";

const displayedFaqs = faqItems.slice(0, 8);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-[#1A2332] text-center mb-12"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="max-w-3xl mx-auto space-y-3">
          {displayedFaqs.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                >
                  <span className="font-semibold text-[#1A2332]">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-[#6B7280]" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 text-sm text-[#6B7280] leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="text-[#FF6B35] font-semibold hover:underline"
          >
            View all FAQs &rarr;
          </Link>
        </div>
      </Container>
    </Section>
  );
}
