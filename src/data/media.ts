import sigmaLanding from "@/assets/products/sigma-landing.webp";
import sigmaPainelEstudo from "@/assets/products/sigma-painel-estudo.webp";
import sigmaGestaoEstudo from "@/assets/products/sigma-gestao-estudo.webp";
import unipassLanding from "@/assets/products/unipass-landing.webp";
import unipassLogin from "@/assets/products/unipass-login.webp";
import unipassPainelDemo from "@/assets/products/unipass-painel-demo.webp";
import mredLanding from "@/assets/products/mred-landing.webp";
import mredApp from "@/assets/products/mred-app.webp";
import cultbrLogin from "@/assets/products/cultbr-login.webp";
import sptePainelDemo from "@/assets/products/spte-painel-demo.webp";
import spteIafreeDemo from "@/assets/products/spte-iafree-demo.webp";

/**
 * Toda imagem de produto carrega a sua proveniência na legenda:
 * captura = página pública, com URL e data · demo = ambiente de demonstração
 * com dados fictícios · estudo = espécime de design, não é interface em produção.
 */
export const media = {
  sigmaLanding: {
    src: sigmaLanding,
    alt: "Página inicial do Sigma: título 'A sinalização da cidade, sob controle' sobre foto noturna de viaduto urbano",
    caption: "sigma.requiemcompany.com.br · captura de 21/08/2026",
    kind: "captura",
  },
  sigmaPainelEstudo: {
    src: sigmaPainelEstudo,
    alt: "Estudo de interface do Sigma: mapa escuro com dispositivos de sinalização georreferenciados e painel lateral de uma placa R-19 com histórico de intervenções",
    caption: "Painel de sinalização · espécime de linguagem visual, jun/2026",
    kind: "estudo",
  },
  sigmaGestaoEstudo: {
    src: sigmaGestaoEstudo,
    alt: "Estudo de interface do Sigma: dashboard executivo com projetos em execução, estoque crítico e tabela de contratos",
    caption: "Shell de gestão · espécime de linguagem visual, jun/2026",
    kind: "estudo",
  },
  unipassLanding: {
    src: unipassLanding,
    alt: "Página inicial do UniPass: logotipo colorido e título 'O transporte estudantil do seu município com rastreabilidade de ponta a ponta'",
    caption: "unipass.requiemcompany.com.br · captura de 21/08/2026",
    kind: "captura",
  },
  unipassLogin: {
    src: unipassLogin,
    alt: "Tela de acesso ao painel de gestão do UniPass, com padrão geométrico colorido à esquerda e formulário de e-mail e senha à direita",
    caption: "Acesso ao painel de gestão · captura de 21/08/2026",
    kind: "captura",
  },
  unipassPainelDemo: {
    src: unipassPainelDemo,
    alt: "Painel de gestão do UniPass em ambiente de demonstração: operação de hoje com ocupação, conclusão e alertas, e lista de viagens do dia",
    caption: "Painel de gestão · ambiente de demonstração, dados fictícios",
    kind: "demo",
  },
  mredLanding: {
    src: mredLanding,
    alt: "Página inicial da MicroRED: título 'Organize sua infraestrutura de recarga com controle, eficiência e inteligência energética' e foto de eletroposto",
    caption: "mred.com.br · captura de 21/08/2026",
    kind: "captura",
  },
  mredApp: {
    src: mredApp,
    alt: "Aplicativo de recarga da MicroRED: mapa com estações de recarga em Recife e menu inferior com mapa, estações, carteira e perfil",
    caption: "App de recarga · captura em dispositivo, 2026",
    kind: "captura",
  },
  cultbrLogin: {
    src: cultbrLogin,
    alt: "Página de acesso do CultBR no domínio do Ministério da Cultura, com botão 'Acessar com gov.br'",
    caption: "cultbr.cultura.gov.br · captura de 21/08/2026",
    kind: "captura",
  },
  sptePainelDemo: {
    src: sptePainelDemo,
    alt: "Painel da escola no SPTE em ambiente de demonstração: total de turmas, aplicações concluídas, turmas com alto risco e ações ativas",
    caption: "Painel da escola · ambiente de demonstração, dados fictícios",
    kind: "demo",
  },
  spteIafreeDemo: {
    src: spteIafreeDemo,
    alt: "Monitoramento IAFREE no SPTE: cinco dimensões com média da escola e distribuição de risco por turma, com aviso de agregação por turma conforme a LGPD",
    caption: "Monitoramento IAFREE · ambiente de demonstração, dados fictícios",
    kind: "demo",
  },
} as const;

export type MediaKey = keyof typeof media;
export type MediaItem = (typeof media)[MediaKey];
