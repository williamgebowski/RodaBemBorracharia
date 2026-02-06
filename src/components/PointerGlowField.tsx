import * as React from "react";

import { cn } from "@/lib/utils";

type PointerGlowFieldProps = {
  className?: string;
  children?: React.ReactNode;
};

/**
 * Assinatura visual: um “glow” azul que reage ao ponteiro.
 * Respeita prefers-reduced-motion (fica estático).
 */
export function PointerGlowField({ className, children }: PointerGlowFieldProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--glow-x", `${x.toFixed(2)}%`);
        el.style.setProperty("--glow-y", `${y.toFixed(2)}%`);
      });
    };

    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* camada do glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 glow-field opacity-70"
      />
      {children}
    </div>
  );
}
