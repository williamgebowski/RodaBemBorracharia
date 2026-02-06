import * as React from "react";
import { Cpu, Layers, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import passeioImg from "@/assets/pneu-passeio.png";
import camioneteImg from "@/assets/pneu-camionete.jpeg";
import pesadaImg from "@/assets/pneu-linha-pesada.png";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Container, SectionTitle } from "@/components/landing/Layout";

gsap.registerPlugin(ScrollTrigger);

type TireCard = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const cards: TireCard[] = [
  {
    title: "Pneus de Passeio",
    description: "Segurança, conforto e durabilidade para o dia a dia — com montagem e balanceamento precisos.",
    image: passeioImg,
    imageAlt: "Pneus de passeio para carros",
  },
  {
    title: "Pneus de Camionete",
    description: "Resistência e performance para trabalho e estrada, com foco em estabilidade e vida útil.",
    image: camioneteImg,
    imageAlt: "Pneus para camionetes e SUVs",
  },
  {
    title: "Pneus Linha Pesada",
    description: "Robustez para carga pesada: soluções para caminhões, ônibus e frotas com suporte técnico.",
    image: pesadaImg,
    imageAlt: "Pneus de linha pesada para caminhões",
  },
];

function TechStackPills() {
  const items = [
    { label: "Grip", icon: <Layers className="size-3.5" /> },
    { label: "Performance", icon: <Cpu className="size-3.5" /> },
    { label: "Garantia", icon: <Sparkles className="size-3.5" /> },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <span
          key={it.label}
          className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/50 px-2.5 py-1 text-[11px] font-semibold tracking-tight text-muted-foreground"
        >
          <span className="text-primary">{it.icon}</span>
          {it.label}
        </span>
      ))}
    </div>
  );
}

function TireGlassCard({ card, className }: { card: TireCard; className?: string }) {
  return (
    <article
      className={cn(
        "tire-card group relative isolate h-full snap-center overflow-hidden rounded-xl border border-border/70 bg-card/35 p-5 shadow-elev-1 backdrop-blur-xl transition-[transform,box-shadow] duration-300",
        "hover:-translate-y-1 hover:shadow-elev-2",
        "focus-within:-translate-y-1 focus-within:shadow-elev-2",
        className,
      )}
      data-tire-card
    >
      {/* glass highlight */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300",
          "bg-[radial-gradient(700px_260px_at_30%_15%,hsl(var(--primary)_/_0.18),transparent_55%)]",
          "group-hover:opacity-100",
        )}
        aria-hidden
      />

      <div className="grid gap-4">
        <div className="rounded-lg border border-border/60 bg-secondary/20 p-3" data-tire-media>
          <img
            src={card.image}
            alt={card.imageAlt}
            className="h-40 w-full object-contain sm:h-44"
            loading="lazy"
          />
        </div>

        <div>
          <h3 className="text-base font-semibold tracking-tight">{card.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
        </div>

        <TechStackPills />

        <div className="pt-1">
          <Link
            to="/catalogo-pneus-novos"
            aria-label={`Ver catálogo: ${card.title}`}
            className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold tracking-tight",
              "text-primary-glow hover:text-primary",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "ring-offset-background",
            )}
          >
            Ver catálogo
            <span aria-hidden className="text-primary-glow/90">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function TiresSection() {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const cardsEls = gsap.utils.toArray<HTMLElement>("[data-tire-card]");
        if (!cardsEls.length) return;

        // Estado inicial estável (sem mexer em layout): só opacity/transform.
        gsap.set(cardsEls, { willChange: "transform,opacity" });

        // Entrada suave
        gsap.fromTo(
          cardsEls,
          { autoAlpha: 0, y: 18, scale: 0.99 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.1,
            clearProps: "transform",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 72%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );

        // Parallax sutil só na mídia (não desalinha o grid)
        cardsEls.forEach((card) => {
          const media = card.querySelector<HTMLElement>("[data-tire-media]");
          if (!media) return;

          gsap.fromTo(
            media,
            { y: 8 },
            {
              y: -8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        });

        // Garante medidas corretas após render/imagens
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }, sectionEl);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pneus" className="surface border-y border-border/70 py-16 sm:py-20">
      <Container>
        <ScrollReveal>
          <SectionTitle
            eyebrow="Pneus novos"
            title="Pneus Novos para Todas as Necessidades"
            description="Do passeio à linha pesada, trabalhamos com opções que equilibram performance, segurança e custo-benefício — com orientação técnica e instalação confiável."
          />
        </ScrollReveal>

        {/* Desktop grid */}
        <div className="mt-10 hidden gap-5 md:grid md:grid-cols-3">
          {cards.map((card) => (
            <TireGlassCard key={card.title} card={card} />
          ))}
        </div>

        {/* Mobile slider */}
        <div className="-mx-4 mt-10 md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {cards.map((card) => (
              <TireGlassCard
                key={card.title}
                card={card}
                className="w-[82%] min-w-[82%]"
              />
            ))}
          </div>
          <p className="mt-3 px-4 text-xs text-muted-foreground">Deslize para ver os tipos de pneus.</p>
        </div>
      </Container>
    </section>
  );
}
