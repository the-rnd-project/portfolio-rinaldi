"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { BookOpen, Code2, Database, Cpu } from "lucide-react";
import dynamic from "next/dynamic";

const FloatingSphere = dynamic(() => import("../components/FloatingSphere"), { ssr: false });

const stats = [
  { value: "4+", label: "Professional Years" },
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

const itemVar = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null!);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // Parallax layers
  const yLeft = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yRight = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const ySphere = useTransform(scrollYProgress, [0, 1], [40, -120]);
  const rotSphere = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const springYSphere = useSpring(ySphere, { stiffness: 60, damping: 20 });
  const springRot = useSpring(rotSphere, { stiffness: 60, damping: 20 });

  return (
    <section id="about" ref={sectionRef} className="py-28 md:py-36 px-6 relative overflow-hidden">
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
        className="pointer-events-none absolute left-[46%] top-[56%] hidden h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 opacity-45 lg:block xl:left-1/2"
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
          className="mb-12 md:mb-14"
          style={{ y: yLeft }}
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.span
              className="font-mono text-xs text-[#00ff88] tracking-widest"
              initial={{ opacity: 0, width: 0 }}
              animate={isInView ? { opacity: 1, width: "auto" } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              01.
            </motion.span>
            <span className="font-mono text-xs text-gray-500 tracking-widest">ABOUT_ME</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white">
            Who Am{" "}
            <motion.span
              className="gradient-text"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              I?
            </motion.span>
          </h2>
          <motion.div
            className="h-0.5 bg-gradient-to-r from-[#00ff88] to-transparent mt-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 xl:gap-16 items-start">
          {/* Left: Text */}
          <motion.div className="space-y-6" style={{ y: yLeft }}>
            {[
              <>Halo! Saya <span className="text-[#00ff88] font-medium">Rinaldi Udra Suhanda</span>, lulusan Informatika dan mahasiswa Magister <span className="text-[#00d4ff] font-medium">Kecerdasan Buatan</span> di Universitas Syiah Kuala. Fokus saya ada di software engineering, applied machine learning, dan solusi digital yang scalable.</>,
              <>Pengalaman saya mencakup pengembangan RESTful API dengan Flask, aplikasi web untuk pemeliharaan fasilitas, layanan inspeksi halal, sertifikasi profesional, sistem informasi pariwisata berbasis Laravel, serta pengujian dan usability testing bersama pengguna.</>,
            ].map((text, i) => (
              <motion.p
                key={i}
                className={`leading-relaxed ${i === 0 ? "text-gray-300 text-lg" : "text-gray-400"}`}
                custom={i}
                variants={itemVar}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
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
              animate={isInView ? "show" : "hidden"}
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
                ].map(([k, v]) => (
                  <div key={k} className="pl-4">
                    <span className="text-[#00ff88]">"{k}"</span>
                    <span className="text-gray-400">: </span>
                    <span className={v === "true" ? "text-[#00ff88]" : "text-yellow-300"}>{v}</span>
                    {k !== "available" && <span className="text-gray-600">,</span>}
                  </div>
                ))}
                <div>{"}"}</div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              custom={3}
              variants={itemVar}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-[#0a0f1e] border border-[#1a2744] p-4"
                  whileHover={{
                    y: -4,
                    borderColor: "rgba(0,255,136,0.4)",
                    boxShadow: "0 8px 32px rgba(0,255,136,0.1)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="font-display text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="font-mono text-xs text-gray-500 mt-1 tracking-wider">{stat.label.toUpperCase()}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: profile and highlights */}
          <motion.div className="space-y-5 lg:pt-2" style={{ y: yRight }}>
            <motion.div
              className="relative overflow-hidden border border-[#1a2744] bg-[#0a0f1e] p-3"
              custom={0}
              variants={itemVar}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              whileHover={{
                y: -4,
                borderColor: "rgba(0,255,136,0.45)",
                boxShadow: "0 16px 42px rgba(0,255,136,0.1)",
                transition: { duration: 0.2 },
              }}
            >
              <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-[#00ff88] via-[#00d4ff] to-[#b24bff]" />
              <div className="grid items-center gap-5 sm:grid-cols-[150px_1fr]">
                <div className="relative aspect-[4/5] overflow-hidden border border-[#1a2744] bg-[#030712]">
                  <img
                    src="/profile-placeholder.svg"
                    alt="Rinaldi Udra Suhanda profile placeholder"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-mono text-xs tracking-widest text-[#00ff88]">PROFILE_PHOTO</div>
                  <div className="mt-2 font-display text-lg font-semibold text-white">Rinaldi Udra Suhanda</div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Master&apos;s Degree Candidate in Artificial Intelligence dengan pengalaman praktis membangun software, RESTful API, aplikasi web, dan dokumentasi pengguna.
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
                  animate={isInView ? "show" : "hidden"}
                  whileHover={{
                    x: 6,
                    borderColor: `${item.color}40`,
                    boxShadow: `0 4px 24px ${item.color}10`,
                    transition: { duration: 0.2 },
                  }}
                >
                  <motion.div
                    className="p-2 border border-[#1a2744] flex-shrink-0"
                    style={{ color: item.color }}
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon size={16} />
                  </motion.div>
                  <div>
                    <div className="font-display font-semibold text-white text-sm group-hover:text-[#00ff88] transition-colors">{item.title}</div>
                    <div className="font-mono text-xs text-gray-500 mt-0.5">{item.desc}</div>
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
