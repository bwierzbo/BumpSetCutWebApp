"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { pricing, siteConfig } from "@/lib/content";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

function PlanCard({
  plan,
  index,
}: {
  plan: (typeof pricing)["free"] | (typeof pricing)["pro"];
  index: number;
}) {
  const isHighlighted = plan.highlighted;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative rounded-2xl bg-white p-8 flex flex-col ${
        isHighlighted
          ? "shadow-xl scale-[1.02] border-t-4 border-t-[#FF6B35] ring-1 ring-[#FF6B35]/10"
          : "shadow-md border border-[#E5E7EB]"
      }`}
    >
      {isHighlighted && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6B35] text-white text-xs font-semibold px-4 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#1A2332]">{plan.name}</h3>
        <p className="text-sm text-[#6B7280] mt-1">{plan.tagline}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold text-[#1A2332]">{plan.price}</span>
        {plan.period && (
          <span className="text-[#6B7280] text-base">{plan.period}</span>
        )}
      </div>

      <ul className="flex-1 space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[#00C896] shrink-0 mt-0.5" />
            <span
              className={`text-sm text-[#1A2332] ${
                isHighlighted && i < 4 ? "font-bold" : ""
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button
        variant={isHighlighted ? "primary" : "outline"}
        size="lg"
        href={siteConfig.appStoreUrl}
        className="w-full"
      >
        {plan.cta}
      </Button>

      {isHighlighted && (
        <p className="text-xs text-[#6B7280] text-center mt-3">
          Cancel anytime. No commitment.
        </p>
      )}
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <Section id="pricing">
      <Container>
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[#1A2332]"
          >
            Start Free. Upgrade When Ready.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-start">
          <PlanCard plan={pricing.free} index={0} />
          <PlanCard plan={pricing.pro} index={1} />
        </div>
      </Container>
    </Section>
  );
}
