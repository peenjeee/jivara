"use client";

import React from "react";
import { motion } from "motion/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export default function Button({
  children,
  className = "",
  icon,
  variant = "primary",
  size = "md",
  loading = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold tracking-[0.1em] uppercase leading-none rounded-full relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed group";

  const sizeStyles = {
    sm: "py-3 px-7 text-[13px] gap-2.5",
    md: "py-4 px-9 text-[13px] gap-2.5",
    lg: "py-5 px-10 text-base gap-3",
  };

  const variantStyles = {
    primary:
      "bg-primary text-white border border-white/10",
    outline:
      "bg-transparent text-primary border-2 border-primary",
  };

  const hoverVariants = {
    primary: {
      filter: "brightness(1.1)",
    },
    outline: {
      backgroundColor: "var(--primary)",
      color: "#ffffff",
    },
  };

  return (
    <motion.button
      {...(props as React.ComponentProps<typeof motion.button>)}
      disabled={props.disabled || loading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      whileHover={props.disabled || loading ? undefined : hoverVariants[variant]}
      whileTap={props.disabled || loading ? undefined : { y: -1, scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {children}

          {icon && (
            <motion.span
              className="relative z-10 flex items-center justify-center"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {icon}
            </motion.span>
          )}
        </>
      )}
    </motion.button>
  );
}
