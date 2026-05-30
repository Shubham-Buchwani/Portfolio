'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { getGPUTier } from 'detect-gpu';
import { GPU_TIERS, type GPUTier } from '@/lib/constants';

type GPUContextType = {
  tier: GPUTier;
  is3DEnabled: boolean;
  isMobile: boolean;
  isLoaded: boolean;
};

const GPUContext = createContext<GPUContextType>({
  tier: GPU_TIERS.HIGH,
  is3DEnabled: true,
  isMobile: false,
  isLoaded: false,
});

export function useGPU() {
  return useContext(GPUContext);
}

export function GPUProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GPUContextType>({
    tier: GPU_TIERS.HIGH,
    is3DEnabled: true,
    isMobile: false,
    isLoaded: false,
  });

  useEffect(() => {
    async function detect() {
      try {
        const result = await getGPUTier();
        const isMobile =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          );
        const prefersReducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

        let tier: GPUTier;
        if (isMobile) {
          // If mobile, still try to run at low settings, but you can set to FALLBACK if you prefer
          tier = GPU_TIERS.LOW;
        } else if (result.tier >= 3) {
          tier = GPU_TIERS.HIGH;
        } else if (result.tier >= 2) {
          tier = GPU_TIERS.MEDIUM;
        } else if (result.tier >= 1) {
          tier = GPU_TIERS.LOW;
        } else {
          // Even if tier is 0, let's allow low quality to try and run the WebGL scene
          tier = GPU_TIERS.LOW;
        }

        setState({
          tier,
          // Force 3D enabled for testing
          is3DEnabled: true,
          isMobile,
          isLoaded: true,
        });
      } catch {
        // If detection fails, assume medium capability
        setState({
          tier: GPU_TIERS.MEDIUM,
          is3DEnabled: true,
          isMobile: false,
          isLoaded: true,
        });
      }
    }

    detect();
  }, []);

  return <GPUContext.Provider value={state}>{children}</GPUContext.Provider>;
}
