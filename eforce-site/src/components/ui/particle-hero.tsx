import { useEffect, useRef } from "react";

const CSS = `
@keyframes load { 0%{opacity:0} 100%{opacity:1} }
@keyframes up   { 100%{transform:translateY(0)} }
@keyframes load3{ 0%{opacity:0} 100%{opacity:0.7} }
@keyframes pulse{ 0%{--p:0%} 50%{--p:300%} 100%{--p:300%} }
@keyframes spotlight{
  0%  {transform:rotateZ(0deg) scale(1);  filter:blur(15px) opacity(0.5)}
  20% {transform:rotateZ(-1deg) scale(1.2);filter:blur(16px) opacity(0.6)}
  40% {transform:rotateZ(2deg) scale(1.3); filter:blur(14px) opacity(0.4)}
  60% {transform:rotateZ(-2deg) scale(1.2);filter:blur(15px) opacity(0.6)}
  80% {transform:rotateZ(1deg) scale(1.1); filter:blur(13px) opacity(0.4)}
  100%{transform:rotateZ(0deg) scale(1);  filter:blur(15px) opacity(0.5)}
}
@keyframes loadrot{0%{transform:rotate(0deg) scale(0)} 100%{transform:scale(1)}}
@keyframes accentload{0%{opacity:0;transform:scale(0)} 100%{opacity:1;transform:scale(1)}}
@property --p{ syntax:'<percentage>'; inherits:false; initial-value:0% }
`;

interface Particle {
  x: number; y: number; speed: number; opacity: number;
  fadeDelay: number; fadeStart: number; fadingOut: boolean;
  reset: () => void; update: () => void; draw: (ctx: CanvasRenderingContext2D) => void;
}

function makeParticle(canvas: HTMLCanvasElement): Particle {
  const p: Particle = {
    x: 0, y: 0, speed: 0, opacity: 1, fadeDelay: 0, fadeStart: 0, fadingOut: false,
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.speed = Math.random() / 5 + 0.1;
      this.opacity = 1;
      this.fadeDelay = Math.random() * 600 + 100;
      this.fadeStart = Date.now() + this.fadeDelay;
      this.fadingOut = false;
    },
    update() {
      this.y -= this.speed;
      if (this.y < 0) this.reset();
      if (!this.fadingOut && Date.now() > this.fadeStart) this.fadingOut = true;
      if (this.fadingOut) { this.opacity -= 0.008; if (this.opacity <= 0) this.reset(); }
    },
    draw(ctx) {
      ctx.fillStyle = `rgba(${255 - (Math.random() * 255) / 2}, 255, 255, ${this.opacity})`;
      ctx.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1);
    },
  };
  p.reset();
  p.y = Math.random() * canvas.height;
  p.fadeDelay = Math.random() * 600 + 100;
  p.fadeStart = Date.now() + p.fadeDelay;
  return p;
}

export function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const count = Math.floor((canvas.width * canvas.height) / 6000);
      particlesRef.current = Array.from({ length: count }, () => makeParticle(canvas));
    };

    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach(p => { p.update(); p.draw(ctx); });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Spotlight beams */}
      <div style={{ pointerEvents: "none", position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              borderRadius: "0 0 50% 50%",
              position: "absolute",
              left: 0, right: 0,
              margin: "0 auto",
              top: "3em",
              width: "30em",
              height: "max(42em, 86vh)",
              backgroundImage: "conic-gradient(from 0deg at 50% -5%, transparent 45%, rgba(124,145,182,.3) 49%, rgba(124,145,182,.5) 50%, rgba(124,145,182,.3) 51%, transparent 55%)",
              transformOrigin: "50% 0",
              filter: "blur(15px) opacity(0.5)",
              transform: i === 0 ? "rotate(20deg)" : i === 1 ? "rotate(-20deg)" : "rotate(0deg)",
              animation: `loadrot 2s ease-in-out forwards, spotlight ${[17,14,21][i]}s ease-in-out infinite${i === 2 ? " reverse" : ""}`,
            }}
          />
        ))}
      </div>

      {/* Accent lines */}
      <div style={{ pointerEvents: "none", position: "absolute", inset: 0, zIndex: 0 }}>
        {[6, 11, 16, 24, 29].map((top, i) => (
          <div key={i} style={{
            position: "absolute", top: `${top}em`, left: 0, right: 0, margin: "auto",
            width: "100%", height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(186,215,247,.18), transparent)",
            opacity: 0, transform: "scale(0)",
            animation: "accentload 2s ease-out 1.4s forwards",
          }} />
        ))}
        {[24, 34, -24, -34].map((left, i) => (
          <div key={i} style={{
            position: "absolute", top: 0,
            left: left > 0 ? `${left}em` : "auto",
            right: left < 0 ? `${Math.abs(left)}em` : "auto",
            margin: "auto", width: "1px", height: "100%",
            background: "rgba(186,215,247,.18)",
            opacity: 0, transform: "scale(0)",
            animation: "accentload 2s ease-out 1s forwards",
          }} />
        ))}
      </div>

      {/* Particles canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1, animation: "load 0.4s ease-in-out forwards" }}
      />

      {/* Animated title */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 2, pointerEvents: "none",
        opacity: 0, animation: "load 2s ease-in-out 0.6s forwards",
      }}>
        <h2 style={{
          fontSize: "clamp(4rem, 10vw, 9rem)",
          fontWeight: 600,
          color: "#9dc3f7",
          background: `
            radial-gradient(2em 2em at 50% 50%,
              transparent calc(var(--p, 0%) - 2em),
              #fff calc(var(--p, 0%) - 1em),
              #fff calc(var(--p, 0%) - 0.4em),
              transparent var(--p, 0%)
            ),
            linear-gradient(0deg, #bad1f1 30%, #9dc3f7 100%)
          `,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 2px 16px rgba(174,207,242,.24)",
          letterSpacing: "-0.04em",
          fontStyle: "italic",
          animation: "pulse 10s linear 1.2s infinite",
          margin: 0,
        }}>
          EF2 V3
        </h2>
      </div>
    </>
  );
}
