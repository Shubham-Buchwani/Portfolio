'use client';

import { useState, useEffect, useCallback } from 'react';
import { GPUProvider, useGPU } from '@/components/providers/GPUProvider';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import Scene from '@/components/canvas/Scene';
import LoadingScreen from '@/components/ui/LoadingScreen';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import SectionLabel from '@/components/ui/SectionLabel';
import ContactModal from '@/components/ui/ContactModal';
import Hero from '@/components/sections/Hero';
import Identity from '@/components/sections/Identity';
import Capabilities from '@/components/sections/Capabilities';
import Differentiator from '@/components/sections/Differentiator';
import Projects from '@/components/sections/Projects';
import Mindset from '@/components/sections/Mindset';
import Journey from '@/components/sections/Journey';
import Focus from '@/components/sections/Focus';
import Contact from '@/components/sections/Contact';

function PageContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const { isLoaded: gpuLoaded } = useGPU();

  // Simulate loading progress (will be replaced with real asset loading)
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setLoadProgress(Math.min(progress, 100));
    }, 200);

    return () => clearInterval(interval);
  }, []);
  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    
    // The loading screen being removed can cause a slight layout shift, and 
    // mobile browsers can also be flaky with 100vh during initial load. 
    // We force GSAP to recalculate all trigger coordinates exactly where they belong.
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      // Short delay to ensure React has fully committed the DOM updates
      setTimeout(() => ScrollTrigger.refresh(), 150);
    });
  }, []);

  return (
    <>
      {/* Loading screen overlay */}
      {isLoading && (
        <LoadingScreen
          progress={loadProgress}
          onComplete={handleLoadComplete}
        />
      )}

      {/* Global Contact Modal */}
      <ContactModal />

      {/* Film grain noise overlay */}
      <NoiseOverlay />

      {/* Section label indicator */}
      <SectionLabel />

      {/* Three.js 3D scene (fixed behind everything) */}
      <Scene />

      {/* Skip to content link for accessibility */}
      <a href="#hero" className="skip-link">
        Skip to content
      </a>

      {/* Main scroll container */}
      <main id="scroll-container">
        <Hero />
        <Identity />
        <Capabilities />
        <Differentiator />
        <Projects />
        <Mindset />
        <Journey />
        <Focus />
        <Contact />
      </main>
    </>
  );
}

export default function Home() {
  return (
    <GPUProvider>
      <SmoothScrollProvider>
        <PageContent />
      </SmoothScrollProvider>
    </GPUProvider>
  );
}
