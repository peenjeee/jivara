"use client";

import { motion } from "motion/react";

interface SecurityCardProps {
  title: string;
  description: string;
  color: string;
}

export default function SecurityCard({
  title,
  description,
  color,
}: SecurityCardProps) {
  return (
    <motion.article
      className="pt-7 border-t border-line cursor-default"
      whileHover={{
        y: -6,
        x: 4,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 22,
      }}
    >
      <h3
        className={`mb-7 ${color} font-display text-base font-extrabold tracking-[0.16em] uppercase`}
      >
        {title}
      </h3>
      <p className="text-muted text-sm leading-relaxed">{description}</p>
    </motion.article>
  );
}
