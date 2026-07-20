import { useEffect, useState } from "react";

interface NavigatorPerf extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

/**
 * Heurística de dispositivo fraco, avaliada uma única vez por sessão.
 * Cobre: preferência do usuário por menos movimento, economia de dados,
 * pouca RAM/CPU reportada pelo navegador e telas sem hover (touch).
 */
export function isLowPowerDevice(): boolean {
  if (typeof window === "undefined") return false;
  // Override manual para teste: ?perf=low força o modo leve
  if (new URLSearchParams(window.location.search).get("perf") === "low") return true;
  const nav = navigator as NavigatorPerf;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  if (nav.connection?.saveData) return true;
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) return true;
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 4) return true;
  return false;
}

/** Dispositivo sem mouse (touch) — efeitos de hover nunca aparecem nele. */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** Viewport mobile (< 768px), com valor correto já no primeiro render. */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
