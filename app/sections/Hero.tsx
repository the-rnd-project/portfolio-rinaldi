"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail, Terminal } from "lucide-react";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("../components/ThreeScene"), { ssr: false });

const roles = [
  "Software Engineer",
  "AI/ML Engineer",
  "Full Stack Developer",
  "Deep Learning Enthusiast",
  "Open Source Contributor",
];

function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes: { x: number; y: number; vx: number; vy: number; r: number; pulse: number }[] = [];
    const count = Math.floor((canvas.width * canvas.height) / 16000);

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.02;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 3);
        glow.addColorStop(0, `rgba(0, 255, 136, ${0.5 + Math.sin(node.pulse) * 0.2})`);
        glow.addColorStop(1, "rgba(0, 255, 136, 0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
            const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            gradient.addColorStop(0, `rgba(0, 255, 136, ${alpha})`);
            gradient.addColorStop(1, `rgba(0, 212, 255, ${alpha})`);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-35" />;
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { scrollY } = useScroll();

  const yBg = useTransform(scrollY, [0, 700], [0, 220]);
  const y3D = useTransform(scrollY, [0, 700], [0, -140]);
  const yText = useTransform(scrollY, [0, 700], [0, 90]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);
  const scale3D = useTransform(scrollY, [0, 700], [1, 0.65]);

  const springY3D = useSpring(y3D, { stiffness: 70, damping: 20 });
  const springScale = useSpring(scale3D, { stiffness: 70, damping: 20 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const containerVar = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
  };

  const itemVar = {
    hidden: { opacity: 0, y: 50, filter: "blur(12px)" },
    show: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">

      {/* Layer 0: Neural BG parallax */}
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <NeuralBackground />
      </motion.div>

      {/* Layer 1: Center glow */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: yBg, opacity: springOpacity }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,255,136,0.07) 0%, rgba(0,212,255,0.03) 40%, transparent 70%)" }} />
      </motion.div>

      {/* Layer 2: 3D Object — right side, deep parallax */}
      <motion.div
        className="absolute right-0 xl:right-6 top-1/2 -translate-y-1/2 w-[58vw] h-[58vw] max-w-[720px] max-h-[720px] pointer-events-none hidden lg:block"
        style={{ y: springY3D, scale: springScale, opacity: springOpacity }}
      >
        <ThreeScene />
      </motion.div>

      {/* Corner brackets cinematic entrance */}
      {[
        "top-8 left-8 border-l-2 border-t-2",
        "top-8 right-8 border-r-2 border-t-2",
        "bottom-8 left-8 border-l-2 border-b-2",
        "bottom-8 right-8 border-r-2 border-b-2",
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute w-14 h-14 border-[#00ff88] ${cls}`}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ delay: 1.5 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* Layer 3: Text content with staggered cinematic reveal */}
      <motion.div
        className="relative z-10 px-6 max-w-7xl mx-auto w-full"
        style={{ y: yText, opacity: springOpacity }}
      >
        <motion.div
          variants={containerVar}
          initial="hidden"
          animate={loaded ? "show" : "hidden"}
          className="max-w-2xl lg:max-w-xl"
        >
          {/* Terminal badge */}
          <motion.div variants={itemVar} className="mb-7">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-[#00ff88] bg-[#00ff88]/5 border border-[#00ff88]/30 px-4 py-2">
              <Terminal size={11} />
              INITIALIZING PROFILE...
              <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.9, ease: "steps(1)" }}>█</motion.span>
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVar} className="mb-6 overflow-visible">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-[#00ff88]" />
            </div>
            <h1 className="hero-name font-display max-w-[12ch] overflow-visible py-3 text-5xl font-extrabold leading-[1.16] text-white sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="hero-name-primary block pr-2">Rinaldi</span>
              <span className="hero-name-secondary block pr-2 pb-2">Udra Suhanda</span>
            </h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={itemVar} className="font-mono text-lg md:text-xl text-gray-300 mb-6 flex items-center gap-2 h-7">
            <span className="text-[#00ff88]">&gt;</span>
            <span>{displayed}</span>
            <motion.span
              className="w-0.5 h-5 bg-[#00ff88] inline-block"
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "steps(1)" }}
            />
          </motion.div>

          {/* Description */}
          <motion.p variants={itemVar} className="text-gray-400 text-base md:text-lg max-w-md mb-9 leading-relaxed">
            Membangun solusi cerdas di persimpangan{" "}
            <span className="text-[#00d4ff]">rekayasa perangkat lunak</span> dan{" "}
            <span className="text-[#00ff88]">kecerdasan buatan</span>. Mengubah data menjadi wawasan, ide menjadi realitas.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVar} className="flex flex-col sm:flex-row gap-4 mb-10">
            <motion.a href="#projects"
              className="group relative px-8 py-3.5 font-mono text-sm tracking-widest font-bold overflow-hidden inline-block"
              style={{ border: "1px solid #00ff88" }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              <span className="absolute inset-0 bg-[#00ff88] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative group-hover:text-black text-[#00ff88] transition-colors duration-300">VIEW PROJECTS →</span>
            </motion.a>
            <motion.a href="#contact"
              className="px-8 py-3.5 font-mono text-sm tracking-widest font-bold text-gray-400 border border-[#1a2744] hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all duration-300"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              CONTACT ME
            </motion.a>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVar} className="flex items-center gap-5">
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:you@email.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1 text-gray-500 hover:text-[#00ff88] transition-colors"
                whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.9 }}
              >
                <div className="p-2.5 border border-[#1a2744] group-hover:border-[#00ff88]/50 group-hover:shadow-[0_0_14px_rgba(0,255,136,0.3)] transition-all duration-300">
                  <Icon size={17} />
                </div>
                <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-[#00ff88] transition-colors z-20"
        style={{ opacity: springOpacity }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.span className="font-mono text-xs tracking-widest"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5 }}>SCROLL</motion.span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}
