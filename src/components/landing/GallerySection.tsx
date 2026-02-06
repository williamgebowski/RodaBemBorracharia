import gal1 from "@/assets/galeria-1.jpeg";
import gal2 from "@/assets/galeria-2.jpeg";
import gal3 from "@/assets/galeria-3.jpeg";
import gal4 from "@/assets/galeria-4.jpeg";
import gal5 from "@/assets/galeria-5.jpeg";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Container, SectionTitle } from "@/components/landing/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const galleryPreview = [
  { src: gal1, alt: "Fachada da Roda Bem Auto Center" },
  { src: gal2, alt: "Unidade móvel de socorro da Roda Bem" },
  { src: gal3, alt: "Equipamentos e serviço de pneus na oficina" },
  { src: gal4, alt: "Trabalho de pneus e rodas realizado na Roda Bem" },
  { src: gal5, alt: "Estrutura interna da oficina com pneus" },
];

export const GallerySection = () => {
  return (
    <section id="galeria" className="surface border-y border-border/70 py-16 sm:py-20">
      <Container>
        <ScrollReveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <SectionTitle
                eyebrow="Galeria"
                title="Conheça a oficina e nossos serviços"
                description="Veja fotos do nosso estabelecimento, estrutura e trabalhos realizados."
              />
            </div>

            <Button asChild variant="premium" size="lg" className="shrink-0 sm:mb-2">
              <Link to="/galeria">
                Ver galeria <ArrowRight />
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {galleryPreview.map((img) => (
            <ScrollReveal key={img.alt}>
              <Link
                to="/galeria"
                className="group block overflow-hidden rounded-lg border border-border/80 bg-card/40 shadow-elev-1"
                aria-label="Abrir galeria de fotos"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
