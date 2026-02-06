import * as React from "react";

import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** 0..1 */
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export function ScrollReveal({
  children,
  className,
  threshold = 0.18,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "will-change-transform",
        visible ? "animate-slide-in-up" : "opacity-0 translate-y-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
