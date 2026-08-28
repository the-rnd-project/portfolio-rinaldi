"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

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

// Magnetic hover card
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 12;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className="group bg-[#030712] border border-[#1a2744] overflow-hidden relative flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      initial={{ opacity: 0, y: 70, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        borderColor: hovered ? `${project.color}40` : "#1a2744",
        boxShadow: hovered ? `0 24px 64px ${project.glow}` : "0 0 0 transparent",
      }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
    >
      {/* Top glow */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Ambient glow overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.glow} 0%, transparent 60%)` }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative h-56 overflow-hidden border-b border-[#1a2744] bg-[#07101f] p-3" style={{ transform: "translateZ(8px)" }}>
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 34%), radial-gradient(circle at 20% 10%, rgba(0,212,255,0.12), transparent 32%)",
          }}
        />

        <div className="relative h-full overflow-hidden border border-[#25334f] bg-[#020712] shadow-2xl">
          <div className="flex h-6 items-center gap-1.5 border-b border-[#25334f] bg-[#0c1324] px-3">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            <span className="ml-2 h-1.5 flex-1 bg-[#18233b]" />
          </div>
          <motion.img
            src={project.image}
            alt={`${project.title} preview`}
            className={`h-[calc(100%-1.5rem)] w-full ${project.imageFit === "contain" ? "object-contain p-3" : "object-cover"} opacity-90 transition duration-500 group-hover:opacity-100`}
            animate={{ scale: hovered ? 1.035 : 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {project.secondaryImage && (
          <motion.div
            className="absolute bottom-4 right-5 h-36 w-20 overflow-hidden rounded-[18px] border border-[#34476d] bg-[#030712] p-1.5 shadow-2xl"
            animate={{ y: hovered ? -4 : 0, scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={project.secondaryImage}
              alt={`${project.title} mobile preview`}
              className="h-full w-full rounded-[13px] object-cover"
            />
          </motion.div>
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(180deg, transparent 55%, #030712 118%), radial-gradient(circle at 20% 0%, ${project.glow}, transparent 45%)` }}
        />
      </div>

      <div className="p-6 flex flex-col flex-1" style={{ transform: "translateZ(10px)", position: "relative" }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <motion.span
              className="font-mono text-xs tracking-widest mb-1.5 block"
              style={{ color: project.color }}
            >
              {project.category.toUpperCase()}
            </motion.span>
            <h3 className="font-display font-bold text-white text-xl group-hover:text-[#00ff88] transition-colors leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t, i) => (
            <motion.span
              key={t}
              className="font-mono text-xs px-2 py-1 bg-[#0a0f1e] border border-[#1a2744] text-gray-600"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + i * 0.04 }}
              whileHover={{ color: project.color, borderColor: `${project.color}40` }}
            >
              {t}
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
  const sectionRef = useRef<HTMLElement>(null!);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const yHeading = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const xFeatured = useTransform(scrollYProgress, [0.1, 0.6], [0, -20]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0.6]);

  return (
    <section id="projects" ref={sectionRef} className="py-36 px-6 relative overflow-hidden">
      {/* BG accent */}
      <motion.div
        className="absolute right-0 bottom-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,136,0.04), transparent 70%)",
          y: useTransform(scrollYProgress, [0, 1], [40, -40]),
          opacity: sectionOpacity,
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="mb-16" style={{ y: yHeading }}>
          <motion.div
            className="flex items-center gap-3 mb-3"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="font-mono text-xs text-[#00ff88] tracking-widest">03.</span>
            <span className="font-mono text-xs text-gray-500 tracking-widest">PROJECTS</span>
          </motion.div>
          <div className="flex items-end justify-between">
            <motion.h2
              className="font-display text-5xl md:text-6xl font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Featured <span className="gradient-text">Work</span>
            </motion.h2>
          </div>
          <motion.div
            className="h-0.5 bg-gradient-to-r from-[#00ff88] to-transparent mt-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Featured 3 — larger grid */}
        <motion.div className="grid md:grid-cols-3 gap-5 mb-5" style={{ x: xFeatured }}>
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
