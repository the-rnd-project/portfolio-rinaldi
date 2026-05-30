"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

const skillCategories = [
  {
    title: "Programming & API",
    color: "#00ff88",
    glow: "rgba(0,255,136,0.15)",
    icon: "PY",
    skills: [
      { name: "Python", level: 92 },
      { name: "Flask / RESTful API", level: 90 },
      { name: "Unit Testing", level: 84 },
      { name: "Google Cloud Platform", level: 78 },
      { name: "Laravel / PHP", level: 80 },
      { name: "MySQL", level: 84 },
    ],
  },
  {
    title: "Web Development",
    color: "#00d4ff",
    glow: "rgba(0,212,255,0.15)",
    icon: "WEB",
    skills: [
      { name: "Web App Development", level: 88 },
      { name: "Flutter Mobile Apps", level: 80 },
      { name: "UI Design", level: 84 },
      { name: "Usability Testing", level: 86 },
      { name: "User Manual Docs", level: 88 },
      { name: "User-Centered Design", level: 86 },
    ],
  },
  {
    title: "Software Engineering",
    color: "#b24bff",
    glow: "rgba(178,75,255,0.15)",
    icon: "SE",
    skills: [
      { name: "Agile Scrum", level: 88 },
      { name: "Goal-Directed Design", level: 84 },
      { name: "Requirement Analysis", level: 88 },
      { name: "UML Diagrams", level: 86 },
      { name: "Project Management with Trello", level: 84 },
      { name: "Applied Machine Learning", level: 78 },
    ],
  },
];

const techBadges = [
  "Python", "Flask", "RESTful API", "Flutter", "Laravel", "PHP",
  "MySQL", "Google Cloud Platform", "Scrum", "Goal-Directed Design",
  "UML", "Trello", "Unit Testing", "Usability Testing", "Web Apps",
  "Applied ML", "UX Design", "User Manual",
];

// 3D tilt card
function TiltCard({ children, color, glow }: { children: React.ReactNode; color: string; glow: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 18;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-[#030712] border border-[#1a2744] p-6 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        borderColor: hovered ? `${color}50` : "#1a2744",
        boxShadow: hovered ? `0 20px 60px ${glow}` : "none",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {/* Glow overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${glow} 0%, transparent 60%)`,
        }}
      />
      <div style={{ transform: "translateZ(20px)", position: "relative" }}>
        {children}
      </div>
    </motion.div>
  );
}

// Animated skill bar
function SkillBar({ name, level, color, isInView, delay }: {
  name: string; level: number; color: string; isInView: boolean; delay: number;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-xs text-gray-400">{name}</span>
        <motion.span
          className="font-mono text-xs"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5, duration: 0.4 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-0.5 bg-[#1a2744] relative overflow-hidden">
        <motion.div
          className="h-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}80)`, boxShadow: `0 0 8px ${color}` }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${level}%` } : { width: "0%" }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Shimmer */}
        <motion.div
          className="absolute inset-y-0 w-8"
          style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)` }}
          initial={{ x: "-100%" }}
          animate={isInView ? { x: ["−100%", "200%"] } : {}}
          transition={{ duration: 0.8, delay: delay + 1.2, ease: "linear" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null!);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const yHeading = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const yCards = useTransform(scrollYProgress, [0, 1], [100, -60]);
  const yBadges = useTransform(scrollYProgress, [0, 1], [80, -30]);

  return (
    <section id="skills" ref={sectionRef} className="py-36 px-6 relative bg-[#0a0f1e]/30 overflow-hidden">
      {/* BG accent */}
      <motion.div
        className="absolute left-0 top-1/3 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(178,75,255,0.06), transparent 70%)",
          y: useTransform(scrollYProgress, [0, 1], [40, -40]),
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
            <span className="font-mono text-xs text-[#00ff88] tracking-widest">02.</span>
            <span className="font-mono text-xs text-gray-500 tracking-widest">TECH_STACK</span>
          </motion.div>
          <motion.h2
            className="font-display text-5xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Skills &{" "}
            <span className="gradient-text">Expertise</span>
          </motion.h2>
          <motion.div
            className="h-0.5 bg-gradient-to-r from-[#00ff88] to-transparent mt-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* 3D Tilt cards */}
        <motion.div className="grid md:grid-cols-3 gap-6 mb-16" style={{ y: yCards }}>
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: ci * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard color={cat.color} glow={cat.glow}>
                <div className="flex items-center gap-2 mb-6">
                  <span className="font-mono text-[10px] text-gray-500">{cat.icon}</span>
                  <h3 className="font-display font-semibold text-white text-sm">{cat.title}</h3>
                  <motion.div
                    className="ml-auto w-2 h-2 rounded-full"
                    style={{ background: cat.color }}
                    animate={{ boxShadow: [`0 0 4px ${cat.color}`, `0 0 12px ${cat.color}`, `0 0 4px ${cat.color}`] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </div>
                <div className="space-y-4">
                  {cat.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={cat.color}
                      isInView={isInView}
                      delay={ci * 0.1 + si * 0.08}
                    />
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech badges — staggered */}
        <motion.div style={{ y: yBadges }}>
          <motion.p
            className="font-mono text-xs text-gray-500 tracking-widest mb-5"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            // TECHNOLOGIES I WORK WITH
          </motion.p>
          <div className="flex flex-wrap gap-2">
            {techBadges.map((tech, i) => (
              <motion.span
                key={tech}
                className="font-mono text-xs px-3 py-1.5 border border-[#1a2744] text-gray-500 cursor-default"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.03 }}
                whileHover={{
                  borderColor: "#00ff88",
                  color: "#00ff88",
                  scale: 1.08,
                  boxShadow: "0 0 14px rgba(0,255,136,0.25)",
                  transition: { duration: 0.15 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
