"use client";
import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
  useMotionValue,
  animate,
} from "framer-motion";
import { BookOpen, Code2, Database, Cpu } from "lucide-react";
import dynamic from "next/dynamic";
import { useLanguage } from "../i18n/LanguageProvider";

const FloatingSphere = dynamic(() => import("../components/FloatingSphere"), { ssr: false });

const stats = [
  { value: "5", label: "Professional Years" },
  { value: "6", label: "Teaching Roles" },
  { value: "3", label: "Registered Apps" },
  { value: "2026", label: "AI Master's Track" },
];

const highlights = [
  { icon: Code2, title: "Python & RESTful API", desc: "Flask, web services, unit testing", color: "#00ff88" },
  { icon: Cpu, title: "Web & Mobile Apps", desc: "Laravel, Flask, Flutter, user flows", color: "#00d4ff" },
  { icon: Database, title: "Software Design", desc: "Scrum, GDD, UML, requirements", color: "#b24bff" },
  { icon: BookOpen, title: "AI & UX Foundation", desc: "Applied ML, usability testing, user manuals", color: "#00ff88" },
];

function AnimatedStat({ stat, index }: { stat: typeof stats[number]; index: number }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "-32px" });
  const reduceMotion = useReducedMotion();
  const isYear = stat.label === "AI Master's Track";
  const count = useMotionValue(isYear ? Number(stat.value) : 0);
  const display = useTransform(count, (value) => Math.round(value).toString());

  useEffect(() => {
    if (!visible || isYear) return;
    const controls = animate(count, Number(stat.value), {
      duration: reduceMotion ? 0 : 1.3,
      delay: reduceMotion ? 0 : index * 0.1,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [visible, isYear, count, stat.value, index, reduceMotion]);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden bg-[#0a0f1e] border border-[#1a2744] p-4"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.08 }}
      whileHover={{
        y: reduceMotion ? 0 : -4,
        borderColor: "rgba(0,255,136,0.4)",
        boxShadow: "0 8px 32px rgba(0,255,136,0.1)",
        transition: { duration: 0.2 },
      }}
    >
      <div className="font-display text-3xl font-bold gradient-text tabular-nums">
        <span className="sr-only">{stat.value}</span>
        <motion.span aria-hidden="true">{display}</motion.span>
      </div>
      <div className="font-mono text-xs text-gray-500 mt-1 tracking-wider">{t(stat.label).toUpperCase()}</div>
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-[#00ff88]/70 to-[#00d4ff]/10"
        initial={{ scaleX: reduceMotion ? 1 : 0 }}
        animate={visible ? { scaleX: 1 } : {}}
        transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : index * 0.1 }}
      />
    </motion.div>
  );
}

export default function About() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null!);
  const headingRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const headingVisible = useInView(headingRef, { once: true, margin: "-32px" });
  const profileVisible = useInView(profileRef, { once: true, margin: "-48px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // Parallax layers
  const yLeft = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yRight = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const ySphere = useTransform(scrollYProgress, [0, 1], [40, -120]);
  const rotSphere = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const springYSphere = useSpring(ySphere, { stiffness: 60, damping: 20 });
  const springRot = useSpring(rotSphere, { stiffness: 60, damping: 20 });

  const itemVar = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28, filter: reduceMotion ? "none" : "blur(6px)" },
    show: (i: number) => ({
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section id="about" ref={sectionRef} className="about-section py-16 md:py-20 px-6 relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-32 h-72 about-reveal-grid"
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
        animate={headingVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: reduceMotion ? 0 : 1.5 }}
      />
      {/* Ambient BG orb */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          opacity: sectionOpacity,
        }}
      />

      {/* Decorative 3D background */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[46%] top-[56%] hidden h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 opacity-45 lg:block xl:left-1/2 motion-reduce:!hidden"
        style={{ y: springYSphere, rotate: springRot }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 0.45, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-8 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.16) 0%, rgba(0,255,136,0.08) 38%, transparent 68%)" }}
        />
        <FloatingSphere />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          className="mb-8 md:mb-10"
          style={{ y: reduceMotion ? 0 : yLeft }}
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.span
              className="font-mono text-xs text-[#00ff88] tracking-widest"
              initial={{ opacity: 0 }}
              animate={headingVisible ? { opacity: 1 } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.6 }}
            >
              01.
            </motion.span>
            <span className="font-mono text-xs text-gray-500 tracking-widest">{t("ABOUT_ME")}</span>
          </div>
          <h2 aria-label={`${t("Who Am")} ${t("I?")}`} className="font-display text-5xl md:text-6xl font-bold text-white">
            {[t("Who Am"), t("I?")].map((word, index) => (
              <span key={index} aria-hidden="true" className="inline-block overflow-hidden pb-2 align-bottom">
                <motion.span
                  className={`inline-block ${index === 1 ? "gradient-text" : "mr-[0.24em]"}`}
                  initial={{ y: reduceMotion ? 0 : "110%", opacity: 0 }}
                  animate={headingVisible ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: reduceMotion ? 0 : 0.95, delay: reduceMotion ? 0 : 0.1 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
          <motion.div
            className="h-0.5 bg-gradient-to-r from-[#00ff88] to-transparent mt-4"
            initial={{ width: 0 }}
            animate={headingVisible ? { width: 96 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 xl:gap-16 items-start">
          {/* Left: Text */}
          <motion.div className="space-y-6" style={{ y: reduceMotion ? 0 : yLeft }}>
            {[
              <><span className="text-[#00d4ff] font-medium">{t("AI Master’s candidate")}</span>{t(" with ")}<span className="text-[#00ff88] font-medium">{t("5 years of experience")}</span>{t(" in web and mobile application development.")}{t(" Experienced in designing, developing, and maintaining scalable digital solutions, with a strong foundation in software engineering and applied AI.")}</>,
              <>{t("Skilled in building applications using ")}<span className="text-[#00ff88] font-medium">{t("Python and Flutter")}</span>{t(", as well as developing intelligent systems with ")}<span className="text-[#00d4ff] font-medium">{t("machine learning and computer vision")}</span>{t(". Passionate about combining software engineering and AI to create practical, user-centered, and impactful solutions.")}</>,
            ].map((text, i) => (
              <motion.p
                key={i}
                className={`leading-relaxed ${i === 0 ? "text-gray-300 text-lg" : "text-gray-400"}`}
                custom={i}
                variants={itemVar}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                {text}
              </motion.p>
            ))}

            {/* Terminal block */}
            <motion.div
              className="bg-[#0a0f1e] border border-[#1a2744] p-5 font-mono text-sm"
              custom={2}
              variants={itemVar}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{
                borderColor: "rgba(0,255,136,0.4)",
                boxShadow: "0 0 30px rgba(0,255,136,0.08)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#1a2744]">
                {["bg-red-500", "bg-yellow-500", "bg-green-500"].map((c, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${c} opacity-80`} />
                ))}
                <span className="text-gray-600 text-xs ml-2">profile.json</span>
              </div>
              <div className="space-y-1 text-xs leading-relaxed">
                <div><span className="text-[#b24bff]">const</span> <span className="text-[#00d4ff]">profile</span> <span className="text-gray-400">=</span> {"{"}</div>
                {[
                  ["name", "\"Rinaldi Udra Suhanda\""],
                  ["role", "\"Software Engineer\""],
                  ["focus", "[\"AI\", \"Software Engineering\", \"Web\"]"],
                  ["location", "\"Banda Aceh, Indonesia\""],
                  ["available", "true"],
                ].map(([k, v], index) => (
                  <motion.div
                    key={k}
                    className="pl-4"
                    initial={{ opacity: 0, x: reduceMotion ? 0 : -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.2 + index * 0.1 }}
                  >
                    <span className="text-[#00ff88]">"{k}"</span>
                    <span className="text-gray-400">: </span>
                    <span className={v === "true" ? "text-[#00ff88]" : "text-yellow-300"}>{v}</span>
                    {k !== "available" && <span className="text-gray-600">,</span>}
                  </motion.div>
                ))}
                <div>{"}"}</div>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <AnimatedStat key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Right: profile and highlights */}
          <motion.div className="space-y-5 lg:pt-2" style={{ y: reduceMotion ? 0 : yRight }}>
            <motion.div
              ref={profileRef}
              className="relative overflow-hidden border border-[#1a2744] bg-[#0a0f1e] p-3"
              custom={0}
              variants={itemVar}
              initial="hidden"
              animate={profileVisible ? "show" : "hidden"}
              whileHover={{
                y: reduceMotion ? 0 : -4,
                borderColor: "rgba(0,255,136,0.45)",
                boxShadow: "0 16px 42px rgba(0,255,136,0.1)",
                transition: { duration: 0.2 },
              }}
            >
              <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-[#00ff88] via-[#00d4ff] to-[#b24bff]" />
              <div className="grid items-center gap-6 sm:grid-cols-[170px_1fr]">
                <div data-revealed={profileVisible} className="about-portrait relative aspect-[4/5] overflow-hidden border border-[#2a3b61] bg-[#030712] shadow-2xl">
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 52%, rgba(3,7,18,0.78) 100%), radial-gradient(circle at 35% 12%, rgba(0,255,136,0.16), transparent 38%)",
                    }}
                  />
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-3 z-20"
                    initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.15 }}
                    animate={profileVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.4 }}
                  >
                    <span className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-[#00ff88]" />
                    <span className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-[#00d4ff]/60" />
                    <span className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-[#00ff88]/60" />
                    <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-[#00d4ff]" />
                  </motion.div>
                  <motion.img
                    src="/images/profil.png"
                    alt={t("Rinaldi Udra Suhanda profile photo")}
                    className="h-full w-full object-cover object-center"
                    initial={{ scale: reduceMotion ? 1 : 1.08, filter: reduceMotion ? "none" : "grayscale(1) brightness(0.7)" }}
                    animate={profileVisible ? { scale: 1, filter: "grayscale(0) brightness(1)" } : {}}
                    transition={{ duration: reduceMotion ? 0 : 1.6, delay: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div aria-hidden="true" className="about-portrait-scan pointer-events-none absolute inset-0 z-30" />
                </div>
                <div>
                  <div className="font-mono text-xs tracking-widest text-[#00ff88]">{t("PROFILE")}</div>
                  <div className="mt-2 font-display text-lg font-semibold text-white">Rinaldi Udra Suhanda</div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {t("Master's Degree Candidate in Artificial Intelligence with practical experience building software, RESTful APIs, web applications, and user documentation.")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Highlights */}
            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4 bg-[#0a0f1e]/90 border border-[#1a2744] p-4 group cursor-default backdrop-blur-sm"
                  custom={i}
                  variants={itemVar}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  whileHover={{
                    x: reduceMotion ? 0 : 6,
                    borderColor: `${item.color}40`,
                    boxShadow: `0 4px 24px ${item.color}10`,
                    transition: { duration: 0.2 },
                  }}
                >
                  <motion.div
                    className="p-2 border border-[#1a2744] flex-shrink-0"
                    style={{ color: item.color }}
                    whileHover={{ rotate: reduceMotion ? 0 : 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon size={16} />
                  </motion.div>
                  <div>
                    <div className="font-display font-semibold text-white text-sm group-hover:text-[#00ff88] transition-colors">{t(item.title)}</div>
                    <div className="font-mono text-xs text-gray-500 mt-0.5">{t(item.desc)}</div>
                  </div>
                  <motion.div
                    className="ml-auto text-gray-700 group-hover:text-[#00ff88] text-xs font-mono"
                    initial={{ opacity: 0, x: -8 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    →
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
