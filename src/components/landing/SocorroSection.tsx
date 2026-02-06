import unidadeMovelImage from "@/assets/unidade-movel-socorro.jpeg";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CoverageAreaMap } from "@/components/landing/CoverageAreaMap";
import { Container, Card, SectionTitle } from "@/components/landing/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Car, MessageCircle, Phone, ShieldCheck, Truck } from "lucide-react";
import type * as React from "react";

const WHATSAPP_URL = "https://wa.me/5551980406481";
const PHONE_TEL = "tel:+5551996473177";

const VALE_DOS_SINOS_POINTS = [
  { name: "Estância Velha", lat: -29.653, lng: -51.184 },
  { name: "Novo Hamburgo", lat: -29.686, lng: -51.132 },
  { name: "São Leopoldo", lat: -29.754, lng: -51.149 },
  { name: "Campo Bom", lat: -29.676, lng: -51.061 },
  { name: "Sapiranga", lat: -29.639, lng: -51.006 },
  { name: "Ivoti", lat: -29.591, lng: -51.161 },
  { name: "Dois Irmãos", lat: -29.583, lng: -51.091 },
  { name: "Portão", lat: -29.701, lng: -51.243 },
] as const;
type CoverageItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const coverage: CoverageItem[] = [
  {
    title: "Automóveis",
    description: "Socorro e suporte rápido para carros e utilitários.",
    icon: <Car className="size-5" />,
  },
  {
    title: "Caminhões",
    description: "Atendimento para linha pesada com foco em segurança e agilidade.",
    icon: <Truck className="size-5" />,
  },
  {
    title: "Máquinas pesadas",
    description: "Apoio em operações com equipamentos e condições exigentes.",
    icon: <ShieldCheck className="size-5" />,
  },
  {
    title: "Indústrias",
    description: "Atendemos também dentro de indústrias quando necessário.",
    icon: <Building2 className="size-5" />,
  },
];

export function SocorroSection({ address }: { address: string }) {
  return (
    <section id="socorro" className="surface border-y border-border/70 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="overflow-hidden rounded-lg border border-border/80 bg-card/40 shadow-elev-2">
                <img
                  src={unidadeMovelImage}
                  alt="Unidade móvel de socorro da Roda Bem Auto Center"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal>
              <SectionTitle
                eyebrow="Socorro"
                title="Unidade móvel para atender onde você estiver"
                description="Prestamos socorro para automóveis, caminhões e máquinas pesadas — e também atendemos dentro de indústrias."
              />

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {coverage.map((item) => (
                  <Card key={item.title} className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="inline-flex size-10 items-center justify-center rounded-md border border-border/80 bg-secondary shadow-elev-1">
                        <span className="text-primary">{item.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild variant="hero" size="lg">
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    <MessageCircle /> Chamar no WhatsApp <ArrowRight />
                  </a>
                </Button>
                <Button asChild variant="premium" size="lg">
                  <a href={PHONE_TEL}>
                    <Phone /> Ligar agora
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-5xl">
          <ScrollReveal>
            <CoverageAreaMap address={address} regionLabel="Vale dos Sinos" regionPoints={[...VALE_DOS_SINOS_POINTS]} />
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
