"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { faqItems } from "@/lib/content";

const categories = [
  "General",
  "Technical",
  "Account & Billing",
  "Privacy & Content",
  "Troubleshooting",
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-lg font-medium text-secondary">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-foreground-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-foreground-muted leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Header />
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              Everything you need to know about BumpSetCut. Can&apos;t find the
              answer you&apos;re looking for? Contact us at{" "}
              <a
                href="mailto:support@bumpsetcut.com"
                className="text-primary hover:text-primary-dark underline"
              >
                support@bumpsetcut.com
              </a>
            </p>
          </div>

          {categories.map((category) => {
            const items = faqItems.filter(
              (item) => item.category === category
            );
            if (items.length === 0) return null;

            return (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-secondary mb-6">
                  {category}
                </h2>
                <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                  {items.map((item) => (
                    <FAQItem
                      key={item.question}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
