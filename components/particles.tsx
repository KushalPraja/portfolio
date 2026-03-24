"use client";

import { useRef, useMemo, useEffect, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "@/lib/theme-context";
import * as THREE from "three";
import { cn } from "@/lib/utils";

function InteractiveCube() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);
    const { isDark } = useTheme();
    const isDarkRef = useRef(isDark);

    const targetColor = useMemo(() => new THREE.Color(isDark ? "#ffffff" : "#0a0a0a"), []);
    const currentColor = useMemo(() => new THREE.Color(isDark ? "#ffffff" : "#0a0a0a"), []);
    const targetOpacity = useRef(isDark ? 0.2 : 0.14);

    useEffect(() => {
        isDarkRef.current = isDark;
        targetColor.set(isDark ? "#ffffff" : "#0a0a0a");
        targetOpacity.current = isDark ? 0.2 : 0.14;
    }, [isDark, targetColor]);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.25;
            meshRef.current.rotation.y += delta * 0.35;
        }
        if (materialRef.current) {
            currentColor.lerp(targetColor, delta * 3);
            materialRef.current.color.copy(currentColor);
            materialRef.current.opacity += (targetOpacity.current - materialRef.current.opacity) * delta * 3;
        }
    });

    const geometry = useMemo(() => new THREE.BoxGeometry(1.25, 1.25, 1.25), []);

    return (
        <mesh ref={meshRef} geometry={geometry}>
            <meshStandardMaterial
                ref={materialRef}
                wireframe
                transparent
                color="#ffffff"
                opacity={0.2}
            />
        </mesh>
    );
}

interface FloatingKnotProps {
    className?: string;
}

const StableCanvas = memo(function StableCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 4.8], fov: 40 }}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            dpr={[1, 2]}
            style={{ background: "transparent" }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 3]} intensity={0.6} />
            <InteractiveCube />
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                autoRotate
                autoRotateSpeed={1.2}
            />
        </Canvas>
    );
});

export default function FloatingKnot({ className }: FloatingKnotProps) {
    return (
        <div className={cn("w-[84px] h-[84px]", className)} aria-hidden="true">
            <StableCanvas />
        </div>
    );
}
