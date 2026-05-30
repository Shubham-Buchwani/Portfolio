'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGPU } from '@/components/providers/GPUProvider';
import { PARTICLE_COUNTS } from '@/lib/constants';

export default function ParticleField() {
  const { tier } = useGPU();
  const pointsRef = useRef<THREE.Points>(null);
  const count = PARTICLE_COUNTS[tier] || 5000;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Color palette for particles (purple spectrum)
    const palette = [
      new THREE.Color('#7C3AED'),
      new THREE.Color('#A855F7'),
      new THREE.Color('#C084FC'),
      new THREE.Color('#6D28D9'),
      new THREE.Color('#4C1D95'),
    ];

    for (let i = 0; i < count; i++) {
      // Spread particles in a large volume
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;

      // Random purple shade
      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    return geo;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;

    // Slow ambient drift
    pointsRef.current.rotation.y = time * 0.01;
    pointsRef.current.rotation.x = Math.sin(time * 0.005) * 0.02;

    // Pulsing size
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.size = 0.08 + Math.sin(time * 0.5) * 0.02;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.3}
        size={0.08}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

