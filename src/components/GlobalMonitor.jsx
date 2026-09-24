import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#f43f5e" />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial 
            color="#1e1e1e" 
            wireframe 
            transparent 
            opacity={0.3}
          />
        </mesh>
        <Sphere args={[1.4, 64, 64]}>
          <MeshDistortMaterial
            color="#f43f5e"
            speed={2}
            distort={0.3}
            radius={1}
          />
        </Sphere>
      </Float>
    </group>
  );
};

const GlobalMonitor = () => {
  return (
    <div className="w-full h-40 bg-primary/5 rounded-2xl overflow-hidden relative border border-primary/10">
      <div className="absolute top-3 left-3 z-10">
        <div className="text-[10px] font-black text-primary uppercase tracking-tighter">Global Impact</div>
        <div className="text-xs text-gray-400 font-bold">2.4k Active Responders</div>
      </div>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <Globe />
      </Canvas>
    </div>
  );
};

export default GlobalMonitor;
