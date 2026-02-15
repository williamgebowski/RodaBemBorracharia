
Objetivo
- Melhorar o SEO “do que aparece no Google” para o site da Roda Bem: título, descrição, ícone (favicon), preview ao compartilhar no WhatsApp/Facebook, e “entendimento” do negócio pelo Google (endereço, telefone, horário, serviços e região Vale dos Sinos).
- Sem depender de backend: tudo via arquivos estáticos (index.html/public) e boas práticas para SPA (React + Vite).

O que identifiquei no projeto (estado atual)
- `index.html` ainda tem metadados genéricos:
  - `meta description`: “Lovable Generated Project”
  - `meta author`: “Lovable”
  - `og:description` genérico
  - `og:image` apontando para imagem padrão do Lovable (não é a sua)
  - `twitter:site` @Lovable
  - `html lang="en"` (o site é em PT-BR)
- Existe `public/robots.txt`, mas:
  - Não há `sitemap.xml`
  - Robots não referencia sitemap
- O site é SPA com `react-router-dom`. Portanto:
  - Metatags de página (por rota) não existem hoje e o Google pode indexar, mas fica melhor ter pelo menos o “global” bem feito.
  - Se quisermos SEO “mais completo por página” (Home vs Catálogo vs Galeria), precisaremos de uma camada de gerenciamento de meta tags no React (ex: `react-helmet-async`) ou aceitar SEO global.

Informações que vou usar (confirmadas)
- Nome: Roda Bem Auto Center Borracharia
- Região foco: Vale dos Sinos (Estância Velha - RS)
- Contato:
  - WhatsApp: (51) 98040-6481
  - Telefone: (51) 99647-3177
- Endereço: R. Adriano Quadros Bitencourt, 1141 - Rincão dos Ilhéus, Estância Velha - RS
- Horário:
  - Seg–Sex: 07:00–18:30
  - Sáb: 07:00–12:00
  - Dom: Fechado
- Socorro: não é 24h
- Domínio oficial (canonical): https://rodabemborracharia.com.br/

Plano de implementação (frontend/arquivos estáticos)
1) Ajustes SEO essenciais no `index.html` (impacto imediato)
   1.1) Linguagem e regionalização
   - Trocar `<html lang="en">` para `<html lang="pt-BR">`.

   1.2) Title e Meta Description (snippet do Google)
   - Manter o `<title>` já correto.
   - Substituir `meta name="description"` por um texto real (curto, forte, com localização e serviços).
     Sugestão de description (eu implemento assim, você pode pedir ajustes):
     - “Borracharia e auto center em Estância Velha (Vale dos Sinos). Pneus novos (linha leve e pesada), alinhamento, balanceamento, suspensão rápida e socorro com unidade móvel. WhatsApp para orçamento.”
   - Remover/ajustar `meta name="author"` (não é fator de ranking, mas evita “Lovable”).

   1.3) Canonical e indexação
   - Adicionar:
     - `<link rel="canonical" href="https://rodabemborracharia.com.br/" />`
   - Adicionar meta robots explícito (boa prática):
     - `<meta name="robots" content="index,follow,max-image-preview:large" />`

   1.4) Open Graph (WhatsApp/Facebook) e Twitter Cards (preview do link)
   - Atualizar:
     - `og:title` (já ok)
     - `og:description` (mesmo conceito da meta description, adaptado)
     - `og:url` = https://rodabemborracharia.com.br/
     - `og:site_name` = Roda Bem Auto Center Borracharia
     - `og:locale` = pt_BR
     - `twitter:card` manter `summary_large_image`
     - Remover/alterar `twitter:site` (não usar @Lovable)
   - Trocar `og:image` e `twitter:image` para uma imagem real do seu site, servida em `public/` (ex: `/og-image.jpg` ou `/og-image.png`).

   1.5) Ícones e aparência do site no navegador
   - Garantir um pacote mínimo de ícones (além do `favicon.png` atual):
     - `favicon.ico` (já existe)
     - `favicon.png` (já existe)
     - `apple-touch-icon.png` (180x180) para iPhone/iPad
     - `icon-192.png` e `icon-512.png` para Android/PWA
   - Atualizar `index.html` para referenciar:
     - `<link rel="icon" ...>` (já existe)
     - `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`
   - Adicionar `theme-color` (melhora aparência em mobile):
     - `<meta name="theme-color" content="#0f172a">` (ou a cor principal da marca; definimos com base no tema do site)

2) Criar `sitemap.xml` e melhorar `robots.txt` (indexação mais organizada)
   2.1) `public/sitemap.xml`
   - Incluir as rotas que existem hoje:
     - /
     - /catalogo-pneus-novos
     - /galeria
   - Como é SPA, o sitemap ainda funciona bem para descoberta e priorização.

   2.2) Atualizar `public/robots.txt`
   - Manter Allow (já está permissivo).
   - Adicionar a linha:
     - `Sitemap: https://rodabemborracharia.com.br/sitemap.xml`

3) Dados estruturados (Schema.org) para o Google entender o negócio (LocalBusiness)
   - Inserir um bloco JSON-LD em `index.html` (no `<head>`) com:
     - @type: AutoRepair ou LocalBusiness (avaliar o melhor encaixe; normalmente `AutoRepair` pode ser apropriado)
     - name, url, telephone
     - address completo (streetAddress, addressLocality, addressRegion, postalCode se você tiver, addressCountry)
     - openingHoursSpecification (Seg–Sex, Sáb, Dom)
     - areaServed: “Vale dos Sinos”
     - sameAs (se você tiver links de redes sociais; se não tiver, omitimos)
   - Benefícios:
     - Ajuda a exibir informações corretas e consistentes
     - Pode melhorar “rich results” e entendimento local

4) Imagem de compartilhamento (og:image) bem feita
   - Criar uma imagem 1200x630 (padrão OG) para `public/og-image.jpg` (ou png).
   - Conteúdo recomendado:
     - Logo + texto curto (“Roda Bem Auto Center Borracharia”)
     - “Vale dos Sinos • Estância Velha - RS”
     - Opcional: “Pneus • Borracharia • Alinhamento • Balanceamento • Socorro”
   - Usaremos assets já existentes (logo/hero) para compor a imagem.

5) SEO por página (opcional, mas recomendado)
   Cenário A (rápido e suficiente para a maioria): manter SEO global no `index.html`
   - Prós: simples, rápido, menos chance de bugs.
   - Contras: Catálogo e Galeria não terão título/description específicos.

   Cenário B (mais completo): adicionar SEO por rota com `react-helmet-async`
   - Adicionar dependência `react-helmet-async`
   - Envolver App com `<HelmetProvider>`
   - Em cada página (`Index`, `CatalogoPneusNovos`, `Galeria`, `NotFound`) definir:
     - `<title>` específico (ex: “Catálogo de Pneus Novos | Roda Bem Auto Center”)
     - meta description específica
     - og tags específicas (opcional)
     - canonical por rota
   - Observação importante: Em SPA, para compartilhamento (WhatsApp) o ideal mesmo é SSR/prerender, mas “Helmet + sitemap + OG global” já melhora muito e o Google costuma executar JS.

Critérios de aceite (como você vai verificar)
- Na aba do navegador:
  - Título aparece como “Roda Bem Auto Center Borracharia”
  - Ícone/favicons aparecem corretamente (pode precisar limpar cache)
- Ao compartilhar o link no WhatsApp:
  - Aparece imagem (og:image) do seu negócio, título e descrição corretos
- Em ferramentas de teste:
  - “View source” mostra as metatags atualizadas no head
  - Lighthouse (SEO) melhora
  - Rich Results Test do Google reconhece o schema LocalBusiness/AutoRepair
- `https://rodabemborracharia.com.br/sitemap.xml` abre e lista as páginas
- `robots.txt` referencia o sitemap

Arquivos que serão alterados/criados (quando você aprovar)
- Editar:
  - `index.html` (metatags, canonical, OG/Twitter, JSON-LD, lang pt-BR, icon links)
  - `public/robots.txt` (adicionar Sitemap)
- Criar:
  - `public/sitemap.xml`
  - `public/og-image.jpg` (ou .png)
  - `public/apple-touch-icon.png`
  - `public/icon-192.png`
  - `public/icon-512.png`
  - (se optar pelo SEO por rota) alterações em:
    - `src/App.tsx` (HelmetProvider)
    - `src/pages/Index.tsx`
    - `src/pages/CatalogoPneusNovos.tsx`
    - `src/pages/Galeria.tsx`
    - `src/pages/NotFound.tsx`

Pontos que posso precisar confirmar rapidamente (não bloqueiam o início, mas melhoram o resultado)
- CEP do endereço (se você me passar, coloco no schema)
- Se existe Google Business Profile / Instagram / Facebook (para preencher `sameAs` no schema)
- Se você prefere que a description mencione “pneus novos” primeiro ou “socorro/unidade móvel” primeiro

Riscos e observações (para expectativas)
- Cache: favicon e preview do WhatsApp podem demorar a atualizar; às vezes é preciso:
  - Hard refresh no navegador
  - Reenviar o link no WhatsApp
  - Aguardar o crawler atualizar (principalmente se o domínio é novo)
- SPA: sem SSR, algumas plataformas de preview podem não ler metatags geradas via JS; por isso o “OG global no index.html” e a imagem em `public/` são as mudanças mais importantes.

Sequência de entrega
- Entrega 1 (rápida): index.html + OG + canonical + schema + robots + sitemap
- Entrega 2 (refino): gerar conjunto completo de ícones e og-image definitivo
- Entrega 3 (opcional): SEO por rota com Helmet para catálogo e galeria
