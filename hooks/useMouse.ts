import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export const useMouse = () => {
  const setMouse = useStore((state) => state.setMouse);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1 for WebGL
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setMouse]);
};
