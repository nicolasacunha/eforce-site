import { ParticleHero } from "@/components/ui/particle-hero";

/** Wrapper que exibe apenas o efeito de partículas do ParticleHero,
 *  sem o título animado "EF2 V3" embutido no componente. */
export function ParticleHeroBackground() {
  return (
    <div className="particle-hero-bg" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <style>{`.particle-hero-bg h2 { display: none !important; }`}</style>
      <ParticleHero />
    </div>
  );
}
