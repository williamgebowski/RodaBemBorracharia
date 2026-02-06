import heroImage from "@/assets/rodabem-hero.jpg";
import servicosBgImage from "@/assets/servicos-bg.jpeg";
import fachadaImage from "@/assets/fachada-roda-bem.jpeg";
import logoImage from "@/assets/rodabem-logo.png";
import { PointerGlowField } from "@/components/PointerGlowField";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Container, Card, SectionTitle } from "@/components/landing/Layout";
import { SocorroSection } from "@/components/landing/SocorroSection";
import { TiresSection } from "@/components/landing/TiresSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Car,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

const WHATSAPP_URL = "https://wa.me/5551980406481";
const PHONE_TEL = "tel:+5551996473177";
const PHONE_DISPLAY = "(51) 99647-3177";
const ADDRESS_DISPLAY = "R. Adriano Quadros Bitencourt, 1141 - Rincão dos Ilhéus, Estância Velha - RS";

type FeatureCard = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const services: FeatureCard[] = [
  {
    title: "Borracharia linha leve",
    description: "Reparos, calibragem e solução rápida para carros e motos.",
    icon: <Wrench className="size-5" />,
  },
  {
    title: "Borracharia linha pesada",
    description: "Atendimento para caminhões, ônibus e equipamentos — do furo ao reforço.",
    icon: <Truck className="size-5" />,
  },
  {
    title: "Alinhamento",
    description: "Direção na mão, menos desgaste e mais estabilidade.",
    icon: <ArrowRight className="size-5" />,
  },
  {
    title: "Balanceamento",
    description: "Rodagem suave e segura, reduzindo vibrações.",
    icon: <CheckCircle2 className="size-5" />,
  },
  {
    title: "Suspensão rápida",
    description: "Inspeção e reparos essenciais para conforto e segurança.",
    icon: <ShieldCheck className="size-5" />,
  },
  {
    title: "Troca de pneus",
    description: "Troca ágil com torque correto e atenção aos detalhes.",
    icon: <Car className="size-5" />,
  },
];

const benefits: FeatureCard[] = [
  {
    title: "Atendimento rápido",
    description: "Processo organizado para você voltar à estrada sem perder tempo.",
    icon: <Clock className="size-5" />,
  },
  {
    title: "Profissionais qualificados",
    description: "Equipe experiente com foco em segurança e precisão.",
    icon: <ShieldCheck className="size-5" />,
  },
  {
    title: "Equipamentos modernos",
    description: "Ferramental e padrões de serviço de auto center premium.",
    icon: <Wrench className="size-5" />,
  },
  {
    title: "Preço justo",
    description: "Transparência no orçamento e soluções sob medida.",
    icon: <CheckCircle2 className="size-5" />,
  },
  {
    title: "Garantia de serviço",
    description: "Tranquilidade no pós-serviço e compromisso com qualidade.",
    icon: <CheckCircle2 className="size-5" />,
  },
];


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55">
        <Container className="flex h-16 items-center justify-between">
          <a href="#top" className="group inline-flex items-center gap-2">
            <img
              src={logoImage}
              alt="Logo Roda Bem"
              className="h-7 w-auto object-contain"
              loading="eager"
            />
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">Roda Bem Auto Center</p>
              <p className="text-xs text-muted-foreground">Borracharia • Pneus • Suspensão</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a className="story-link" href="#pneus">
              Pneus
            </a>
            <a className="story-link" href="#servicos">
              Serviços
            </a>
            <a className="story-link" href="#socorro">
              Socorro
            </a>
            <a className="story-link" href="#contato">
              Contato
            </a>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button asChild variant="whatsapp" size="sm">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle />
                WhatsApp
              </a>
            </Button>
            <Button asChild variant="premium" size="sm">
              <Link to="/catalogo-pneus-novos">
                Catálogo <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="hero" size="sm">
              <a href={PHONE_TEL} aria-label={`Ligar para ${PHONE_DISPLAY}`}>
                <Phone /> Ligar
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button asChild variant="premium" size="sm">
              <Link to="/catalogo-pneus-novos">Catálogo</Link>
            </Button>
            <Button asChild variant="hero" size="sm">
              <a href={PHONE_TEL} aria-label={`Ligar para ${PHONE_DISPLAY}`}>
                Ligar
              </a>
            </Button>
          </div>
        </Container>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <PointerGlowField className="bg-hero">
            <div className="absolute inset-0">
              <img
                src={heroImage}
                alt="Pneus robustos em um auto center premium"
                className="h-full w-full object-cover opacity-55"
                loading="eager"
              />
              <div className="absolute inset-0 bg-hero" aria-hidden />
            </div>

            <Container className="relative py-16 sm:py-20">
              <ScrollReveal className="max-w-3xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/60 px-4 py-2 text-xs font-semibold tracking-wide text-muted-foreground shadow-elev-1">
                  <ShieldCheck className="size-4 text-primary" />
                  Auto center premium • Linha leve e pesada
                </p>

                <p className="pulse-red mt-3 inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/12 px-4 py-2 text-xs font-semibold tracking-wide text-destructive">
                  <span className="inline-flex size-2 rounded-full bg-destructive" aria-hidden />
                  Prestamos Socorro
                </p>

                <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                  Especialistas em Pneus e Serviços Automotivos
                </h1>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Venda de pneus novos, borracharia completa e serviços rápidos de suspensão — com atendimento ágil,
                  equipamentos modernos e foco total na sua segurança.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button asChild variant="hero" size="xl">
                    <a href="#contato">
                      Solicitar Orçamento <ArrowRight />
                    </a>
                  </Button>
                  <Button asChild variant="destructive" size="xl" className="pulse-red">
                    <a href={PHONE_TEL} aria-label={`Ligar para socorro: ${PHONE_DISPLAY}`}>
                      <Phone /> Ligar para socorro
                    </a>
                  </Button>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { label: "Linha leve a pesada", value: "Cobertura completa" },
                    { label: "Auto center premium", value: "Padrão elevado" },
                    { label: "Serviço rápido", value: "Agilidade real" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg border border-border/70 bg-card/60 p-4 shadow-elev-1 backdrop-blur-sm"
                    >
                      <p className="text-sm font-semibold tracking-tight">{item.value}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </Container>
          </PointerGlowField>
        </section>

        {/* PNEUS */}
        <TiresSection />

        {/* SERVIÇOS */}
        <section id="servicos" className="relative isolate overflow-hidden py-16 sm:py-20">
          {/* background decor (right) */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
            <img
              src={servicosBgImage}
              alt=""
              className={
                "absolute left-1/2 top-1/2 h-[115%] w-[140%] -translate-x-1/2 -translate-y-1/2 object-cover object-center opacity-35 " +
                "sm:h-[120%] sm:w-[120%] lg:h-[125%] lg:w-[80%]"
              }
              loading="lazy"
            />
            {/* overlay verde translúcido (central) */}
            <div
              className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_45%,hsl(var(--primary)_/_0.22),transparent_62%)]"
            />
            {/* leve vinheta para integrar ao tema */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/40" />
          </div>

          <Container className="relative z-10">
            <ScrollReveal>
              <SectionTitle
                eyebrow="Serviços"
                title="Soluções rápidas para manter seu veículo seguro"
                description="Borracharia, alinhamento, balanceamento e suspensão com execução precisa e foco em confiança."
              />
            </ScrollReveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((srv) => (
                <ScrollReveal key={srv.title}>
                  <Card className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="inline-flex size-10 items-center justify-center rounded-md border border-border/80 bg-secondary shadow-elev-1">
                        <span className="text-primary">{srv.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold tracking-tight">{srv.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{srv.description}</p>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>

        {/* POR QUE */}
        <section className="surface border-y border-border/70 py-16 sm:py-20">
          <Container>
            <ScrollReveal>
              <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
                {/* Texto (mobile primeiro, desktop à direita) */}
                <div className="order-1 lg:order-2 lg:col-span-7">
                  <SectionTitle
                    eyebrow="Confiança & robustez"
                    title="Por que escolher a Roda Bem?"
                    description="Um atendimento forte e profissional — do orçamento à entrega — para você ter tranquilidade em cada quilômetro."
                  />

                  <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    {benefits.map((b) => (
                      <div
                        key={b.title}
                        className="rounded-lg border border-border/80 bg-card/70 p-5 shadow-elev-1 backdrop-blur-sm"
                      >
                        <div className="flex items-start gap-3">
                          <div className="inline-flex size-10 items-center justify-center rounded-md border border-border/80 bg-secondary shadow-elev-1">
                            <span className="text-primary">{b.icon}</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold tracking-tight">{b.title}</p>
                            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Imagem (mobile abaixo do título, desktop à esquerda) */}
                <div className="order-2 lg:order-1 lg:col-span-5">
                  <div className="mt-6 lg:mt-0 overflow-hidden rounded-lg border border-border/80 bg-card/40 shadow-elev-2">
                    <img
                      src={fachadaImage}
                      alt="Fachada do estabelecimento Roda Bem Auto Center"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </section>

        {/* SOCORRO */}
        <SocorroSection address={ADDRESS_DISPLAY} />

        {/* CONTATO */}
        <section id="contato" className="surface border-y border-border/70 py-16 sm:py-20">
          <Container>
            <ScrollReveal>
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <SectionTitle
                    eyebrow="Contato & localização"
                    title="Vamos resolver hoje?"
                    description="Clique no WhatsApp para orçamento rápido. Se preferir, ligue ou venha até a loja."
                  />

                  <div className="mt-7 grid gap-3">
                    <Button asChild variant="hero" size="xl" className="w-full justify-between">
                      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                        <span className="inline-flex items-center gap-2">
                          <MessageCircle /> WhatsApp (Orçamento)
                        </span>
                        <ArrowRight />
                      </a>
                    </Button>

                    <div className="rounded-lg border border-border/80 bg-card/70 p-5 shadow-elev-1">
                      <div className="grid gap-4">
                        <div className="flex items-start gap-3">
                          <Phone className="mt-0.5 size-5 text-primary" />
                          <div>
                            <p className="text-sm font-semibold tracking-tight">Telefone</p>
                            <p className="text-sm text-muted-foreground">{PHONE_DISPLAY}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="mt-0.5 size-5 text-primary" />
                          <div>
                            <p className="text-sm font-semibold tracking-tight">Endereço</p>
                            <p className="text-sm text-muted-foreground">{ADDRESS_DISPLAY}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="mt-0.5 size-5 text-primary" />
                          <div>
                            <p className="text-sm font-semibold tracking-tight">Horário</p>
                            <div className="text-sm text-muted-foreground">
                              <p>Seg–Sex: 07:00–18:30</p>
                              <p>Sáb: 07:00–12:00</p>
                              <p>Dom: Fechado</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="overflow-hidden rounded-lg border border-border/80 bg-card/60 shadow-elev-2">
                    <div className="aspect-[16/10]">
                      <iframe
                        title="Mapa — Roda Bem Auto Center Borracharia"
                        className="h-full w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps?q=Roda%20Bem%20Auto%20Center%20Borracharia&output=embed"
                      />
                    </div>
                  </div>
                </div>
              </div>
              </ScrollReveal>
            </Container>
          </section>

          {/* GALERIA */}
          <GallerySection />
        </main>

        <footer className="py-12">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-md border border-border/80 bg-secondary shadow-elev-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-tight">Roda Bem Auto Center Borracharia</p>
                  <p className="text-xs text-muted-foreground">Pneus novos • Borracharia • Suspensão</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Profissionalismo e robustez automotiva com estética moderna — foco em conversão, rapidez e confiança.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="text-sm font-semibold tracking-tight">Links rápidos</p>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <li>
                  <a className="story-link" href="#pneus">
                    Pneus novos
                  </a>
                </li>
                <li>
                  <a className="story-link" href="#servicos">
                    Serviços
                  </a>
                </li>
                <li>
                  <a className="story-link" href="#socorro">
                    Socorro
                  </a>
                </li>
                <li>
                  <a className="story-link" href="#contato">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <p className="text-sm font-semibold tracking-tight">Fale conosco</p>
              <div className="mt-3 grid gap-2">
                <Button asChild variant="whatsapp" size="sm" className="justify-between">
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    <span className="inline-flex items-center gap-2">
                      <MessageCircle /> WhatsApp
                    </span>
                    <ArrowRight />
                  </a>
                </Button>
                <Button asChild variant="premium" size="sm" className="justify-between">
                  <a href="#contato">
                    <span className="inline-flex items-center gap-2">
                      <Phone /> {PHONE_DISPLAY}
                    </span>
                    <ArrowRight />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Roda Bem Auto Center Borracharia. Todos os direitos reservados.</p>
            <p className="text-muted-foreground/80">Site rápido, responsivo e focado em conversão.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Index;
