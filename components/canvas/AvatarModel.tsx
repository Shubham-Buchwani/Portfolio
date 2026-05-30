'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/**
 * A "2.5D" avatar rendered in the hero 3D scene.
 * It simply floats in the hero and fades out as the user scrolls away.
 * The corner sticky avatar is handled separately as an HTML overlay.
 */
export default function AvatarModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const currentRotX = useRef(0);
  const currentRotY = useRef(0);

  const texture = useTexture('/images/avatar.png');
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.premultiplyAlpha = true;

  // Track mouse for parallax tilt (desktop only)
  useMemo(() => {
    if (typeof window === 'undefined') return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollProgress = useRef(0);

  useMemo(() => {
    if (typeof window === 'undefined') return;
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      import('gsap').then(({ gsap }) => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.create({
          trigger: '#hero',
          start: 'top top',
          end: '50% top',
          scrub: true,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        });
      });
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const progress = scrollProgress.current;
    const isMobile = state.viewport.aspect < 1;

    // Fade out avatar as user scrolls away from hero — no corner movement at all
    const opacity = 1 - progress;
    meshRef.current.visible = opacity > 0.01;
    if (meshRef.current.material) {
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }

    // Float animation
    const heroY = Math.sin(time * 1.5) * 0.05 + (isMobile ? 2.5 : 3.5);
    meshRef.current.position.set(0, heroY, 0);

    // Scale
    const baseScale = isMobile ? 1.2 : 2.2;
    meshRef.current.scale.setScalar(baseScale);

    // Smooth mouse parallax (desktop only, zeroed on mobile)
    const targetRotX = isMobile ? 0 : mouseTarget.current.y * 0.1;
    const targetRotY = isMobile ? 0 : mouseTarget.current.x * 0.15;
    currentRotX.current = THREE.MathUtils.lerp(currentRotX.current, targetRotX, 0.06);
    currentRotY.current = THREE.MathUtils.lerp(currentRotY.current, targetRotY, 0.06);
    meshRef.current.rotation.set(currentRotX.current, currentRotY.current, 0);
  });

  const onBeforeCompile = (shader: {
    uniforms: any;
    vertexShader: string;
    fragmentShader: string;
  }) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
      #include <dithering_fragment>
      if (length(gl_FragColor.rgb) < 0.15) {
        discard;
      }
      `
    );
  };

  const material = useMemo(() => {
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    mat.onBeforeCompile = onBeforeCompile;
    return mat;
  }, [texture]);

  return (
    <group>
      <mesh ref={meshRef} material={material}>
        <planeGeometry args={[2, 2, 64, 64]} />
      </mesh>
    </group>
  );
}
