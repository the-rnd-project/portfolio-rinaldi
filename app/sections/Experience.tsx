"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Briefcase, GraduationCap, Award, ExternalLink } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Programmer",
    company: "Universitas Syiah Kuala",
    period: "Sep 2025 – Present",
    image: "/career-ai-platform.svg",
    link: "#projects",
    linkLabel: "Current focus",
    desc: [
      "Melanjutkan pekerjaan software engineering di lingkungan Universitas Syiah Kuala",
      "Berfokus pada pengembangan sistem, aplikasi internal, dan kebutuhan teknologi berbasis data",
      "Menggabungkan pengalaman software engineering dengan studi Master Kecerdasan Buatan",
    ],
    color: "#00ff88",
    glow: "rgba(0,255,136,0.12)",
  },
  {
    type: "work",
    title: "Programmer",
    company: "UPT Laboratorium Terpadu",
    period: "May 2022 – Aug 2025",
    image: "/career-backend-ml.svg",
    link: "#projects",
    linkLabel: "Related projects",
    desc: [
      "Mengimplementasikan Agile Software Development dengan Scrum dan Goal-Directed Design",
      "Menganalisis requirement, membuat UML, persona, storyboard, UI, dan user manual aplikasi",
      "Mengembangkan RESTful API, aplikasi web Flask, aplikasi mobile Flutter, serta testing dengan Python Unit Test",
    ],
    color: "#00d4ff",
    glow: "rgba(0,212,255,0.12)",
  },
  {
    type: "work",
    title: "Laboratory Teaching Assistant",
    company: "Universitas Syiah Kuala",
    period: "Sep 2019 – Jun 2021",
    image: "/career-education.svg",
    link: "#skills",
    linkLabel: "Teaching areas",
    desc: [
      "Mengajar dan mendampingi praktikum Software Engineering, Python, C, Software Architecture, HCI, dan Requirements Engineering",
      "Membantu mahasiswa memahami konsep pemrograman, perancangan sistem, dan rekayasa kebutuhan",
      "Berpengalaman sebagai assistant lintas beberapa mata kuliah selama 1 tahun 10 bulan",
    ],
    color: "#b24bff",
    glow: "rgba(178,75,255,0.12)",
  },
  {
    type: "work",
    title: "Web Developer",
    company: "Dinas Kebudayaan dan Pariwisata Aceh",
    period: "Jan 2020 – Feb 2020",
    image: "/career-ai-platform.svg",
    link: "#projects",
    linkLabel: "Tourism system",
    desc: [
      "Mengembangkan sistem informasi destinasi wisata berbasis web menggunakan Laravel Framework",
      "Menggunakan MySQL sebagai database management system",
      "Membuat desain UML, business process, UI, user manual, dan testing bersama pengguna",
    ],
    color: "#00ff88",
    glow: "rgba(0,255,136,0.12)",
  },
  {
    type: "work",
    title: "Evaluator Assistant",
    company: "Kementerian PANRB",
    period: "Nov 2019 – Dec 2019",
    image: "/career-education.svg",
    link: "#about",
    linkLabel: "Evaluation scope",
    desc: [
      "Mengevaluasi unit pelayanan publik berbasis elektronik",
      "Menilai aspek efficiency, reliability, citizen support, usability, information, dan service interaction",
      "Mendapat pengalaman awal dalam evaluasi layanan digital sektor publik",
    ],
    color: "#00d4ff",
    glow: "rgba(0,212,255,0.12)",
  },
];

const certifications = [
  { name: "Database Design", issuer: "Certification", year: "LinkedIn profile", color: "#00ff88" },
  { name: "Database Programming with SQL", issuer: "Certification", year: "LinkedIn profile", color: "#00d4ff" },
  { name: "Google Professional UX Design Course", issuer: "Google", year: "LinkedIn profile", color: "#b24bff" },
  { name: "Aplikasi Pemeliharaan Fasilitas Gedung", issuer: "Patent / Registered work", year: "2023", color: "#00ff88" },
  { name: "Aplikasi Dirawat.in", issuer: "Patent / Registered work", year: "2023", color: "#00d4ff" },
  { name: "Aplikasi LPH", issuer: "Patent / Registered work", year: "2022", color: "#b24bff" },
];

function TimelineItem({ exp, index, progress }: { exp: typeof experiences[0]; index: number; progress: any }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={itemRef}
      className="flex gap-6 group"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Timeline dot */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <motion.div
          className="w-8 h-8 flex items-center justify-center z-10 mt-1"
          whileHover={{ scale: 1.2 }}
        >
          <motion.div
            className="w-3.5 h-3.5 rounded-full border-2"
            style={{ borderColor: exp.color }}
            animate={{
              boxShadow: [
                `0 0 6px ${exp.color}`,
                `0 0 18px ${exp.color}`,
                `0 0 6px ${exp.color}`,
              ],
              background: [`${exp.color}20`, `${exp.color}50`, `${exp.color}20`],
            }}
            transition={{ repeat: Infinity, duration: 2.5, delay: index * 0.5 }}
          />
        </motion.div>
        {index < experiences.length - 1 && (
          <motion.div
            className="w-px flex-1 mt-2"
            style={{ background: `linear-gradient(to bottom, ${exp.color}60, transparent)` }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: index * 0.15 + 0.3 }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        className="flex-1 bg-[#030712] border border-[#1a2744] p-5 mb-6 relative overflow-hidden"
        whileHover={{
          borderColor: `${exp.color}50`,
          boxShadow: `0 12px 40px ${exp.glow}`,
          x: 6,
          transition: { duration: 0.2 },
        }}
      >
        <motion.a
          href={exp.link}
          className="block mb-5 overflow-hidden border border-[#1a2744] bg-[#0a0f1e]"
          aria-label={`${exp.linkLabel}: ${exp.title}`}
          whileHover={{ borderColor: `${exp.color}70` }}
          transition={{ duration: 0.2 }}
        >
          <motion.img
            src={exp.image}
            alt={`${exp.title} visual`}
            className="h-36 w-full object-cover opacity-80 grayscale-[35%] transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.a>

        {/* Left accent line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{ background: exp.color }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
        />

        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <motion.span
              className="font-mono text-xs tracking-widest block mb-1"
              style={{ color: exp.color }}
            >
              {exp.company}
            </motion.span>
            <h4 className="font-display font-bold text-white group-hover:text-[#00ff88] transition-colors">
              {exp.title}
            </h4>
          </div>
          <span className="font-mono text-xs text-gray-600 flex-shrink-0 bg-[#0a0f1e] px-2 py-1 border border-[#1a2744]">
            {exp.period}
          </span>
        </div>

        <ul className="space-y-1.5">
          {exp.desc.map((d, j) => (
            <motion.li
              key={j}
              className="text-gray-500 text-sm flex gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + j * 0.08 + 0.5 }}
            >
              <motion.span
                className="flex-shrink-0 mt-0.5"
                style={{ color: exp.color }}
                animate={{ x: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: j * 0.3 }}
              >
                ›
              </motion.span>
              {d}
            </motion.li>
          ))}
        </ul>

        <motion.a
          href={exp.link}
          className="mt-5 inline-flex items-center gap-2 font-mono text-xs tracking-widest border border-[#1a2744] px-3 py-2 text-gray-500 transition-colors hover:text-white"
          style={{ borderColor: `${exp.color}35` }}
          whileHover={{ x: 3, borderColor: `${exp.color}80`, color: exp.color }}
          whileTap={{ scale: 0.97 }}
        >
          {exp.linkLabel}
          <ExternalLink size={12} />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null!);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const yLeft = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const yRight = useTransform(scrollYProgress, [0, 1], [120, -80]);
  const yHeading = useTransform(scrollYProgress, [0, 1], [50, -30]);

  return (
    <section id="experience" ref={sectionRef} className="py-36 px-6 relative bg-[#0a0f1e]/30 overflow-hidden">
      {/* Animated BG line */}
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-px"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(0,255,136,0.1), transparent)",
          height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
          opacity: 0.4,
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="mb-20" style={{ y: yHeading }}>
          <motion.div
            className="flex items-center gap-3 mb-3"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="font-mono text-xs text-[#00ff88] tracking-widest">04.</span>
            <span className="font-mono text-xs text-gray-500 tracking-widest">EXPERIENCE</span>
          </motion.div>
          <motion.h2
            className="font-display text-5xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Career <span className="gradient-text">Journey</span>
          </motion.h2>
          <motion.div
            className="h-0.5 bg-gradient-to-r from-[#00ff88] to-transparent mt-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Timeline */}
          <motion.div style={{ y: yLeft }}>
            <motion.h3
              className="font-mono text-xs text-gray-500 tracking-widest mb-10 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Briefcase size={12} className="text-[#00ff88]" />
              WORK & EDUCATION
            </motion.h3>

            <div>
              {experiences.map((exp, i) => (
                <TimelineItem key={i} exp={exp} index={i} progress={scrollYProgress} />
              ))}
            </div>
          </motion.div>

          {/* Certifications + Languages */}
          <motion.div style={{ y: yRight }}>
            <motion.h3
              className="font-mono text-xs text-gray-500 tracking-widest mb-10 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Award size={12} className="text-[#00ff88]" />
              CERTIFICATIONS
            </motion.h3>

            <div className="space-y-3 mb-12">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  className="bg-[#030712] border border-[#1a2744] p-4 flex gap-4 group relative overflow-hidden"
                  initial={{ opacity: 0, x: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{
                    borderColor: `${cert.color}50`,
                    boxShadow: `0 8px 32px rgba(0,255,136,0.08)`,
                    x: 4,
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* Number */}
                  <div
                    className="font-display text-3xl font-bold flex-shrink-0 leading-none opacity-15 group-hover:opacity-30 transition-opacity"
                    style={{ color: cert.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-semibold text-white text-sm group-hover:text-[#00ff88] transition-colors">
                      {cert.name}
                    </div>
                    <div className="font-mono text-xs text-gray-500 mt-0.5">
                      {cert.issuer} · {cert.year}
                    </div>
                  </div>
                  {/* Hover accent */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-0.5"
                    style={{ background: cert.color }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="font-mono text-xs text-gray-500 tracking-widest mb-6 flex items-center gap-2">
                <GraduationCap size={12} className="text-[#00ff88]" />
                LANGUAGES
              </h3>
              <div className="space-y-4">
                {[
                  { lang: "Bahasa Indonesia", level: "Native", pct: 100, color: "#00ff88" },
                  { lang: "English", level: "Professional", pct: 85, color: "#00d4ff" },
                ].map((l, i) => (
                  <div key={l.lang}>
                    <div className="flex justify-between font-mono text-xs text-gray-400 mb-2">
                      <span>{l.lang}</span>
                      <motion.span
                        style={{ color: l.color }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                      >
                        {l.level}
                      </motion.span>
                    </div>
                    <div className="h-0.5 bg-[#1a2744]">
                      <motion.div
                        className="h-full"
                        style={{ background: `linear-gradient(90deg, ${l.color}, ${l.color}60)`, boxShadow: `0 0 8px ${l.color}` }}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${l.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.7 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
