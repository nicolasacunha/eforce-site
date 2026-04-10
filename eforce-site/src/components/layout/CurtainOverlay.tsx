import { motion, AnimatePresence } from 'framer-motion';
import { usePageTransition } from '@/context/TransitionContext';

const ease = [0.76, 0, 0.24, 1] as const;
const DURATION = 0.6;

export default function CurtainOverlay() {
  const { phase } = usePageTransition();
  const visible = phase === 'covering' || phase === 'revealing';

  return (
    <AnimatePresence>
      {visible && (
        <div key="curtain" style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'all' }}>
          {/* Single panel — rises from bottom, exits to top */}
          <motion.div
            style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}
            initial={{ y: '100%' }}
            animate={
              phase === 'covering'
                ? { y: '0%', transition: { duration: DURATION, ease } }
                : { y: '-100%', transition: { duration: DURATION, ease } }
            }
          />

          {/* Logo */}
          <motion.img
            src="/assets/images/brand/logobranconova.png"
            alt="E-Force"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              translate: '-50% -50%',
              width: 'clamp(240px, 32vw, 400px)',
              objectFit: 'contain',
              zIndex: 10000,
              pointerEvents: 'none',
              mixBlendMode: 'screen',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              phase === 'covering'
                ? { opacity: 1, scale: 1, transition: { delay: DURATION, duration: 0.35, ease: 'easeOut' } }
                : { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
            }
          />
        </div>
      )}
    </AnimatePresence>
  );
}
