"use client";
import { useEffect, useRef } from "react";

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let THREE: any, renderer: any, scene: any, camera: any;
    let frameId: number;
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const init = async () => {
      THREE = await import("three");

      const w = mount.clientWidth;
      const h = mount.clientHeight;

      // Scene
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
      camera.position.z = 4.8;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // ─── Torus Knot (core object) ───
      const torusGeo = new THREE.TorusKnotGeometry(1, 0.32, 160, 20, 2, 3);
      const torusMat = new THREE.MeshStandardMaterial({
        color: 0x00ff88,
        emissive: 0x004422,
        metalness: 0.9,
        roughness: 0.1,
        wireframe: false,
      });
      const torus = new THREE.Mesh(torusGeo, torusMat);
      scene.add(torus);

      // ─── Wireframe overlay ───
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        wireframe: true,
        opacity: 0.08,
        transparent: true,
      });
      const wire = new THREE.Mesh(torusGeo, wireMat);
      scene.add(wire);

      // ─── Orbiting rings ───
      const ringGroup = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(1.65 + i * 0.22, 0.008, 8, 100);
        const ringMat = new THREE.MeshBasicMaterial({
          color: i === 0 ? 0x00ff88 : i === 1 ? 0x00d4ff : 0xb24bff,
          opacity: 0.4 - i * 0.1,
          transparent: true,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 3 + i * 0.5;
        ring.rotation.y = i * 0.8;
        ringGroup.add(ring);
      }
      scene.add(ringGroup);

      // ─── Floating particles ───
      const particleCount = 200;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        const r = 2.05 + Math.random() * 0.32;
        positions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
        positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
        positions[i * 3 + 2] = r * Math.cos(phi);
        const palette = [[0, 1, 0.53], [0, 0.83, 1], [0.7, 0.29, 1]];
        const col = palette[i % 3];
        colors[i * 3] = col[0];
        colors[i * 3 + 1] = col[1];
        colors[i * 3 + 2] = col[2];
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // ─── Lights ───
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x00ff88, 3, 10);
      pointLight1.position.set(3, 3, 3);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x00d4ff, 2, 10);
      pointLight2.position.set(-3, -2, 2);
      scene.add(pointLight2);

      const pointLight3 = new THREE.PointLight(0xb24bff, 1.5, 8);
      pointLight3.position.set(0, -3, -2);
      scene.add(pointLight3);

      // ─── Mouse interaction ───
      const handleMouse = (e: MouseEvent) => {
        const rect = mount.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      document.addEventListener("mousemove", handleMouse);

      // ─── Scroll-driven scale ───
      let scrollProgress = 0;
      const handleScroll = () => {
        scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      };
      window.addEventListener("scroll", handleScroll);

      // ─── Animate ───
      const clock = new THREE.Clock();
      const animate = () => {
        const t = clock.getElapsedTime();
        frameId = requestAnimationFrame(animate);

        // Smooth mouse follow
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        torus.rotation.x = t * 0.18 + targetY * 0.4;
        torus.rotation.y = t * 0.24 + targetX * 0.4;
        wire.rotation.x = torus.rotation.x;
        wire.rotation.y = torus.rotation.y;

        ringGroup.rotation.x = t * 0.07 + targetY * 0.2;
        ringGroup.rotation.y = t * 0.11 + targetX * 0.2;
        ringGroup.rotation.z = t * 0.05;

        particles.rotation.y = t * 0.04 + targetX * 0.1;
        particles.rotation.x = t * 0.03 + targetY * 0.1;

        // Scroll: scale down as user scrolls
        const scale = 1 - scrollProgress * 0.5;
        torus.scale.setScalar(scale * 1.12);
        wire.scale.setScalar(scale * 1.12);
        ringGroup.scale.setScalar(scale);
        particles.scale.setScalar(scale + 0.02);

        // Pulsing emissive
        torusMat.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.3;

        renderer.render(scene, camera);
      };
      animate();

      // Resize handler
      const handleResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        document.removeEventListener("mousemove", handleMouse);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });

    return () => {
      cancelAnimationFrame(frameId);
      cleanup?.();
      if (renderer) {
        renderer.dispose();
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
