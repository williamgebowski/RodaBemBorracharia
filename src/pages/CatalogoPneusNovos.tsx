import { Container, SectionTitle } from "@/components/landing/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/landing/Layout";
import pneu1 from "@/assets/catalogo-pneu-1.png";
import pneu2 from "@/assets/catalogo-pneu-2.png";
import pneu3 from "@/assets/catalogo-pneu-3.png";
import pneu4 from "@/assets/catalogo-pneu-4.png";
import pneu5 from "@/assets/catalogo-pneu-5.png";
import { Link } from "react-router-dom";

type CatalogItem = {
  name: string;
  category: string;
  image: string;
  imageAlt: string;
};

const items: CatalogItem[] = [
  {
    name: "Pneu Touring A",
    category: "Passeio",
    image: pneu1,
    imageAlt: "Pneu de passeio modelo Touring A",
  },
  {
    name: "Pneu Assurance",
    category: "Passeio",
    image: pneu2,
    imageAlt: "Pneu de passeio modelo Assurance",
  },
  {
    name: "Pneu Comfort",
    category: "Passeio",
    image: pneu3,
    imageAlt: "Pneu de passeio modelo Comfort",
  },
  {
    name: "Pneu Cargo Marathon",
    category: "Camionete",
    image: pneu4,
    imageAlt: "Pneu para camionete modelo Cargo Marathon",
  },
  {
    name: "Pneu Edge Touring",
    category: "Passeio",
    image: pneu5,
    imageAlt: "Pneu de passeio modelo Edge Touring",
  },
];

export default function CatalogoPneusNovos() {
  return (
    <main className="surface min-h-[calc(100vh-64px)] py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow="Catálogo"
              title="Catálogo de Pneus Novos"
              description="Exemplos de pneus para referência (vamos substituir por modelos/marcas e medidas reais depois)."
            />

            <Button asChild variant="premium" className="w-full sm:w-auto">
              <Link to="/#pneus">Voltar</Link>
            </Button>
          </div>

          <section aria-label="Lista de pneus" className="mt-2">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it) => (
                <Card key={it.name} className="p-5">
                  <div className="rounded-lg border border-border/60 bg-secondary/20 p-3">
                    <img
                      src={it.image}
                      alt={it.imageAlt}
                      loading="lazy"
                      className="h-44 w-full object-contain"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-semibold tracking-wide text-primary">{it.category}</p>
                    <h2 className="mt-1 text-base font-semibold tracking-tight">{it.name}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Medidas e marcas: em breve (exemplo).
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button
                      variant="hero"
                      size="sm"
                      className="w-full justify-between"
                      type="button"
                      onClick={() => {
                        const contato = document.querySelector("#contato");
                        contato?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      Solicitar orçamento
                      <span className="text-primary-foreground/90">→</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
