"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "Building Facility Maintenance Web App",
    category: "Facility Management",
    image: "/project-dashboard.svg",
    description:
      "Software berbasis web untuk pemeliharaan fasilitas gedung. Dibangun dengan Flask Python Framework setelah proses requirement analysis, UML, persona, storyboard, dan user interface design.",
    tech: ["Python", "Flask", "RESTful API", "UML", "GCP"],
    color: "#00ff88",
    glow: "rgba(0,255,136,0.12)",
    featured: true,
    github: "#",
    live: "https://sinta.kemdiktisaintek.go.id/authors/profile/59434/?view=iprs",
  },
  {
    id: "02",
    title: "Building Facility Maintenance Mobile App",
    category: "Mobile Application",
    image: "/project-ecommerce.svg",
    description:
      "Aplikasi mobile untuk mendukung proses pemeliharaan fasilitas gedung. Dikembangkan menggunakan Flutter Framework dan menjadi bagian dari rangkaian solusi pemeliharaan fasilitas.",
    tech: ["Flutter", "Mobile App", "UI Flow", "User Requirements", "Testing"],
    color: "#00d4ff",
    glow: "rgba(0,212,255,0.12)",
    featured: true,
    github: "#",
    live: "https://sinta.kemdiktisaintek.go.id/authors/profile/59434/?view=iprs",
  },
  {
    id: "03",
    title: "Halal Inspection Services Platform",
    category: "Web Application",
    image: "/project-ai-chat.svg",
    description:
      "Software berbasis web untuk layanan inspeksi halal. Dibangun menggunakan Flask Python Framework dengan pendekatan Agile dan desain berbasis kebutuhan pengguna.",
    tech: ["Python", "Flask", "Scrum", "User Manual", "Usability Testing"],
    color: "#b24bff",
    glow: "rgba(178,75,255,0.12)",
    featured: true,
    github: "#",
    live: "https://rinaldiudrasuhanda.medium.com/apa-itu-open-api-1b2cd2adac20",
  },
  {
    id: "04",
    title: "Professional Certification Services",
    category: "Web Application",
    image: "/project-sentiment.svg",
    description:
      "Software berbasis web untuk layanan sertifikasi profesional. Proyek mencakup analisis kebutuhan, desain UI, implementasi Flask, dan dokumentasi pengguna.",
    tech: ["Python", "Flask", "Requirements", "UI Design", "Docs"],
    color: "#00ff88",
    glow: "rgba(0,255,136,0.12)",
    github: "#",
    live: "https://rinaldiudrasuhanda.medium.com/apa-itu-swagger-a9c8157ed725",
  },
  {
    id: "05",
    title: "Tourist Destination Information System",
    category: "Tourism / Web App",
    image: "/project-forecasting.svg",
    description:
      "Sistem informasi destinasi wisata berbasis web untuk Dinas Kebudayaan dan Pariwisata Aceh. Dibangun dengan Laravel dan MySQL setelah analisis kebutuhan, desain proses bisnis, dan UI.",
    tech: ["Laravel", "PHP", "MySQL", "Scrum", "User Testing"],
    color: "#00d4ff",
    glow: "rgba(0,212,255,0.12)",
    github: "#",
    live: "https://rinaldiudrasuhanda.medium.com/dokumentasi-api-menggunakan-swagger-7e02078790be",
  },
  {
    id: "06",
    title: "RESTful Web Service & Testing",
    category: "Backend / API",
    image: "/project-vision.svg",
    description:
      "Web service berbasis RESTful API menggunakan Flask Python Framework. Proses pengembangan dilengkapi pengujian dengan Python Unit Test Framework.",
    tech: ["RESTful API", "Python", "Flask", "Unit Test", "GCP"],
    color: "#b24bff",
    glow: "rgba(178,75,255,0.12)",
    github: "#",
    live: "https://prezi.com/p/akk5heviyxgz/dml/",
  },
];

// Magnetic hover card
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
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

      <div className="relative h-44 overflow-hidden border-b border-[#1a2744] bg-[#0a0f1e]" style={{ transform: "translateZ(8px)" }}>
        <motion.img
          src={project.image}
          alt={`${project.title} preview`}
          className="h-full w-full object-cover opacity-80 grayscale-[25%] transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(180deg, transparent 35%, #030712 115%), radial-gradient(circle at 20% 0%, ${project.glow}, transparent 45%)` }}
        />
        <motion.div
          className="absolute bottom-3 left-4 font-mono text-[10px] tracking-widest"
          style={{ color: project.color }}
          animate={{ opacity: hovered ? 1 : 0.75 }}
          transition={{ duration: 0.2 }}
        >
          PREVIEW_{project.id}
        </motion.div>
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
            <div className="flex items-center gap-3">
              <span className="font-display text-5xl font-bold opacity-10 group-hover:opacity-20 transition-opacity leading-none" style={{ color: project.color }}>
                {project.id}
              </span>
              <h3 className="font-display font-bold text-white text-lg group-hover:text-[#00ff88] transition-colors leading-tight">
                {project.title}
              </h3>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {[
              { icon: Github, href: project.github },
              { icon: ExternalLink, href: project.live },
            ].map(({ icon: Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                className="p-2 border border-[#1a2744] text-gray-600"
                whileHover={{ color: project.color, borderColor: `${project.color}50`, scale: 1.1, rotate: i === 1 ? -10 : 0 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <Icon size={14} />
              </motion.a>
            ))}
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

        {/* Minor 3 — smaller grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {projects.filter((p) => !p.featured).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
