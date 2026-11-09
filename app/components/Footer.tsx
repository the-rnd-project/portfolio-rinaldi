"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../i18n/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null!);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.footer
      ref={ref}
      className="border-t border-[#1a2744] py-10 px-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Glow line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #00ff88, #00d4ff, #b24bff, transparent)" }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          className="font-mono text-xs text-gray-600"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <motion.span
            className="text-[#00ff88]"
            animate={{ textShadow: ["0 0 4px #00ff88", "0 0 12px #00ff88", "0 0 4px #00ff88"] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            &gt;_
          </motion.span>{" "}
          {t("Built with")}{" "}
          <span className="text-gray-500">Next.js</span>,{" "}
          <span className="text-gray-500">Three.js</span> &{" "}
          <span className="text-gray-500">Framer Motion</span> {t("by")}{" "}
          <span className="text-[#00ff88]">Rinaldi Udra Suhanda</span>
        </motion.div>

        <motion.div
          className="font-mono text-xs text-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          © {new Date().getFullYear()} {t("All rights reserved.")}
        </motion.div>
      </div>
    </motion.footer>
  );
}
