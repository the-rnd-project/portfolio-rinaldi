"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import type { Language } from "../i18n/translations";

const options: { value: Language; code: string; label: string }[] = [
  { value: "en", code: "EN", label: "English" },
  { value: "id", code: "ID", label: "Bahasa Indonesia" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();
  const reduceMotion = useReducedMotion();
  const selectedIndex = options.findIndex((option) => option.value === language);
  const selected = options[selectedIndex];

  useEffect(() => {
    if (open) optionRefs.current[focusedIndex]?.focus();
  }, [open, focusedIndex]);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  const openMenu = (index: number) => {
    setFocusedIndex(index);
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex((index) => (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
        break;
      case "Home":
      case "End":
        event.preventDefault();
        setFocusedIndex(event.key === "Home" ? 0 : options.length - 1);
        break;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        closeMenu();
        break;
      case "Tab":
        closeMenu();
        break;
    }
  };

  return (
    <div
      ref={rootRef}
      className="relative shrink-0"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${t("Choose language")}: ${selected.label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => open ? setOpen(false) : openMenu(selectedIndex)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openMenu(event.key === "ArrowDown" ? 0 : options.length - 1);
          }
        }}
        className={`flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ff88] ${open ? "border-[#00ff88]/50 bg-[#00ff88]/10 text-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.08)]" : "border-[#1a2744] bg-[#0a0f1e]/80 text-gray-300 hover:border-[#00ff88]/40 hover:text-[#00ff88]"}`}
      >
        <Languages size={15} aria-hidden="true" className="text-[#00ff88]" />
        <span className="sm:hidden">{selected.code}</span>
        <span className="hidden sm:inline" lang={selected.value}>{selected.value === "id" ? "Indonesia" : selected.label}</span>
        <ChevronDown size={13} aria-hidden="true" className={`transition-transform motion-reduce:transition-none ${open ? "rotate-180" : "rotate-0"}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="language-menu"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -6, scale: reduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -4, scale: reduceMotion ? 1 : 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.16 }}
            className="absolute right-0 top-full z-50 mt-3 w-64 max-w-[calc(100vw-6rem)] origin-top-right overflow-hidden rounded-xl border border-[#24334e] bg-[#080f20] p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_24px_rgba(0,255,136,0.05)]"
          >
            <div aria-hidden="true" className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/60 to-transparent" />
            <div id={`${menuId}-label`} className="px-3 pb-2 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
              {t("Choose language")}
            </div>
            <div id={menuId} role="menu" aria-labelledby={`${menuId}-label`} onKeyDown={handleMenuKeyDown}>
              {options.map((option, index) => {
                const active = language === option.value;
                return (
                  <button
                    key={option.value}
                    ref={(element) => { optionRefs.current[index] = element; }}
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    tabIndex={-1}
                    onFocus={() => setFocusedIndex(index)}
                    onClick={() => { setLanguage(option.value); closeMenu(); }}
                    className={`my-1 flex min-h-12 w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors outline-none focus-visible:border-[#00d4ff]/50 focus-visible:bg-[#00d4ff]/10 ${active ? "border-[#00ff88]/20 bg-[#00ff88]/[0.07] text-white" : "border-transparent text-slate-300 hover:bg-white/[0.04] hover:text-white"}`}
                  >
                    <span aria-hidden="true" className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border font-mono text-[10px] ${active ? "border-[#00ff88]/30 bg-[#00ff88]/10 text-[#00ff88]" : "border-[#24334e] bg-[#0e1830] text-slate-400"}`}>
                      {option.code}
                    </span>
                    <span lang={option.value} className="text-sm font-medium">{option.label}</span>
                    {active && <Check size={15} aria-hidden="true" className="ml-auto shrink-0 text-[#00ff88]" />}
                  </button>
                );
              })}
            </div>
            <p className="mt-1 border-t border-[#1a2744] px-3 pb-2 pt-3 text-[11px] leading-relaxed text-slate-500">
              {t("Your preference is saved")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
