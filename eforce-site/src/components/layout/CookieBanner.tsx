import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'eforce_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: 0,
            right: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            zIndex: 9999,
            width: 'calc(100% - 3rem)',
            maxWidth: '720px',
            background: '#111',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1rem',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          }}
        >
          <p style={{
            flex: 1,
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.6,
            margin: 0,
          }}>
            Utilizamos cookies para oferecer melhor experiência, melhorar o desempenho, analisar como você interage em nosso site e personalizar conteúdo. Ao utilizar este site, você concorda com o uso de cookies.
          </p>
          <button
            onClick={accept}
            style={{
              flexShrink: 0,
              background: '#ff4a1c',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6rem 1.4rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Aceitar
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
