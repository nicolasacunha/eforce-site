import { useEffect, useRef, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/useDevicePerf';

interface ScrollExpandMediaProps {
  mediaSrc: string;
  videoSrc?: string;
  posterSrc?: string;
  videoId?: string;
  title?: string;
  scrollToExpand?: string;
  children?: ReactNode;
}

export default function ScrollExpandMedia({
  mediaSrc,
  videoSrc,
  posterSrc,
  videoId,
  title,
  scrollToExpand,
  children,
}: ScrollExpandMediaProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const isMobile = useIsMobile();

  const sectionRef = useRef<HTMLDivElement | null>(null);

  const handleWheelEvent = useCallback(
    (e: WheelEvent) => {
      if (document.body.style.overflow === 'hidden') return;
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        window.dispatchEvent(new CustomEvent('hero-expanded', { detail: false }));
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
          window.dispatchEvent(new CustomEvent('hero-expanded', { detail: true }));
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    },
    [scrollProgress, mediaFullyExpanded]
  );

  const handleTouchStartEvent = useCallback((e: TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  }, []);

  const handleTouchMoveEvent = useCallback(
    (e: TouchEvent) => {
      if (document.body.style.overflow === 'hidden') return;
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        window.dispatchEvent(new CustomEvent('hero-expanded', { detail: false }));
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
          window.dispatchEvent(new CustomEvent('hero-expanded', { detail: true }));
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
        setTouchStartY(touchY);
      }
    },
    [scrollProgress, mediaFullyExpanded, touchStartY]
  );

  const handleTouchEndEvent = useCallback(() => {
    setTouchStartY(0);
  }, []);

  const handleScrollEvent = useCallback(() => {
    if (document.body.style.overflow === 'hidden') return;
    if (!mediaFullyExpanded) {
      window.scrollTo(0, 0);
    }
  }, [mediaFullyExpanded]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheelEvent, { passive: false });
    window.addEventListener('scroll', handleScrollEvent);
    window.addEventListener('touchstart', handleTouchStartEvent, { passive: false });
    window.addEventListener('touchmove', handleTouchMoveEvent, { passive: false });
    window.addEventListener('touchend', handleTouchEndEvent);

    return () => {
      window.removeEventListener('wheel', handleWheelEvent);
      window.removeEventListener('scroll', handleScrollEvent);
      window.removeEventListener('touchstart', handleTouchStartEvent);
      window.removeEventListener('touchmove', handleTouchMoveEvent);
      window.removeEventListener('touchend', handleTouchEndEvent);
    };
  }, [handleWheelEvent, handleScrollEvent, handleTouchStartEvent, handleTouchMoveEvent, handleTouchEndEvent]);

  // Product image: starts invisible, grows with scroll to fill viewport
  const mediaOpacity = Math.min(scrollProgress * 2.5, 1);
  const mediaScale = 0.3 + scrollProgress * 0.7; // 30% → 100% of viewport

  // Text: starts centered, splits apart and fades
  const textTranslateX = scrollProgress * (isMobile ? 120 : 100);
  const textOpacity = Math.max(1 - scrollProgress * 2, 0);

  // Video background: fades out as product takes over
  const videoBgOpacity = 1 - scrollProgress;

  // Split title
  const words = title ? title.split(' ') : [];
  const midpoint = Math.ceil(words.length / 2);
  const firstHalf = words.slice(0, midpoint).join(' ');
  const secondHalf = words.slice(midpoint).join(' ');

  const ytEmbedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3&vq=hd1080&hd=1&quality=highres`
    : '';

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <section className="relative min-h-[100dvh] bg-black overflow-hidden">

        {/* Video background — plays from the start, fades with scroll */}
        <div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{ opacity: videoBgOpacity, transition: 'none' }}
        >
          {/* Mobile: poster estático — o vídeo não é baixado nem reproduzido */}
          {videoSrc && isMobile ? (
            <img
              src={posterSrc ?? mediaSrc}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
          ) : videoSrc ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={posterSrc}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : ytEmbedUrl ? (
            <iframe
              src={ytEmbedUrl}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                border: 'none',
                width: 'calc(max(177.78vh, 100vw) + 4px)',
                height: 'calc(max(56.25vw, 100vh) + 4px)',
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="E-Force hero video"
            />
          ) : null}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center">

          {/* Product image — appears and grows on scroll to fill viewport */}
          <div
            className="absolute inset-0 z-0 flex items-center justify-center"
            style={{ opacity: mediaOpacity, transition: 'none' }}
          >
            <div
              className="overflow-hidden"
              style={{
                width: `${mediaScale * 100}vw`,
                height: `${mediaScale * 100}vh`,
                borderRadius: mediaScale < 0.95 ? '1rem' : '0',
                boxShadow: mediaOpacity > 0.3 && mediaScale < 0.95 ? '0 25px 80px rgba(0,0,0,0.3)' : 'none',
                transition: 'none',
              }}
            >
              <img
                src={mediaSrc}
                alt={title || 'E-Force Drums'}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Title — white on video, splits on scroll */}
          <div
            className="relative z-10 flex flex-col items-center justify-center gap-3 px-6 text-center"
            style={{ opacity: textOpacity, transition: 'none' }}
          >
            <h1
              className="font-display font-bold"
              style={{
                transform: `translateX(-${textTranslateX}vw)`,
                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: '#ffffff',
                textShadow: '0 2px 40px rgba(0,0,0,0.3)',
                transition: 'none',
              }}
            >
              {firstHalf}
            </h1>
            <h1
              className="font-display font-bold"
              style={{
                transform: `translateX(${textTranslateX}vw)`,
                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: '#ffffff',
                textShadow: '0 2px 40px rgba(0,0,0,0.3)',
                transition: 'none',
              }}
            >
              {secondHalf}
            </h1>

            {scrollToExpand && (
              <p
                className="mt-8"
                style={{
                  opacity: Math.max(1 - scrollProgress * 4, 0),
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#ff4a1c',
                  transition: 'none',
                }}
              >
                {scrollToExpand}
              </p>
            )}
          </div>
        </div>

        {/* Content after expansion */}
        <motion.div
          className="relative z-10 bg-brand-black px-8 py-10 md:px-16 lg:py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.7 }}
        >
          {children}
        </motion.div>
      </section>
    </div>
  );
}
