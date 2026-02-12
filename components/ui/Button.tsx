"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#FF6B35] text-white hover:bg-[#E55A2B] shadow-lg shadow-[#FF6B35]/25",
  secondary: "bg-[#1A2332] text-white hover:bg-[#243044]",
  outline:
    "border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  target,
  rel,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-xl font-semibold transition-colors duration-200 cursor-pointer",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
