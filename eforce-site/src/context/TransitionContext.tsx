import { createContext, useContext, useRef, useState, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface TransitionContextValue {
  phase: 'idle' | 'covering' | 'revealing';
  navigateWithCurtain: (to: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  phase: 'idle',
  navigateWithCurtain: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

const COVER_DURATION = 1200;
const REVEAL_DELAY = 80;

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<'idle' | 'covering' | 'revealing'>('idle');
  const navigate = useNavigate();
  const pendingRef = useRef<string | null>(null);

  const navigateWithCurtain = useCallback((to: string) => {
    if (phase !== 'idle') return;
    pendingRef.current = to;
    setPhase('covering');

    setTimeout(() => {
      if (pendingRef.current) navigate(pendingRef.current);
      setTimeout(() => {
        setPhase('revealing');
        setTimeout(() => setPhase('idle'), COVER_DURATION);
      }, REVEAL_DELAY);
    }, COVER_DURATION);
  }, [phase, navigate]);

  return (
    <TransitionContext.Provider value={{ phase, navigateWithCurtain }}>
      {children}
    </TransitionContext.Provider>
  );
}
