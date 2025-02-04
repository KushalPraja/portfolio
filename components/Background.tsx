"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create points with initial positions
    const geometry = new THREE.BufferGeometry();
    const particleCount = 2500;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      let x, y, z;
      // Keep generating random positions until they're not too close to the center
      do {
        x = (Math.random() - 0.5) * 15;
        y = (Math.random() - 0.5) * 15;
        z = (Math.random() - 0.5) * 15;
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
      size: 0.015,
      color: '#333333',
      transparent: true,
      opacity: 0.7
    });
    
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;

      const positions = points.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        const z = originalPositions[i + 2];

        positions[i] = x + targetX * 50;
        positions[i + 1] = y + targetY * 50;
        positions[i + 2] = z;
      }

      points.geometry.attributes.position.needsUpdate = true;
      points.rotation.y += 0.0005;
      
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
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
