"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { href: "#home", label: "HOME" },
  { href: "#about", label: "ABOUT" },
  { href: "#skills", label: "SKILLS" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#contact", label: "CONTACT" },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Active section detection
      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 160) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler that works with Lenis
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: 0, duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-[100] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #00ff88, #00d4ff, #b24bff)",
          boxShadow: "0 0 8px rgba(0,255,136,0.6)",
        }}
      />

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      >
        <motion.div
          className="transition-all duration-500"
          animate={{
            backgroundColor: scrolled ? "rgba(3,7,18,0.88)" : "rgba(3,7,18,0)",
            borderBottomColor: scrolled ? "rgba(26,39,68,0.8)" : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
          }}
          style={{ borderBottomWidth: 1 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="font-mono text-lg font-bold flex items-center gap-1"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="text-[#00ff88]"
                animate={{ textShadow: ["0 0 6px #00ff88", "0 0 16px #00ff88", "0 0 6px #00ff88"] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                &gt;_
              </motion.span>
              <span className="text-white ml-1 sm:hidden">Rinaldi</span>
              <span className="text-white ml-1 hidden sm:inline">RinaldiUdraSuhanda</span>
            </motion.a>

            {/* Desktop nav */}
            <div className="hidden xl:flex items-center gap-5">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-mono text-xs tracking-widest relative group"
                    style={{ color: isActive ? "#00ff88" : "#9ca3af" }}
                    whileHover={{ color: "#00ff88" }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.06 }}
                  >
                    {t(link.label)}
                    {/* Active/hover underline */}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-px bg-[#00ff88]"
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? "100%" : "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.25 }}
                    />
                    {/* Active dot */}
                    {isActive && (
                      <motion.span
                        className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00ff88]"
                        layoutId="activeNavDot"
                        style={{ boxShadow: "0 0 6px #00ff88" }}
                      />
                    )}
                  </motion.a>
                );
              })}

              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="font-mono text-xs tracking-widest px-4 py-2 relative overflow-hidden group border border-[#00ff88] text-[#00ff88]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <motion.span
                  className="absolute inset-0 bg-[#00ff88]"
                  initial={{ x: "-101%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.25 }}
                />
                <span className="relative group-hover:text-black transition-colors duration-250">{t("HIRE ME")}</span>
              </motion.a>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSwitcher />

              {/* Mobile button */}
              <motion.button
                className="xl:hidden text-[#00ff88] p-1"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={t(menuOpen ? "Close menu" : "Open menu")}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X size={22} />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu size={22} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-navigation"
              className="xl:hidden bg-[#030712]/95 backdrop-blur-xl border-b border-[#1a2744] px-6 py-6 flex flex-col gap-1"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-mono text-sm tracking-widest text-gray-400 hover:text-[#00ff88] transition-colors py-2 flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className="text-[#00ff88] opacity-50">{String(i + 1).padStart(2, "0")}.</span>
                  {t(link.label)}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
