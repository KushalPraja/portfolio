"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";

function Points() {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={new Float32Array(3000).map(() => (Math.random() - 0.5) * 10)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#333333" sizeAttenuation transparent />
    </points>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: new Vector3(0, 0, 5) }}>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      <Points />
    </Canvas>
  );
}
