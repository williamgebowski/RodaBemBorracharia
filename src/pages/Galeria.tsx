import gal1 from "@/assets/galeria-1.jpeg";
import gal2 from "@/assets/galeria-2.jpeg";
import gal3 from "@/assets/galeria-3.jpeg";
import gal4 from "@/assets/galeria-4.jpeg";
import gal5 from "@/assets/galeria-5.jpeg";
import gal6 from "@/assets/galeria-6.jpeg";
import gal7 from "@/assets/galeria-7.jpeg";

import wpp1 from "@/assets/galeria-wpp-1.jpeg";
import wpp2 from "@/assets/galeria-wpp-2.jpeg";
import wpp3 from "@/assets/galeria-wpp-3.jpeg";
import wpp4 from "@/assets/galeria-wpp-4.jpeg";
import wpp5 from "@/assets/galeria-wpp-5.jpeg";
import wpp6 from "@/assets/galeria-wpp-6.jpeg";
import wpp7 from "@/assets/galeria-wpp-7.jpeg";
import wpp8 from "@/assets/galeria-wpp-8.jpeg";
import wpp9 from "@/assets/galeria-wpp-9.jpeg";
import wpp10 from "@/assets/galeria-wpp-10.jpeg";
import wpp11 from "@/assets/galeria-wpp-11.jpeg";

import { ScrollReveal } from "@/components/ScrollReveal";
import { Container, SectionTitle } from "@/components/landing/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const gallery = [
  { src: gal1, alt: "Fachada da Roda Bem Auto Center" },
  { src: gal6, alt: "Fachada da Roda Bem com veículos na entrada" },
  { src: gal2, alt: "Unidade móvel de socorro da Roda Bem" },
  { src: gal3, alt: "Máquina e serviço de pneus na oficina" },
  { src: gal4, alt: "Trabalho com rodas e pneus realizado na Roda Bem" },
  { src: gal5, alt: "Estrutura interna da oficina com pneus" },
  { src: gal7, alt: "Atendimento de linha pesada em serviço externo" },

  { src: wpp1, alt: "Pneus novos ao lado de veículo na oficina" },
  { src: wpp2, alt: "Serviço de pneus e roda em veículo na oficina" },
  { src: wpp3, alt: "Pneu de grande porte em equipamento de oficina" },
  { src: wpp4, alt: "Estoque de pneus novos" },
  { src: wpp5, alt: "Serviço em pneu de grande porte em área externa" },
  { src: wpp6, alt: "Atendimento noturno com equipamento e pneus" },
  { src: wpp7, alt: "Equipamento de compactação próximo à oficina" },
  { src: wpp8, alt: "Máquina e estrutura da oficina (área externa)" },
  { src: wpp9, alt: "Estoque e exposição de pneus na oficina" },
  { src: wpp10, alt: "Serviço em veículo na oficina (carro no elevador)" },
  { src: wpp11, alt: "Empilhadeira na área interna da oficina" },
];

const Galeria = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55">
        <Container className="flex h-16 items-center justify-between">
          <Button asChild variant="premium" size="sm">
            <Link to="/">
              <ArrowLeft /> Voltar
            </Link>
          </Button>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-tight">Galeria</p>
            <p className="text-xs text-muted-foreground">Roda Bem Auto Center</p>
          </div>

          <Button asChild variant="hero" size="sm">
            <a href="#fotos">
              Ver fotos <ExternalLink />
            </a>
          </Button>
        </Container>
      </header>

      <main id="fotos" className="py-10 sm:py-14">
        <Container>
          <ScrollReveal>
            <SectionTitle
              eyebrow="Galeria"
              title="Fotos do estabelecimento e serviços"
              description="Seleção de fotos para você conhecer nossa estrutura e a qualidade dos trabalhos realizados."
            />
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((img) => (
              <ScrollReveal key={img.alt}>
                <a
                  href={img.src}
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden rounded-lg border border-border/80 bg-card/40 shadow-elev-1"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </a>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10">
            <Button asChild variant="premium" size="lg">
              <Link to="/">Voltar para a home</Link>
            </Button>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Galeria;
