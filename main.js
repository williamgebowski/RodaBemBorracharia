// ===== Configuração do Produto =====
const CHECKOUT_URL = 'https://SEU-CHECKOUT-AQUI.com/checkout';

const CONFIG = {
  produto: {
    nome: 'HyperX Cloud Stinger 2',
    marca: 'HyperX',
    sku: '519T1AA',
    precoOriginal: 749.90,
    precoPromocional: 299.90,
    parcelas: 6
  },
  estoque: {
    inicial: 124,
    minimo: 19
  },
  timezone: 'America/Sao_Paulo'
};

// ===== Utilitários =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { 
  style: 'currency', 
  currency: 'BRL' 
});

// Função para obter fim do dia em timezone específico
function fimDoHoje(timezone) {
  const agora = new Date();
  const hoje = new Intl.DateTimeFormat('en-CA', { timeZone: timezone }).format(agora);
  const [ano, mes, dia] = hoje.split('-').map(Number);
  
  // Criar data de fim do dia (23:59:59) no timezone correto
  const fimDia = new Date();
  fimDia.setFullYear(ano, mes - 1, dia);
  fimDia.setHours(23, 59, 59, 999);
  
  // Ajustar para diferença de timezone
  const offsetLocal = agora.getTimezoneOffset() * 60000;
  const offsetTarget = new Date(agora.toLocaleString('en-US', { timeZone: timezone })).getTime() - agora.getTime();
  
  return new Date(fimDia.getTime() + offsetLocal + offsetTarget);
}

// ===== Estado Global =====
let estado = {
  estoqueAtual: CONFIG.estoque.inicial,
  timerAtivo: true,
  carrosselAtual: {
    reviews: 0
  }
};

// ===== Preços =====
function popularPrecos() {
  const { precoOriginal, precoPromocional, parcelas } = CONFIG.produto;
  
  // Preço original
  $$('#precoOriginal, [data-copy="precoOriginal"]').forEach(el => {
    el.textContent = formatarMoeda(precoOriginal);
  });
  
  // Preço promocional
  $$('#precoPromo, [data-copy="precoPromo"], #precoInline').forEach(el => {
    el.textContent = formatarMoeda(precoPromocional);
  });
  
  // Parcelas
  $$('#parcelas, [data-copy="parcelas"]').forEach(el => {
    el.textContent = parcelas;
  });
}

// ===== Timer Regressivo =====
function iniciarTimer() {
  const fimOferta = fimDoHoje(CONFIG.timezone);
  const elementosTimer = ['#timer', '[data-timer-copy]', '#topbarTimer'];
  
  function atualizarTimer() {
    const agora = new Date();
    const diferenca = fimOferta - agora;
    
    if (diferenca <= 0) {
      // Oferta encerrada
      elementosTimer.forEach(seletor => {
        const el = $(seletor);
        if (el) {
          el.textContent = seletor === '#timer' ? 'Oferta encerrada — verifique disponibilidade' : 'Encerrada';
        }
      });
      
      // Desabilitar CTAs
      desabilitarCTAs();
      atualizarSchema(fimOferta);
      estado.timerAtivo = false;
      return;
    }
    
    const horas = Math.floor(diferenca / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
    
    const tempoFormatado = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    
    elementosTimer.forEach(seletor => {
      const el = $(seletor);
      if (el) {
        if (seletor === '#timer') {
          el.textContent = tempoFormatado;
        } else if (seletor === '[data-timer-copy]') {
          el.textContent = `Encerra em ${tempoFormatado}`;
        } else {
          el.textContent = tempoFormatado;
        }
      }
    });
    
    atualizarSchema(fimOferta);
  }
  
  atualizarTimer();
  setInterval(atualizarTimer, 1000);
}

function desabilitarCTAs() {
  ['#ctaHero', '#ctaComprar'].forEach(id => {
    const btn = $(id);
    if (btn) {
      btn.classList.add('is-disabled');
      btn.setAttribute('aria-disabled', 'true');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
      });
    }
  });
}

// ===== Estoque Dinâmico =====
function simularEstoque() {
  const elementosEstoque = ['#estoqueTxt', '[data-estoque-copy]'];
  
  function atualizarEstoque() {
    elementosEstoque.forEach(seletor => {
      const el = $(seletor);
      if (el) {
        el.textContent = `Restam apenas ${estado.estoqueAtual} unidades`;
      }
    });
  }
  
  function decrementarEstoque() {
    if (estado.estoqueAtual > CONFIG.estoque.minimo) {
      estado.estoqueAtual--;
      atualizarEstoque();
    }
    
    // Próximo decremento em 7-12 minutos
    const proximoDecremento = (7 + Math.random() * 5) * 60 * 1000;
    setTimeout(decrementarEstoque, proximoDecremento);
  }
  
  atualizarEstoque();
  
  // Primeiro decremento em 3 minutos
  setTimeout(decrementarEstoque, 3 * 60 * 1000);
}

// ===== Scroll Suave =====
function configurarScrollSuave() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = $(href);
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===== Carrossel =====
function configurarCarrossel() {
  const track = $('#reviewsTrack');
  const btnPrev = $('#reviewsPrev');
  const btnNext = $('#reviewsNext');
  
  if (!track || !btnPrev || !btnNext) return;
  
  const items = Array.from(track.children);
  const totalItems = items.length;
  let itemsPorGrupo = 1;
  let grupoAtual = 0;
  let totalGrupos = 1;
  
  // Calcular quantos itens por grupo baseado na tela
  function calcularItemsPorGrupo() {
    if (window.innerWidth >= 1024) {
      itemsPorGrupo = 3;
    } else if (window.innerWidth >= 640) {
      itemsPorGrupo = 2;
    } else {
      itemsPorGrupo = 1;
    }
    
    totalGrupos = Math.ceil(totalItems / itemsPorGrupo);
    
    // Ajustar grupo atual se necessário
    if (grupoAtual >= totalGrupos) {
      grupoAtual = totalGrupos - 1;
    }
  }
  
  function irParaGrupo(novoGrupo) {
    // Loop seguro
    if (novoGrupo >= totalGrupos) {
      grupoAtual = 0;
    } else if (novoGrupo < 0) {
      grupoAtual = totalGrupos - 1;
    } else {
      grupoAtual = novoGrupo;
    }
    
    // Calcular deslocamento
    const deslocamento = -(grupoAtual * 100);
    track.style.transform = `translateX(${deslocamento}%)`;
    
    // Atualizar aria-current
    items.forEach((item, i) => {
      const grupoDoItem = Math.floor(i / itemsPorGrupo);
      if (grupoDoItem === grupoAtual) {
        item.setAttribute('aria-current', 'true');
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }
  
  btnPrev.addEventListener('click', (e) => {
    e.preventDefault();
    irParaGrupo(grupoAtual - 1);
  });
  
  btnNext.addEventListener('click', (e) => {
    e.preventDefault();
    irParaGrupo(grupoAtual + 1);
  });
  
  // Recalcular no resize com debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      calcularItemsPorGrupo();
      irParaGrupo(grupoAtual);
    }, 150);
  });
  
  // Inicializar
  calcularItemsPorGrupo();
  irParaGrupo(0);
}

// ===== Accordion Acessível =====
function configurarAccordion() {
  $$('.accordion summary').forEach(summary => {
    summary.setAttribute('tabindex', '0');
    
    summary.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        summary.click();
      }
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const summaries = Array.from($$('.accordion summary'));
        const currentIndex = summaries.indexOf(summary);
        const nextIndex = e.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
        const nextSummary = summaries[nextIndex];
        
        if (nextSummary) {
          nextSummary.focus();
        }
      }
    });
  });
}

// ===== Cupom =====
function configurarCupom() {
  const input = $('#cupom');
  const btn = $('#aplicarCupom');
  const msg = $('#cupomMsg');
  
  if (!input || !btn || !msg) return;
  
  btn.addEventListener('click', () => {
    const codigo = input.value.trim().toUpperCase();
    
    if (codigo === 'BF60') {
      msg.textContent = 'Cupom aplicado ✓';
      msg.style.color = '#86EFAC';
      
      // Disparar evento customizado
      window.dispatchEvent(new CustomEvent('cupom-aplicado', {
        detail: { codigo: 'BF60' }
      }));
    } else {
      msg.textContent = 'Cupom inválido';
      msg.style.color = '#FF8A8A';
    }
  });
  
  // Aplicar ao pressionar Enter
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      btn.click();
    }
  });
}

// ===== Sticky Bar Mobile =====
function configurarStickyBar() {
  const stickyBar = $('#stickyBar');
  if (!stickyBar) return;
  
  function atualizarVisibilidade() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      stickyBar.hidden = false;
      document.body.classList.add('has-sticky');
    } else {
      stickyBar.hidden = true;
      document.body.classList.remove('has-sticky');
    }
  }
  
  atualizarVisibilidade();
  window.addEventListener('resize', atualizarVisibilidade);
}

// ===== Topbar Hide on Scroll =====
function configurarTopbarScroll() {
  const topbar = $('#topbar');
  if (!topbar) return;
  
  let ultimoScroll = window.pageYOffset;
  
  window.addEventListener('scroll', () => {
    const scrollAtual = window.pageYOffset;
    
    if (scrollAtual > ultimoScroll && scrollAtual > 120) {
      topbar.style.transform = 'translateY(-100%)';
    } else {
      topbar.style.transform = 'translateY(0)';
    }
    
    ultimoScroll = scrollAtual;
  }, { passive: true });
}

// ===== AB Test =====
function setupAB() {
  const urlParams = new URLSearchParams(window.location.search);
  const versao = urlParams.get('v') || sessionStorage.getItem('ab-version') || 'a';
  
  sessionStorage.setItem('ab-version', versao);
  
  if (versao.toLowerCase() === 'b') {
    // Versão B: CTA amarelo e imagem diferente
    $$('.btn--primary').forEach(btn => {
      btn.style.background = '#FFDD44';
      btn.style.color = '#0A0A0F';
      btn.textContent = 'Garantir 60% OFF agora';
    });
    
    // Trocar imagem do hero
    const heroImg = $('.product-showcase img');
    if (heroImg) {
      heroImg.src = './assets/foto7.jpg';
    }
  }
}

// ===== Checkout com UTMs =====
function setupCheckout() {
  const btnCheckout = $('#ctaComprar');
  if (!btnCheckout) return;
  
  btnCheckout.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (!estado.timerAtivo) {
      return;
    }
    
    // Construir URL com UTMs preservadas
    const urlCheckout = new URL(CHECKOUT_URL);
    const urlParams = new URLSearchParams(window.location.search);
    
    // Copiar todos os parâmetros UTM
    urlParams.forEach((valor, chave) => {
      urlCheckout.searchParams.append(chave, valor);
    });
    
    // Disparar eventos de tracking
    try { window.fbq && fbq('track','InitiateCheckout'); } catch(_){}
    try { window.gtag && gtag('event','begin_checkout'); } catch(_){}
    
    // Redirecionar
    window.location.href = urlCheckout.toString();
  });
}

// ===== Schema JSON-LD =====
function atualizarSchema(dataLimite) {
  const schemaEl = $('#schemaProduct');
  if (!schemaEl) return;
  
  try {
    const schema = JSON.parse(schemaEl.textContent);
    
    schema.name = CONFIG.produto.nome;
    schema.brand = CONFIG.produto.marca;
    schema.sku = CONFIG.produto.sku;
    schema.offers.price = CONFIG.produto.precoPromocional.toFixed(2);
    schema.offers.priceValidUntil = dataLimite ? dataLimite.toISOString() : '';
    
    schemaEl.textContent = JSON.stringify(schema, null, 2);
  } catch (e) {
    console.warn('Erro ao atualizar schema:', e);
  }
}

// ===== Eventos de Tracking =====
function configurarTracking() {
  // View Content
  window.addEventListener('load', () => {
    try {
      if (window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_type: 'product',
          content_ids: [CONFIG.produto.sku],
          value: CONFIG.produto.precoPromocional,
          currency: 'BRL'
        });
      }
    } catch (e) {}
  });
  
  // Add to Cart (CTA Hero)
  const ctaHero = $('#ctaHero');
  if (ctaHero) {
    ctaHero.addEventListener('click', () => {
      try {
        if (window.fbq) {
          window.fbq('track', 'AddToCart', {
            content_type: 'product',
            content_ids: [CONFIG.produto.sku],
            value: CONFIG.produto.precoPromocional,
            currency: 'BRL'
          });
        }
      } catch (e) {}
    });
  }
}

// ===== Inicialização =====
function inicializar() {
  popularPrecos();
  iniciarTimer();
  simularEstoque();
  configurarScrollSuave();
  configurarCarrossel();
  configurarAccordion();
  configurarCupom();
  configurarStickyBar();
  configurarTopbarScroll();
  setupAB();
  setupCheckout();
  configurarTracking();
  
  // Eventos customizados
  window.addEventListener('load', () => {
    window.dispatchEvent(new CustomEvent('view_item'));
  });
  
  const ctaHero = $('#ctaHero');
  if (ctaHero) {
    ctaHero.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('add_to_cart'));
    });
  }
  
  const ctaComprar = $('#ctaComprar');
  if (ctaComprar) {
    ctaComprar.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('begin_checkout'));
    });
  }
  
  console.log('Landing page inicializada com sucesso!');
}

// ===== Event Listeners =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar);
} else {
  inicializar();
}

// Redimensionamento da janela
window.addEventListener('resize', () => {
  configurarStickyBar();
}, { passive: true });

// ===== Exports para debug (desenvolvimento) =====
if (typeof window !== 'undefined') {
  window.debugLanding = {
    estado,
    CONFIG,
    resetarEstoque: () => {
      estado.estoqueAtual = CONFIG.estoque.inicial;
      simularEstoque();
    }
  };
}