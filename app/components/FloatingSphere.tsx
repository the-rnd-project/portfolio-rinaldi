"use client";
import { useEffect, useRef } from "react";

export default function FloatingSphere() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let frameId: number;

    const init = async () => {
      const THREE = await import("three");
      const w = mount.clientWidth;
      const h = mount.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
      camera.position.z = 3.5;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);

      // ── Icosahedron (AI brain) ──
      const geo = new THREE.IcosahedronGeometry(1, 4);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        emissive: 0x003344,
        metalness: 0.95,
        roughness: 0.05,
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      // Wireframe
      const wGeo = new THREE.IcosahedronGeometry(1.02, 1);
      const wMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, opacity: 0.15, transparent: true });
      scene.add(new THREE.Mesh(wGeo, wMat));

      // ── Orbiting dots ──
      const orbitGroup = new THREE.Group();
      for (let i = 0; i < 80; i++) {
        const phi = Math.acos(1 - 2 * Math.random());
        const theta = Math.random() * Math.PI * 2;
        const r = 1.5 + Math.random() * 0.4;
        const dotGeo = new THREE.SphereGeometry(0.015, 6, 6);
        const dotMat = new THREE.MeshBasicMaterial({
          color: Math.random() > 0.5 ? 0x00d4ff : 0x00ff88,
          opacity: Math.random() * 0.6 + 0.2,
          transparent: true,
        });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        );
        orbitGroup.add(dot);
      }
      scene.add(orbitGroup);

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.4));
      const l1 = new THREE.PointLight(0x00d4ff, 4, 10);
      l1.position.set(2, 2, 2);
      scene.add(l1);
      const l2 = new THREE.PointLight(0x00ff88, 2, 8);
      l2.position.set(-2, -1, 1);
      scene.add(l2);

      const clock = new THREE.Clock();
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        mesh.rotation.y = t * 0.2;
        mesh.rotation.x = Math.sin(t * 0.3) * 0.3;
        orbitGroup.rotation.y = -t * 0.15;
        orbitGroup.rotation.z = t * 0.08;
        mesh.position.y = Math.sin(t * 0.8) * 0.12;
        renderer.render(scene, camera);
      };
      animate();
    };

    init();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
