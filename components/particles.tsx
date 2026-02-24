"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "@/lib/theme-context";
import * as THREE from "three";
import { cn } from "@/lib/utils";

function InteractiveCube({ isDark }: { isDark: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const color = isDark ? "#ffffff" : "#0a0a0a";

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.25;
            meshRef.current.rotation.y += delta * 0.35;
        }
    });

    const geometry = useMemo(() => new THREE.BoxGeometry(1.25, 1.25, 1.25), []);

    return (
        <mesh ref={meshRef} geometry={geometry}>
            <meshStandardMaterial color={color} wireframe opacity={isDark ? 0.2 : 0.14} transparent />
        </mesh>
    );
}

interface FloatingKnotProps {
    className?: string;
}

export default function FloatingKnot({ className }: FloatingKnotProps) {
    const { isDark } = useTheme();

    return (
        <div className={cn("w-[84px] h-[84px]", className)} aria-hidden="true">
            <Canvas
                camera={{ position: [0, 0, 4.8], fov: 40 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 3]} intensity={0.6} />
                <InteractiveCube isDark={isDark} />
                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={1.2}
                />
            </Canvas>
        </div>
    );
}
