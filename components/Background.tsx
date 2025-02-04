"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#ffffff');
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // --- BACKGROUND GRID ---
    const bgGeometry = new THREE.BufferGeometry();
    const bgParticleCount = 2000;
    const bgPositions = new Float32Array(bgParticleCount * 3);
    const bgColors = new Float32Array(bgParticleCount * 3);

    for (let i = 0; i < bgParticleCount; i++) {
      bgPositions[i * 3]     = (Math.random() - 0.5) * 50;
      bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    bgGeometry.setAttribute("position", new THREE.Float32BufferAttribute(bgPositions, 3));
    bgGeometry.setAttribute("color", new THREE.Float32BufferAttribute(bgColors, 3));

    const bgMaterial = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });
    const backgroundGrid = new THREE.Points(bgGeometry, bgMaterial);
    scene.add(backgroundGrid);

    // --- CURSOR GRID ---
    const cursorGeometry = new THREE.BufferGeometry();
    const cursorCount = 300;
    const cursorPositions = new Float32Array(cursorCount * 3);
    const cursorColors = new Float32Array(cursorCount * 3);

    for (let i = 0; i < cursorCount; i++) {
      cursorPositions[i * 3]     = (Math.random() - 0.5) * 1;
      cursorPositions[i * 3 + 1] = (Math.random() - 0.5) * 1;
      cursorPositions[i * 3 + 2] = (Math.random() - 0.5) * 1;
    }
    cursorGeometry.setAttribute("position", new THREE.Float32BufferAttribute(cursorPositions, 3));
    cursorGeometry.setAttribute("color", new THREE.Float32BufferAttribute(cursorColors, 3));

    const cursorMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });
    const cursorGrid = new THREE.Points(cursorGeometry, cursorMaterial);
    scene.add(cursorGrid);

    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    camera.position.z = 10;

    // Subtle animation
    const animate = () => {
      requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;

      // Background movement logic
      const bgPos = backgroundGrid.geometry.attributes.position.array as Float32Array;
      const bgCol = backgroundGrid.geometry.attributes.color.array as Float32Array;
      for (let i = 0; i < bgPos.length; i += 3) {
        const dx = bgPos[i] - targetX * 10;
        const dy = bgPos[i + 1] - targetY * 10;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 2) {
          bgPos[i]     += (dx / dist) * 0.1;
          bgPos[i + 1] += (dy / dist) * 0.1;
          bgCol[i] = 0.2; bgCol[i + 1] = 0.2; bgCol[i + 2] = 0.2;
        } else {
          bgCol[i] = 0; bgCol[i + 1] = 0; bgCol[i + 2] = 0;
        }
      }
      backgroundGrid.geometry.attributes.position.needsUpdate = true;
      backgroundGrid.geometry.attributes.color.needsUpdate = true;

      // Cursor grid movement logic
      const cPos = cursorGrid.geometry.attributes.position.array as Float32Array;
      const cCol = cursorGrid.geometry.attributes.color.array as Float32Array;
      for (let i = 0; i < cPos.length; i += 3) {
        // Lock to mouse position with slight jitter
        const offsetX = (Math.random() - 0.5) * 0.01;
        const offsetY = (Math.random() - 0.5) * 0.01;
        cPos[i]     = targetX * 10 + offsetX;
        cPos[i + 1] = targetY * 10 + offsetY;

        // Random color variation
        cCol[i]     = 0.3 + Math.random() * 0.2;
        cCol[i + 1] = 0.3 + Math.random() * 0.2;
        cCol[i + 2] = 0.3 + Math.random() * 0.2;
      }
      cursorGrid.geometry.attributes.position.needsUpdate = true;
      cursorGrid.geometry.attributes.color.needsUpdate = true;

      backgroundGrid.rotation.y += 0.0005;
      backgroundGrid.rotation.x += 0.0002;
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

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      bgGeometry.dispose();
      bgMaterial.dispose();
      cursorGeometry.dispose();
      cursorMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
