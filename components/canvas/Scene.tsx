'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useGPU } from '@/components/providers/GPUProvider';
import ParticleField from '@/components/canvas/ParticleField';
import CameraController from '@/components/canvas/CameraController';

export default function Scene() {
  const { is3DEnabled, tier } = useGPU();

  if (!is3DEnabled) return null;

  return (
    <div className="scene-container">
      <Canvas
        gl={{
          antialias: tier >= 2,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={tier >= 3 ? [1, 2] : [1, 1]}
        camera={{
          fov: 60,
          near: 0.1,
          far: 100,
          position: [0, 1.5, 8],
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting rig: purple key, dim ambient, blue-white rim */}
          <ambientLight intensity={0.15} color="#1a0a2e" />
          <pointLight
            position={[-3, 3, 2]}
            intensity={2}
            color="#7C3AED"
            distance={15}
            decay={2}
          />
          <pointLight
            position={[3, 2, -1]}
            intensity={0.8}
            color="#4a1d8e"
            distance={10}
            decay={2}
          />
          <spotLight
            position={[0, 4, 5]}
            intensity={1}
            color="#ddd6fe"
            angle={0.6}
            penumbra={0.8}
            distance={20}
            decay={2}
          />


          {/* Background particle field */}
          <ParticleField />

          {/* Scroll-driven camera controller */}
          <CameraController />
        </Suspense>
      </Canvas>
    </div>
  );
}
