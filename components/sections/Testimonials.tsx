"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { testimonials } from "@/lib/content";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Testimonials() {
  return (
    <Section className="bg-[#F0F1F3]">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-[#1A2332] text-center mb-12"
        >
          Trusted by Players and Coaches
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="relative bg-white rounded-2xl p-8 shadow-sm"
            >
              <Quote className="w-8 h-8 text-[#FF6B35]/20 mb-4" />

              <p className="text-[#1A2332] italic leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 fill-[#FF6B35] text-[#FF6B35]"
                  />
                ))}
              </div>

              <div>
                <p className="font-bold text-[#1A2332]">{testimonial.name}</p>
                <p className="text-sm text-[#6B7280]">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
