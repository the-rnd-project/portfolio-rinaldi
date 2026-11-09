"use client";
import { useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useMotionTemplate, useReducedMotion } from "framer-motion";
import { Code2 } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";

type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  secondaryImage?: string;
  imageFit?: "cover" | "contain";
  description: string;
  tech: string[];
  color: string;
  glow: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: "01",
    title: "Chemistry E-Learning System",
    category: "Education / Web App",
    image: "/images/1.png",
    description:
      "A web-based e-learning application for learning chemistry lessons, built using the Laravel framework.",
    tech: ["Laravel", "PHP", "E-Learning", "Web App"],
    color: "#00ff88",
    glow: "rgba(0,255,136,0.12)",
    featured: true,
  },
  {
    id: "02",
    title: "Aceh Tourism Information System",
    category: "Tourism / Web App",
    image: "/images/2.png",
    description:
      "Web-based tourism information system for Aceh that manages tourist destinations, tour guides, hotels, souvenirs, culinary services, and travel services.",
    tech: ["Laravel", "PHP", "Tourism", "Information System"],
    color: "#00d4ff",
    glow: "rgba(0,212,255,0.12)",
    featured: true,
  },
  {
    id: "03",
    title: "Building Facility Maintenance Apps",
    category: "Facility Management",
    image: "/images/3-2.png",
    secondaryImage: "/images/3-1.png",
    description:
      "A facility maintenance solution built in two parts: a web application using Flask and a mobile application using Flutter, developed with Agile Software Development.",
    tech: ["Flask", "Flutter", "Agile", "Facility Management"],
    color: "#b24bff",
    glow: "rgba(178,75,255,0.12)",
    featured: true,
  },
  {
    id: "04",
    title: "LPH USK",
    category: "Certification / Web App",
    image: "/images/4.png",
    description:
      "Website that assists Lembaga Pemeriksa Halal Universitas Syiah Kuala in the Halal Product Certification process.",
    tech: ["Web App", "Certification", "Halal Service", "LPH USK"],
    color: "#00ff88",
    glow: "rgba(0,255,136,0.12)",
  },
  {
    id: "05",
    title: "LSP USK",
    category: "Certification / Web App",
    image: "/images/5.png",
    description:
      "Web-based application for professional certification services using the Flask framework.",
    tech: ["Flask", "Python", "Certification", "Web App"],
    color: "#00d4ff",
    glow: "rgba(0,212,255,0.12)",
  },
  {
    id: "06",
    title: "Medical Records App",
    category: "Healthcare / Mobile App",
    image: "/images/6.png",
    imageFit: "contain",
    description:
      "Mobile-based patient medical records application for managing patient data, medical histories, diagnoses, prescriptions, and treatment records.",
    tech: ["Mobile App", "Healthcare", "Medical Records", "Patient Data"],
    color: "#b24bff",
    glow: "rgba(178,75,255,0.12)",
  },
  {
    id: "07",
    title: "Sibale-Go",
    category: "Geospatial Service",
    image: "/images/7.png",
    description:
      "Official Geospatial Efficient Service-Based Information System of BPKHTL Region XVIII Banda Aceh.",
    tech: ["Geospatial", "Information System", "Service Platform", "BPKHTL"],
    color: "#00ff88",
    glow: "rgba(0,255,136,0.12)",
  },
  {
    id: "08",
    title: "MediRemind",
    category: "Healthcare / Mobile App",
    image: "/images/8-1.png",
    secondaryImage: "/images/8-2.png",
    description:
      "Medication management application that enables users to schedule medication intake, receive reminders, monitor treatment progress, and maintain therapy adherence.",
    tech: ["Mobile App", "Medication Reminder", "Healthcare", "Progress Tracking"],
    color: "#00d4ff",
    glow: "rgba(0,212,255,0.12)",
  },
  {
    id: "09",
    title: "MyFBA",
    category: "Internal Service Platform",
    image: "/images/9.png",
    description:
      "Internal service platform for Forum Bangun Aceh that supports member management, internal communication, information dissemination, and organizational administration.",
    tech: ["Service Platform", "Member Management", "Communication", "Administration"],
    color: "#b24bff",
    glow: "rgba(178,75,255,0.12)",
  },
  {
    id: "10",
    title: "SIMASUR",
    category: "Document Management",
    image: "/images/10.png",
    description:
      "Web-based application for managing incoming and outgoing correspondence and digital document archives, improving document tracking, storage, and retrieval.",
    tech: ["Web App", "Correspondence", "Digital Archive", "Document Tracking"],
    color: "#00ff88",
    glow: "rgba(0,255,136,0.12)",
  },
];

const circuitPaths = [
  "M0 60H120L180 120H300L340 160H410",
  "M70 290V240L150 160H260L300 200H410",
  "M240 0V60L300 120H410V160",
  "M600 70H530L480 120V160H450",
  "M600 280H530L490 240H450V200",
  "M340 320V270L390 220H430V200",
];

function ProjectCircuit() {
  return (
    <svg viewBox="0 0 600 320" fill="none" className="h-full w-full" aria-hidden="true">
      {circuitPaths.map((path, index) => (
        <g key={path} stroke={index % 2 === 0 ? "#00ff88" : "#00d4ff"}>
          <path d={path} strokeOpacity="0.13" />
          <path
            d={path}
            pathLength="100"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 95"
            className="project-loop project-data-packet"
            style={{ animationDelay: `${index * -1.3}s` }}
          />
        </g>
      ))}
      <rect x="398" y="138" width="64" height="64" rx="12" fill="#07101f" stroke="#00ff88" strokeOpacity="0.4" />
      <rect x="407" y="147" width="46" height="46" rx="7" stroke="#00d4ff" strokeOpacity="0.3" />
      <path d="M424 162L416 170L424 178M436 162L444 170L436 178M433 158L427 182" stroke="#00ff88" strokeWidth="2" />
      {[[120, 60], [150, 160], [300, 120], [530, 70], [530, 280], [340, 270]].map(([cx, cy], index) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="3"
          fill={index % 2 === 0 ? "#00ff88" : "#00d4ff"}
          className="project-loop project-node"
          style={{ animationDelay: `${index * -0.6}s` }}
        />
      ))}
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 24 });
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(30);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${pointerX}% ${pointerY}%, ${project.glow}, transparent 75%)`;
  const [hovered, setHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType === "touch") return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - y) * 7);
    rotateY.set((x - 0.5) * 7);
    pointerX.set(x * 100);
    pointerY.set(y * 100);
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card group bg-[#030712] border border-[#1a2744] overflow-hidden relative flex flex-col"
      onPointerMove={handlePointerMove}
      onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(true); }}
      onPointerLeave={() => { rotateX.set(0); rotateY.set(0); setHovered(false); }}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 50, scale: reduceMotion ? 1 : 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      animate={{
        borderColor: hovered ? `${project.color}40` : "#1a2744",
        boxShadow: hovered ? `0 24px 64px ${project.glow}` : "0 0 0 transparent",
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000, "--project-color": project.color, "--scan-delay": `${index * -1.7}s` } as CSSProperties}
    >
      {/* Top glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Ambient glow overlay */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{ background: spotlight }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative h-56 overflow-hidden border-b border-[#1a2744] bg-[#07101f] p-3" style={{ transform: "translateZ(8px)" }}>
        <div className="relative h-full overflow-hidden border border-[#25334f] bg-[#020712] shadow-2xl">
          <div className="flex h-6 items-center gap-1.5 border-b border-[#25334f] bg-[#0c1324] px-3">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            <Code2 size={11} aria-hidden="true" className="ml-auto text-slate-500" />
          </div>
          <motion.img
            src={project.image}
            alt={`${t(project.title)} — ${t("preview")}`}
            className={`h-[calc(100%-1.5rem)] w-full bg-white ${project.imageFit === "contain" ? "object-contain p-3" : "object-cover"}`}
            animate={{ scale: hovered && !reduceMotion ? 1.035 : 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
          <div aria-hidden="true" className="project-loop project-preview-scan pointer-events-none absolute inset-x-0 top-6 h-16" />
          <div aria-hidden="true" className="project-preview-grid pointer-events-none absolute inset-0 top-6" />
        </div>

        {project.secondaryImage && (
          <motion.div
            className="absolute bottom-4 right-5 h-36 w-20 overflow-hidden rounded-[18px] border border-[#34476d] bg-[#030712] p-1.5 shadow-2xl"
            animate={{ y: hovered && !reduceMotion ? -4 : 0, scale: hovered && !reduceMotion ? 1.04 : 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={project.secondaryImage}
              alt={`${t(project.title)} — ${t("mobile preview")}`}
              className="h-full w-full rounded-[13px] bg-white object-cover"
            />
          </motion.div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1" style={{ transform: "translateZ(10px)", position: "relative" }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <motion.span
              className="font-mono text-xs tracking-widest mb-1.5 block"
              style={{ color: project.color }}
            >
              {t(project.category).toUpperCase()}
            </motion.span>
            <h3 className="font-display font-bold text-white text-xl group-hover:text-[#00ff88] transition-colors leading-tight">
              {t(project.title)}
            </h3>
          </div>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{t(project.description)}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((tech, i) => (
            <motion.span
              key={tech}
              className="font-mono text-xs px-2 py-1 bg-[#0a0f1e] border border-[#1a2744] text-gray-600"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + i * 0.04 }}
              whileHover={{ color: project.color, borderColor: `${project.color}40` }}
            >
              {t(tech)}
            </motion.span>
          ))}
        </div>

        {/* Bottom line reveal */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
          initial={{ width: "0%" }}
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null!);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const effectsInView = useInView(sectionRef, { margin: "100px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const yHeading = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const xFeatured = useTransform(scrollYProgress, [0.1, 0.6], [0, -20]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0.6]);

  return (
    <section id="projects" ref={sectionRef} data-active={effectsInView} className="project-showcase py-16 md:py-20 px-6 relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-16 h-[480px] project-circuit-grid" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-10 h-80 w-[600px] max-w-full opacity-60 md:right-0 md:opacity-90">
        <ProjectCircuit />
      </div>
      {/* BG accent */}
      <motion.div
        className="absolute right-0 bottom-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,136,0.04), transparent 70%)",
          y: useTransform(scrollYProgress, [0, 1], [40, -40]),
          opacity: sectionOpacity,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="mb-8 md:mb-10" style={{ y: reduceMotion ? 0 : yHeading }}>
          <motion.div
            className="flex items-center gap-3 mb-3"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="font-mono text-xs text-[#00ff88] tracking-widest">03.</span>
            <span className="font-mono text-xs text-gray-500 tracking-widest">{t("PROJECTS")}</span>
          </motion.div>
          <motion.h2
            className="font-display text-5xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t("Featured")} <span className="gradient-text">{t("Work")}</span>
          </motion.h2>
          <motion.div
            className="h-0.5 bg-gradient-to-r from-[#00ff88] to-transparent mt-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Featured 3 — larger grid */}
        <motion.div className="grid md:grid-cols-3 gap-5 mb-5" style={{ x: reduceMotion ? 0 : xFeatured }}>
          {projects.filter((p) => p.featured).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </motion.div>

        {/* Other projects */}
        <div className="grid md:grid-cols-3 gap-5">
          {projects.filter((p) => !p.featured).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
