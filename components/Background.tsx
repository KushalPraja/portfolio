"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f5f0f0");  // Keep the background color
    // Remove fog
    scene.fog = new THREE.FogExp2("#f5f0f0", 0.025);  // Removed fog

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create starfield
    const starCount = 4000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 2] = Math.random() * -150;
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: "#000000",
      size: 0.07,
      transparent: true,
      opacity: 0.9,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // Animation with forward movement
    const animate = () => {
      requestAnimationFrame(animate);

      const positions = stars.geometry.attributes.position.array;
      for (let i = 0; i < starCount; i++) {
        positions[i * 3 + 2] += 0.07;
        if (positions[i * 3 + 2] > 0) {
          positions[i * 3 + 2] = -150;
        }
      }
      stars.geometry.attributes.position.needsUpdate = true;

      // No auto rotation now; it's controlled by the user input
      renderer.render(scene, camera);
    };
    animate();

    // Handle mouse movement for rotation
    let isMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      prevMouseX = event.clientX;
      prevMouseY = event.clientY;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isMouseDown) {
        const deltaX = event.clientX - prevMouseX;
        const deltaY = event.clientY - prevMouseY;
        stars.rotation.y += deltaX * 0.005;  // Control horizontal rotation
        stars.rotation.x += deltaY * 0.005;  // Control vertical rotation
        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
      }
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
