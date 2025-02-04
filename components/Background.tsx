"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create two particle systems - one for background, one for foreground
    const createParticles = (count: number, size: number, opacity: number, spread: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const originalPositions = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        let x, y, z;
        do {
          x = (Math.random() - 0.5) * spread;
          y = (Math.random() - 0.5) * spread;
          z = (Math.random() - 0.5) * spread;
        } while (Math.sqrt(x * x + y * y + z * z) < 2);

        positions[i] = x;
        positions[i + 1] = y;
        positions[i + 2] = z;
        originalPositions[i] = x;
        originalPositions[i + 1] = y;
        originalPositions[i + 2] = z;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        size,
        color: '#000000',
        transparent: true,
        opacity,
        sizeAttenuation: true,
      });

      return {
        points: new THREE.Points(geometry, material),
        originalPositions,
      };
    };

    // Create two layers of particles
    const backgroundParticles = createParticles(3000, 0.01, 0.3, 20);
    const foregroundParticles = createParticles(1500, 0.02, 0.7, 15);

    scene.add(backgroundParticles.points);
    scene.add(foregroundParticles.points);
    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.001;

      [backgroundParticles, foregroundParticles].forEach(({ points, originalPositions }, index) => {
        const positions = points.geometry.attributes.position.array as Float32Array;
        const speed = index === 0 ? 0.5 : 1; // Foreground moves faster

        for (let i = 0; i < positions.length; i += 3) {
          const x = originalPositions[i];
          const y = originalPositions[i + 1];
          const z = originalPositions[i + 2];

          // Add wave effect
          positions[i] = x + Math.sin(time * 2 + y) * 0.1 * speed;
          positions[i + 1] = y + Math.cos(time * 2 + x) * 0.1 * speed;
          positions[i + 2] = z;

          // Mouse interaction
          const dx = mouseX * 10 - x;
          const dy = mouseY * 10 - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, 1 - distance / 10) * speed;

          positions[i] += dx * force * 0.01;
          positions[i + 1] += dy * force * 0.01;
        }

        points.geometry.attributes.position.needsUpdate = true;
        points.rotation.y += 0.0005 * speed;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      backgroundParticles.points.geometry.dispose();
      backgroundParticles.points.material.dispose();
      foregroundParticles.points.geometry.dispose();
      foregroundParticles.points.material.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
