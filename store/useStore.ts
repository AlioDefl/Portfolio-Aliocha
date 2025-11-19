import { create } from 'zustand';

interface StoreState {
  // Loader state
  isLoading: boolean;
  loadProgress: number;
  setIsLoading: (isLoading: boolean) => void;
  setLoadProgress: (progress: number) => void;

  // Mouse position (global)
  mouse: { x: number; y: number };
  setMouse: (mouse: { x: number; y: number }) => void;

  // Current section (for scrollytelling)
  currentSection: string;
  setCurrentSection: (section: string) => void;

  // Language state
  language: 'fr' | 'en';
  setLanguage: (language: 'fr' | 'en') => void;

  // Cursor state
  cursorVariant: 'default' | 'hover' | 'drag';
  setCursorVariant: (variant: 'default' | 'hover' | 'drag') => void;
}

export const useStore = create<StoreState>((set) => ({
  isLoading: true,
  loadProgress: 0,
  setIsLoading: (isLoading) => set({ isLoading }),
  setLoadProgress: (loadProgress) => set({ loadProgress }),

  mouse: { x: 0, y: 0 },
  setMouse: (mouse) => set({ mouse }),

  currentSection: 'hero',
  setCurrentSection: (currentSection) => set({ currentSection }),

  language: 'fr',
  setLanguage: (language) => set({ language }),

  cursorVariant: 'default',
  setCursorVariant: (cursorVariant) => set({ cursorVariant }),
}));
