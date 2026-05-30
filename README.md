# 🚀 Portfolio Website — AI & Software Engineer (Immersive Edition)

Website portofolio **cinematic & immersive** dengan tema Cyberpunk AI-Futuristic.  
Dibangun dengan Next.js 14, Three.js, Framer Motion, dan Lenis Smooth Scroll.

## ✨ Fitur Immersive

| Fitur | Detail |
|---|---|
| 🧊 **3D Torus Knot** | Objek Three.js interaktif di Hero — follow mouse, scale on scroll |
| 🌐 **3D Icosahedron** | Floating AI brain di section About |
| 🖱️ **Magnetic Cursor** | Cursor custom neon dengan lagging ring |
| 🌊 **Lenis Smooth Scroll** | Buttery-smooth scroll dengan easing custom |
| 🎬 **Cinematic Parallax** | Tiap layer Hero bergerak dengan kecepatan berbeda |
| 🃏 **3D Card Tilt** | Skill cards dan project cards tilt mengikuti mouse (preserve-3d) |
| 📜 **Scroll Progress Bar** | Neon gradient bar di atas navbar |
| ✨ **Staggered Entrance** | Setiap section reveal dengan blur + y animation |
| 🔮 **Scroll-driven Animations** | Skill bars, timeline, parallax digerakkan scroll position |
| 📡 **Active Nav Detection** | Navbar highlight section yang sedang ditampilkan |

## 📁 Struktur Project

```
portfolio/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx         ← Scroll progress + active detection
│   │   ├── Footer.tsx         ← Animated gradient line
│   │   ├── ThreeScene.tsx     ← Torus knot + particles (Hero)
│   │   ├── FloatingSphere.tsx ← Icosahedron (About)
│   │   ├── SmoothScroll.tsx   ← Lenis wrapper
│   │   └── MagneticCursor.tsx ← Custom neon cursor
│   ├── sections/
│   │   ├── Hero.tsx           ← 3D + Parallax + Typewriter
│   │   ├── About.tsx          ← 3D sphere + staggered reveal
│   │   ├── Skills.tsx         ← 3D tilt cards + animated bars
│   │   ├── Projects.tsx       ← Magnetic 3D project cards
│   │   ├── Experience.tsx     ← Scroll-driven timeline
│   │   └── Contact.tsx        ← Animated form with corner accents
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── package.json
```

## 🛠️ Setup & Instalasi

```bash
cd portfolio
npm install
npm run dev
# Buka http://localhost:3000
```

## ✏️ Kustomisasi Utama

1. **Nama** — `app/components/Navbar.tsx` dan `app/sections/Hero.tsx`  
2. **Proyek** — `app/sections/Projects.tsx` array `projects`  
3. **Pengalaman** — `app/sections/Experience.tsx` array `experiences`  
4. **Skills** — `app/sections/Skills.tsx` array `skillCategories`  
5. **Kontak** — email/phone di `app/sections/Contact.tsx`  
6. **Social links** — Hero, About, Contact  

## 🎨 Warna Tema

```css
--neon-green:  #00ff88   /* Aksen utama */
--neon-blue:   #00d4ff   /* Aksen sekunder */
--neon-purple: #b24bff   /* Aksen tersier */
--dark-bg:     #030712   /* Background utama */
```

## 🚀 Deploy ke Vercel

```bash
npm i -g vercel
vercel --prod
```

**Stack:** Next.js 14 · Three.js · Framer Motion · Lenis · TypeScript · Tailwind CSS
