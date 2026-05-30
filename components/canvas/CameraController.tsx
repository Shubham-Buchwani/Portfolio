'use client';

import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAMERA_WAYPOINTS, SECTIONS } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

export default function CameraController() {
  const { camera } = useThree();
  const progressRef = useRef(0);
  const targetPos = useRef(new THREE.Vector3(0, 1.5, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.2, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0));

  useEffect(() => {
    // Build a CatmullRom spline through all waypoints
    const waypoints = SECTIONS.map((s) => CAMERA_WAYPOINTS[s.id]);
    const positionPoints = waypoints.map(
      (w) => new THREE.Vector3(...w.position)
    );
    const lookAtPoints = waypoints.map(
      (w) => new THREE.Vector3(...w.lookAt)
    );

    const positionCurve = new THREE.CatmullRomCurve3(positionPoints, false, 'centripetal', 0.5);
    const lookAtCurve = new THREE.CatmullRomCurve3(lookAtPoints, false, 'centripetal', 0.5);

    // Master ScrollTrigger — maps full page scroll to 0-1 progress
    const trigger = ScrollTrigger.create({
      trigger: '#scroll-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self) => {
        progressRef.current = self.progress;

        // Sample the curves at current progress
        const pos = positionCurve.getPoint(self.progress);
        const look = lookAtCurve.getPoint(self.progress);

        targetPos.current.copy(pos);
        targetLookAt.current.copy(look);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Smooth interpolation in the render loop
  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.05);
    currentLookAt.current.lerp(targetLookAt.current, 0.05);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
