"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer id="cta" className="relative overflow-hidden mt-[70px] pt-16 lg:pt-24 px-5 lg:px-[84px] pb-10 lg:pb-16 rounded-t-[54px] bg-primary text-white border-t border-line">
      <div className="max-w-[1440px] mx-auto">
        <motion.h2
          className="relative z-10 mb-12 lg:mb-20 font-display text-[clamp(28px,8vw,48px)] lg:text-[80px] font-extrabold leading-none lg:leading-[0.9] uppercase break-words"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block">Mulai</span>
          <span className="block text-white">Sekarang</span>
        </motion.h2>

        <div className="relative mt-32 lg:mt-48">
          <motion.strong
            className="block absolute right-0 bottom-full mb-4 lg:mb-6 text-white/[0.08] font-display text-[clamp(48px,12vw,150px)] leading-none text-right"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Jivara
          </motion.strong>

          <motion.div
            className="flex flex-col lg:flex-row justify-between items-center pt-10 border-t border-white/10 text-white/70 text-[11px] font-bold tracking-[0.16em] uppercase gap-6 lg:gap-0 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            <span>&copy; {new Date().getFullYear()} Jivara</span>
            <div className="flex flex-wrap justify-center gap-4 lg:gap-[34px]">
              <Link href="/docs" className="transition-all duration-300 text-white/60 hover:!text-white">Dokumentasi</Link>
              <Link href="/privacy" className="transition-all duration-300 text-white/60 hover:!text-white">Kebijakan Privasi</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
