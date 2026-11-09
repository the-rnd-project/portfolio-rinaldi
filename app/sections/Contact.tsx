"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { BookOpen, Mail, MapPin, Send, Github, Linkedin } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";

const contactInfo = [
  { icon: Mail, label: "Email", value: "rinaldiudra@gmail.com", href: "mailto:rinaldiudra@gmail.com", color: "#00ff88" },
  { icon: Linkedin, label: "LinkedIn", value: "rinaldi-udra-suhanda", href: "https://www.linkedin.com/in/rinaldi-udra-suhanda/", color: "#00d4ff" },
  { icon: MapPin, label: "Location", value: "Banda Aceh, Indonesia", href: "#", color: "#b24bff" },
];

const socials = [
  { icon: Github, href: "https://github.com/rinaldiudrasuhanda", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rinaldi-udra-suhanda/", label: "LinkedIn" },
  { icon: BookOpen, href: "https://rinaldiudrasuhanda.medium.com/", label: "Medium" },
];

// Animated input field
function FormField({
  label, type = "text", value, onChange, placeholder, required = true, rows
}: {
  label: string; type?: string; value: string; onChange: (v: string) => void;
  placeholder: string; required?: boolean; rows?: number;
}) {
  const [focused, setFocused] = useState(false);

  const commonProps = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    placeholder,
    required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className:
      "w-full bg-[#030712] border border-transparent outline-none px-4 py-3 font-mono text-sm text-gray-300 placeholder-[#1a2744] transition-colors resize-none",
  };

  return (
    <div className="relative">
      <label className="font-mono text-xs text-gray-600 block mb-1.5 tracking-widest">{label}</label>
      <motion.div
        className="relative border"
        animate={{
          borderColor: focused ? "rgba(0,255,136,0.5)" : "#1a2744",
          boxShadow: focused ? "0 0 20px rgba(0,255,136,0.08)" : "none",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Corner accents */}
        {focused && (
          <>
            <motion.span className="absolute top-0 left-0 w-2 h-0.5 bg-[#00ff88]" initial={{ width: 0 }} animate={{ width: 8 }} transition={{ duration: 0.2 }} />
            <motion.span className="absolute top-0 left-0 w-0.5 h-2 bg-[#00ff88]" initial={{ height: 0 }} animate={{ height: 8 }} transition={{ duration: 0.2 }} />
            <motion.span className="absolute bottom-0 right-0 w-2 h-0.5 bg-[#00ff88]" initial={{ width: 0 }} animate={{ width: 8 }} transition={{ duration: 0.2 }} />
            <motion.span className="absolute bottom-0 right-0 w-0.5 h-2 bg-[#00ff88]" initial={{ height: 0 }} animate={{ height: 8 }} transition={{ duration: 0.2 }} />
          </>
        )}
        {rows ? (
          <textarea {...commonProps} rows={rows} />
        ) : (
          <input {...commonProps} type={type} />
        )}
      </motion.div>
    </div>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null!);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const yHeading = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const yLeft = useTransform(scrollYProgress, [0, 1], [80, -50]);
  const yRight = useTransform(scrollYProgress, [0, 1], [100, -70]);
  const bgGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.08, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1600));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-16 md:py-20 px-6 relative overflow-hidden">
      {/* Pulsing center glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,136,1) 0%, transparent 70%)",
          opacity: bgGlow,
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="mb-10 md:mb-12 text-center" style={{ y: yHeading }}>
          <motion.div
            className="flex items-center justify-center gap-3 mb-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="font-mono text-xs text-[#00ff88] tracking-widest">05.</span>
            <span className="font-mono text-xs text-gray-500 tracking-widest">{t("CONTACT")}</span>
          </motion.div>
          <motion.h2
            className="font-display text-5xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t("Let’s")} <span className="gradient-text">{t("Connect")}</span>
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("Interested in collaborating on software engineering, web applications, RESTful APIs, or user-centered AI solutions? My inbox is always open.")}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info */}
          <motion.div className="lg:col-span-2 space-y-5" style={{ y: yLeft }}>
            {/* Contact cards */}
            {contactInfo.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 bg-[#0a0f1e] border border-[#1a2744] p-4 group relative overflow-hidden block"
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.12 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  borderColor: `${item.color}50`,
                  boxShadow: `0 8px 32px rgba(0,255,136,0.08)`,
                  x: 6,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className="p-2.5 border border-[#1a2744] flex-shrink-0"
                  style={{ color: item.color }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.15 }}
                >
                  <item.icon size={16} />
                </motion.div>
                <div>
                  <div className="font-mono text-xs text-gray-600">{t(item.label)}</div>
                  <div className="text-sm text-gray-300 group-hover:text-[#00ff88] transition-colors">{item.value}</div>
                </div>
                {/* Hover line */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-0.5"
                  style={{ background: item.color }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.12 + 0.5 }}
                />
              </motion.a>
            ))}

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <p className="font-mono text-xs text-gray-600 tracking-widest mb-3">{t("// FIND ME ONLINE")}</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs px-3 py-2 border border-[#1a2744] text-gray-500"
                    whileHover={{
                      borderColor: "rgba(0,255,136,0.5)",
                      color: "#00ff88",
                      y: -3,
                      boxShadow: "0 6px 20px rgba(0,255,136,0.15)",
                      transition: { duration: 0.15 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.08 }}
                  >
                    <Icon size={13} />
                    {label}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability badge */}
            <motion.div
              className="bg-[#0a0f1e] border border-[#00ff88]/20 p-4 flex items-center gap-3 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.9 }}
              whileHover={{ borderColor: "rgba(0,255,136,0.4)", boxShadow: "0 0 24px rgba(0,255,136,0.08)" }}
            >
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-[#00ff88] flex-shrink-0"
                animate={{
                  boxShadow: ["0 0 4px #00ff88", "0 0 16px #00ff88", "0 0 4px #00ff88"],
                  scale: [1, 1.2, 1],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <div>
                <div className="font-mono text-xs text-[#00ff88]">{t("AVAILABLE FOR HIRE")}</div>
                <div className="font-mono text-xs text-gray-600 mt-0.5">{t("Open to full-time & freelance")}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div className="lg:col-span-3" style={{ y: yRight }}>
            <motion.div
              className="bg-[#0a0f1e] border border-[#1a2744] p-8 relative overflow-hidden"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ borderColor: "rgba(0,255,136,0.15)" }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-7 pb-4 border-b border-[#1a2744]">
                {["bg-red-500/70", "bg-yellow-500/70", "bg-[#00ff88]/70"].map((c, i) => (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-full ${c}`}
                    whileHover={{ scale: 1.3 }}
                  />
                ))}
                <span className="font-mono text-xs text-gray-600 ml-2">send_message.sh</span>
                <motion.span
                  className="ml-auto font-mono text-xs text-[#00ff88]"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                >
                  ●
                </motion.span>
              </div>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    className="text-center py-16"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="font-mono text-[#00ff88] text-2xl mb-3"
                      animate={{ textShadow: ["0 0 10px #00ff88", "0 0 30px #00ff88", "0 0 10px #00ff88"] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      {t("✓ MESSAGE SENT")}
                    </motion.div>
                    <p className="text-gray-400 text-sm">{t("Thank you! I will get back to you soon.")}</p>
                    <motion.button
                      onClick={() => setSent(false)}
                      className="mt-6 font-mono text-xs text-gray-600 hover:text-[#00ff88] transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {t("Send another →")}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField label={t("NAME")} value={form.name} onChange={(v) => setForm(f => ({ ...f, name: v }))} placeholder="John Doe" />
                      <FormField label={t("EMAIL")} type="email" value={form.email} onChange={(v) => setForm(f => ({ ...f, email: v }))} placeholder="john@example.com" />
                    </div>
                    <FormField label={t("SUBJECT")} value={form.subject} onChange={(v) => setForm(f => ({ ...f, subject: v }))} placeholder={t("Project collaboration")} />
                    <FormField label={t("MESSAGE")} value={form.message} onChange={(v) => setForm(f => ({ ...f, message: v }))} placeholder={t("Tell me about your project...")} rows={5} />

                    <motion.button
                      type="submit"
                      disabled={sending}
                      className="group w-full flex items-center justify-center gap-2 font-mono text-sm tracking-widest py-3.5 relative overflow-hidden border border-[#00ff88] text-[#00ff88]"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-[#00ff88]"
                        initial={{ y: "100%" }}
                        whileHover={{ y: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                        {sending ? (
                          <>
                            {t("SENDING...")}
                            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                              ◌
                            </motion.span>
                          </>
                        ) : (
                          <>
                            {t("SEND MESSAGE")}
                            <motion.span whileHover={{ x: 4, rotate: -10 }} transition={{ duration: 0.15 }}>
                              <Send size={14} />
                            </motion.span>
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
