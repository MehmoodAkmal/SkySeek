import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";

function Earth() {
  const earthRef = useRef();
  const texture = useTexture("/earth_texture.jpg"); // use a proper equirectangular Earth texture image

  // Rotate the globe continuously
  useFrame(() => {
    earthRef.current.rotation.y += 0.0015;
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} /> {/* radius=2, smooth sphere */}
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function Globe() {
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 6] }}>
        {/* 🌟 Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} />

        {/* 🌍 Earth */}
        <Earth />

        {/* 🌌 Background stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} fade />

        {/* 🖱️ Optional orbit controls (drag to rotate) */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
