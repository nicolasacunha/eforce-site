export interface ProductFinish {
  id: string;
  name: string;
  color: string;
  image: string;
}

export interface InBoxItem {
  name: string;
  quantity: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: string;
  priceValue: number;
  tagline: string;
  description: string;
  module: "F10" | "F50";
  badge: string | null;
  heroImage: string;
  heroTitle?: string;
  subtitle?: string;
  menuImage?: string;
  showcaseImage?: string;
  specsImage?: string;
  finishes: ProductFinish[];
  inTheBox: InBoxItem[];
  videoPreview?: string;
  soundDemo?: string;
  specsHighlight: {
    label: string;
    value: string;
    unit?: string;
  }[];
  highlights: {
    image: string;
    title: string;
    description: string;
    objectFit?: "cover" | "contain";
    objectPosition?: string;
    link?: { label: string; href: string };
  }[];
  editorialHeadline?: string;
  editorialBody?: string;
  editorialVerticalImage?: string;
  editorialHorizontalImage?: string;
  fullKitImage?: string;
  galleryImages: string[];
  techTabs: {
    label: string;
    slides: {
      image?: string;
      title: string;
      description: string;
    }[];
  }[];
}

export const products: Product[] = [
  {
    id: "ef2v1",
    slug: "ef2-v1",
    name: "EF2 V1",
    price: "R$ 3,454",
    priceValue: 3454,
    tagline: "Seu ponto de partida.",
    description:
      "A entrada acessível no mundo das baterias eletrônicas, sem abrir mão da qualidade visual e do feel.",
    module: "F10",
    badge: null,
    heroImage: "/assets/images/kits/ef2v1/ef2v1-principal-nobg.png",
    specsImage: "/assets/images/kits/ef2v1/ef2v1-numeros-nobg.png",
    finishes: [
      { id: "black", name: "Midnight Black", color: "#1a1a2e", image: "/assets/images/kits/ef2v1/ef2v1-hero-nobg.png" },
      { id: "grey", name: "Steel Grey", color: "#4a4a4a", image: "/assets/images/kits/ef2v1/ef2v1-hero-nobg.png" },
      { id: "white", name: "Pearl White", color: "#e8e8e8", image: "/assets/images/kits/ef2v1/ef2v1-hero-nobg.png" },
    ],
    inTheBox: [
      { name: "Snare mesh pad", quantity: 1 },
      { name: "Tom mesh pads", quantity: 3 },
      { name: "Kick pad", quantity: 1 },
      { name: "Hi-hat pad", quantity: 1 },
      { name: "Crash pad", quantity: 1 },
      { name: "Ride pad", quantity: 1 },
      { name: "Hi-hat controller", quantity: 1 },
      { name: "Switch pedals", quantity: 2 },
      { name: "Drum rack", quantity: 1 },
      { name: "F10 Module", quantity: 1 },
      { name: "Cables", quantity: 1 },
      { name: "Power supply", quantity: 1 },
      { name: "Manual", quantity: 1 },
    ],
    videoPreview: undefined,
    soundDemo: undefined,
    specsHighlight: [
      { label: "Sons", value: "461" },
      { label: "Pads", value: "8" },
      { label: "Faixas", value: "1" },
      { label: "Módulo", value: "F10" },
    ],
    highlights: [
      { image: "/assets/images/kits/ef2v1/ef2v1-render-6.png", title: "Design.", description: "Estrutura compacta, leve e funcional para qualquer estilo musical.", objectFit: "contain" as const },
      { image: "/assets/images/kits/ef2v1/ef2v1-dest-15.png", title: "Módulo.", description: "Modelo F10 com conectividade bluetooth, porta OTG e USB-C (funciona com power bank).", link: { label: "Saiba mais aqui", href: "/technology" } },
      { image: "/assets/images/kits/ef2v1/ef2v1-render-8.png", title: "Tecnologia e Construção.", description: "Cascos de madeira e tecnologia de ponta com trigger e peles mesh para melhor sensibilidade e feeling real ao tocar." },
      { image: "/assets/images/kits/ef2v1/ef2v1-dest-14.png", title: "Detalhes Importam.", description: "Cada detalhe pensado para valorizar sua sensação ao explorar e tocar sua e-Force." },
      { image: "/assets/images/kits/ef2v1/ef2v1-dest-16.png", title: "Precisão.", description: "Construção precisa e robusta para cada peça, do rack, dos cascos aos clamps que seguram os tambores." },
      { image: "/assets/images/kits/ef2v1/ef2v1-dest-17.png", title: "Pedais.", description: "Com acionamento por sensor, os pedais e-Force entregam precisão e rápido acionamento, facilitando sua técnica ao tocar." },
    ],
    editorialHeadline: undefined,
    editorialBody: undefined,
    editorialVerticalImage: "/assets/images/kits/ef2v1/ef2v1-module-vertical.png",
    editorialHorizontalImage: "/assets/images/kits/ef2v1/ef2v1-render-8.png",
    fullKitImage: "/assets/images/kits/ef2v1/ef2v1-full-kit.png",
    galleryImages: [
      "/assets/images/kits/ef2v1/ef2v1-hero-nobg.png",
      "/assets/images/kits/ef2v1/ef2v1-principal-nobg.png",
    ],
    techTabs: [],
  },
  {
    id: "ef2v2",
    slug: "ef2-v2",
    name: "EF2 V2",
    price: "R$ 4,527",
    priceValue: 4527,
    tagline: "A primeira escolha do baterista.",
    description:
      "O melhor custo-benefício em baterias eletrônicas — estética de shell em madeira, conectividade moderna e até três acabamentos exclusivos.",
    module: "F10",
    badge: "Best Seller",
    heroImage: "/assets/images/kits/ef2v2/ef2v2-hero-nobg.png",
    specsImage: "/assets/images/kits/ef2v2/ef2v2-numeros-nobg.png",
    finishes: [
      { id: "dark", name: "Dark Midnight", color: "#1a1a2e", image: "/assets/images/kits/ef2v2/ef2v2-hero-nobg.png" },
      { id: "ocean-blue", name: "Ocean Blue", color: "#1a5a7a", image: "/assets/images/kits/ef2v2/ef2v2-hero-nobg.png" },
      { id: "racing-red", name: "Racing Red", color: "#8b1a1a", image: "/assets/images/kits/ef2v2/ef2v2-hero-nobg.png" },
    ],
    inTheBox: [
      { name: "Snare mesh pad with shell", quantity: 1 },
      { name: "Tom mesh pads with shell", quantity: 3 },
      { name: "Kick tower", quantity: 1 },
      { name: "Hi-hat pad", quantity: 1 },
      { name: "Crash choke", quantity: 1 },
      { name: "Ride pad", quantity: 1 },
      { name: "Hi-hat controller", quantity: 1 },
      { name: "Kick pedal", quantity: 1 },
      { name: "Drum rack", quantity: 1 },
      { name: "F10 Module", quantity: 1 },
      { name: "Cables", quantity: 1 },
      { name: "Power supply", quantity: 1 },
      { name: "Manual", quantity: 1 },
    ],
    videoPreview: undefined,
    soundDemo: undefined,
    specsHighlight: [
      { label: "Sons", value: "461" },
      { label: "Pads", value: "8" },
      { label: "Faixas", value: "1" },
      { label: "Módulo", value: "F10" },
    ],
    highlights: [
      { image: "/assets/images/kits/ef2v2/ef2v2-dest-18.png", title: "Design.", description: "Visual minimalista, cascos de madeira e opções de acabamentos. Pronta para o play!" },
      { image: "/assets/images/kits/ef2v2/ef2v2-render-9.png", title: "Acabamentos.", description: "Prato com visual bicolor e função \"choque\"." },
      { image: "/assets/images/kits/ef2v2/ef2v2-dest-19.png", title: "Tecnologia e Conectividade.", description: "Modelo F10 com conectividade bluetooth, porta OTG e USB-C (funciona com power bank).", link: { label: "Saiba mais aqui", href: "/technology" } },
      { image: "/assets/images/kits/ef2v2/ef2v2-dest-20.png", title: "Estrutura.", description: "Rack compacto, estruturalmente sólido e estável." },
      { image: "/assets/images/kits/ef2v2/ef2v2-dest-21.png", title: "Acabamentos.", description: "Escolha entre três diferentes acabamentos. Na e-Force você é livre para escolher." },
      { image: "/assets/images/kits/ef2v2/ef2v2-dest-22.png", title: "Pedal.", description: "Pedal de bumbo nível Odery de verdade. Conta com corrente, regulagem de pressão e ângulo. Sua técnica no controle." },
    ],
    editorialHeadline: undefined,
    editorialBody: undefined,
    editorialVerticalImage: "/assets/images/kits/ef2v2/ef2v2-vertical-purple.png",
    editorialHorizontalImage: "/assets/images/kits/ef2v2/ef2v2-render-5.png",
    fullKitImage: "/assets/images/kits/ef2v2/ef2v2-fullkit-nobg.png",
    galleryImages: [
      "/assets/images/kits/ef2v2/ef2v2-hero-nobg.png",
      "/assets/images/kits/ef2v2/ef2v2-numeros-nobg.png",
    ],
    showcaseImage: "/assets/images/kits/ef2v2/ef2v2-showcase.png",
    techTabs: [],
  },
  {
    id: "ef2v3",
    slug: "ef2-v3",
    name: "EF2 V3",
    price: "R$ 5,103",
    priceValue: 5103,
    tagline: "O próximo passo natural.",
    description:
      "Hardware aprimorado e recursos expandidos para bateristas prontos para levar a prática mais longe.",
    module: "F10",
    badge: null,
    heroImage: "/assets/images/kits/ef2v3/ef2v3-fullkit-nobg.png",
    menuImage: "/assets/images/kits/ef2v3/ef2v3-menu.png",
    showcaseImage: "/assets/images/kits/ef2v3/ef2v3-menu.png",
    finishes: [
      { id: "black", name: "Midnight Black", color: "#1a1a2e", image: "/assets/images/kits/ef2v3/ef2v3-hero.jpg" },
      { id: "silver", name: "Brushed Silver", color: "#b0b0b0", image: "/assets/images/kits/ef2v3/ef2v3-hero.jpg" },
      { id: "red", name: "Deep Red", color: "#8b2020", image: "/assets/images/kits/ef2v3/ef2v3-hero.jpg" },
    ],
    inTheBox: [
      { name: "Snare mesh pad", quantity: 1 },
      { name: "Tom mesh pads", quantity: 3 },
      { name: "Kick tower", quantity: 1 },
      { name: "Hi-hat pad", quantity: 1 },
      { name: "Crash pads", quantity: 2 },
      { name: "Ride pad", quantity: 1 },
      { name: "Kick pedal", quantity: 1 },
      { name: "Reinforced drum rack", quantity: 1 },
      { name: "F10 Module", quantity: 1 },
      { name: "Cables", quantity: 1 },
      { name: "Power supply", quantity: 1 },
      { name: "Manual", quantity: 1 },
    ],
    videoPreview: undefined,
    soundDemo: undefined,
    specsHighlight: [
      { label: "Sons", value: "461" },
      { label: "Pads", value: "9" },
      { label: "Faixas", value: "1" },
      { label: "Módulo", value: "F10" },
    ],
    highlights: [
      { image: "/assets/images/kits/ef2v3/ef2v3-destaques.png", title: "Design.", description: "Visual atraente de bateria de nível superior com rack amplo e design marcante. Cascos de madeira com cores modernas e marcantes." },
      { image: "/assets/images/kits/ef2v3/ef2v3-dest-23.png", title: "Tecnologia.", description: "Explore o módulo F10 com Bluetooth nativo, Porta OTG para gravações ao vivo e carregamento via Power bank." },
      { image: "/assets/images/kits/ef2v3/ef2v3-dest-24.png", title: "Shells.", description: "Cascos de madeira remetendo à baterias acústicas com peles Mesh e possibilidade de afinação para uma melhor sensibilidade." },
      { image: "/assets/images/kits/ef2v3/ef2v3-dest-25.png", title: "Performance e Precisão.", description: "Conexões de design refinado e extremamente funcionais. Estabilidade e performance sólidas para que você deixe sua técnica fluir." },
      { image: "/assets/images/kits/ef2v3/ef2v3-dest-26.png", title: "Acabamento.", description: "Cores especiais para quem quer ter escolha. A e-Force não te limita! Note a plaquinha de identificação. Nossa cereja do bolo." },
    ],
    fullKitImage: "/assets/images/kits/ef2v3/ef2v3-dest-28.png",
    specsImage: "/assets/images/kits/ef2v3/ef2v3-dest-27.png",
    editorialHeadline: undefined,
    editorialBody: undefined,
    galleryImages: [
      "/assets/images/kits/ef2v3/ef2v3-aerial.jpg",
      "/assets/images/kits/ef2v3/ef2v3-perspective-nobg.png",
      "/assets/images/kits/ef2v3/ef2v3-front.jpg",
      "/assets/images/kits/ef2v3/ef2v3-studio-1.jpg",
      "/assets/images/kits/ef2v3/ef2v3-detail-pads.png",
      "/assets/images/kits/ef2v3/ef2v3-detail-2.jpg",
      "/assets/images/kits/ef2v3/ef2v3-detail-3.jpg",
      "/assets/images/kits/ef2v3/ef2v3-detail-4.jpg",
      "/assets/images/kits/ef2v3/ef2v3-studio-2.jpg",
      "/assets/images/kits/ef2v3/ef2v3-studio-3.jpg",
    ],
    techTabs: [],
  },
  {
    id: "ef2v4",
    slug: "ef2-v4",
    name: "EF2 V4",
    price: "R$ 7,770",
    priceValue: 7770,
    tagline: "Performance premium intermediária.",
    description:
      "Hardware refinado, conectividade expandida e presença de palco imponente a uma fração do preço do topo de linha.",
    module: "F10",
    badge: null,
    heroImage: "/assets/images/kits/ef2v4/ef2v4-hero-nobg.png",
    specsImage: "/assets/images/kits/ef2v4/ef2v4-specs.png",
    finishes: [
      { id: "black", name: "Midnight Black", color: "#1a1a2e", image: "/assets/images/kits/ef2v4/ef2v4-hero-nobg.png" },
      { id: "blue", name: "Ocean Blue", color: "#1a3a5c", image: "/assets/images/kits/ef2v4/ef2v4-hero-nobg.png" },
      { id: "natural", name: "Natural Wood", color: "#c4a265", image: "/assets/images/kits/ef2v4/ef2v4-hero-nobg.png" },
    ],
    inTheBox: [
      { name: "Snare mesh pad with shell", quantity: 1 },
      { name: "Tom mesh pads", quantity: 3 },
      { name: "Kick tower", quantity: 1 },
      { name: "Hi-hat pad", quantity: 1 },
      { name: "Crash pads", quantity: 2 },
      { name: "Ride pad", quantity: 1 },
      { name: "Professional drum rack", quantity: 1 },
      { name: "Equalizer pedal P-803", quantity: 1 },
      { name: "Snare stand S-803", quantity: 1 },
      { name: "Hi-hat stand H-803", quantity: 1 },
      { name: "Extension arms CB-803EQ", quantity: 3 },
      { name: "F10 Module", quantity: 1 },
      { name: "Cables", quantity: 1 },
      { name: "Power supply", quantity: 1 },
      { name: "Manual", quantity: 1 },
    ],
    videoPreview: undefined,
    soundDemo: undefined,
    specsHighlight: [
      { label: "Sons", value: "461" },
      { label: "Pads", value: "9" },
      { label: "Faixas", value: "1" },
      { label: "Módulo", value: "F10" },
    ],
    highlights: [
      { image: "/assets/images/kits/ef2v4/ef2v4-dest-30.png", title: "Design.", description: "Visual de bateria de nível superior. Conta com ferragens reais da série Odery Equalizer e pratos Full cover." },
      { image: "/assets/images/kits/ef2v4/ef2v4-dest-31.png", title: "Pratos Full Cover.", description: "Pratos top de linha com toque sensível e suave, além de um visual moderno e com funções completas para atender o mais exigente baterista." },
      { image: "/assets/images/kits/ef2v4/ef2v4-dest-32.png", title: "Ferragens.", description: "Ferragens Odery Equalizer – Pedal, máquina chimbal, suporte de caixa e extensores de pratos." },
      { image: "/assets/images/kits/ef2v4/ef2v4-dest-33.png", title: "Tecnologia.", description: "Explore o módulo F10 com Bluetooth nativo, Porta OTG para gravações ao vivo e carregamento via Power bank." },
      { image: "/assets/images/kits/ef2v4/ef2v4-dest-34.png", title: "Shells.", description: "Cascos de madeira com a pegada acústica, peles Mesh e possibilidade de afinar a tensão para um melhor feeling ao tocar." },
      { image: "/assets/images/kits/ef2v4/ef2v4-dest-35.png", title: "Acabamento.", description: "Acabamentos primorosos em cada detalhe tal qual a placa de identificação – nossa cereja do bolo." },
    ],
    editorialHeadline: undefined,
    editorialBody: undefined,
    editorialVerticalImage: "/assets/images/kits/ef2v4/ef2v4-render-23.png",
    editorialHorizontalImage: "/assets/images/kits/ef2v4/ef2v4-render-14.png",
    fullKitImage: "/assets/images/kits/ef2v4/ef2v4-dest-29.png",
    galleryImages: [
      "/assets/images/kits/ef2v4/ef2v4-hero-nobg.png",
      "/assets/images/kits/ef2v4/ef2v4-numeros-nobg.png",
    ],
    techTabs: [],
  },
  {
    id: "ef6cafe",
    slug: "ef6-cafe-hybrid",
    name: "EF6 Café",
    subtitle: "Odery Café Hybrid",
    price: "R$ 10,206",
    priceValue: 10206,
    tagline: "Compacta por design. Completa por natureza.",
    description:
      "Máxima tocabilidade no menor espaço. Feita para apartamentos, home studios e palcos intimistas.",
    module: "F10",
    badge: null,
    heroImage: "/assets/images/kits/ef6cafe/ef6cafe-hero.jpg",
    finishes: [
      { id: "black", name: "Midnight Black", color: "#1a1a2e", image: "/assets/images/kits/ef6cafe/ef6cafe-hero.jpg" },
      { id: "walnut", name: "Walnut Brown", color: "#8B4513", image: "/assets/images/kits/ef6cafe/ef6cafe-hero.jpg" },
      { id: "cream", name: "Vintage Cream", color: "#f5e6c8", image: "/assets/images/kits/ef6cafe/ef6cafe-hero.jpg" },
    ],
    inTheBox: [],
    videoPreview: undefined,
    soundDemo: undefined,
    specsHighlight: [
      { label: "Sons", value: "461" },
      { label: "Pads", value: "8" },
      { label: "Faixas", value: "1" },
      { label: "Módulo", value: "F10" },
    ],
    highlights: [],
    editorialHeadline: undefined,
    editorialBody: undefined,
    galleryImages: [
      "/assets/images/kits/ef6cafe/ef6cafe-hero.jpg",
    ],
    techTabs: [],
  },
  {
    id: "ef5v2",
    slug: "ef5-v2",
    name: "EF5 V2",
    price: "R$ 13,713",
    priceValue: 13713,
    tagline: "O instrumento do profissional.",
    description:
      "Som de nível estúdio, resposta expressiva dos pads e a biblioteca de 937 sons do módulo F50. Feita para bateristas sérios.",
    module: "F50",
    badge: null,
    heroImage: "/assets/images/kits/ef5v2/ef5v2-principal-nobg.png",
    menuImage: "/assets/images/kits/ef5v2/ef5v2-menu.png",
    showcaseImage: "/assets/images/kits/ef5v2/ef5v2-menu.png",
    specsImage: "/assets/images/kits/ef5v2/ef5v2-specs.png",
    fullKitImage: "/assets/images/kits/ef5v2/ef5v2-antes-destaq.png",
    finishes: [
      { id: "black", name: "Midnight Black", color: "#1a1a2e", image: "/assets/images/kits/ef5v2/ef5v2-hero.jpg" },
      { id: "pearl", name: "Pearl White", color: "#e8e8e8", image: "/assets/images/kits/ef5v2/ef5v2-hero.jpg" },
      { id: "cherry", name: "Cherry Burst", color: "#8b1a1a", image: "/assets/images/kits/ef5v2/ef5v2-hero.jpg" },
    ],
    inTheBox: [
      { name: "Snare mesh pad with shell", quantity: 1 },
      { name: "Tom mesh pads with shell", quantity: 3 },
      { name: "Acoustic kick drum with trigger", quantity: 1 },
      { name: "Crash choke pads", quantity: 2 },
      { name: "Ride pad", quantity: 1 },
      { name: "Reinforced drum rack", quantity: 1 },
      { name: "Extension arms CB-803EQ", quantity: 3 },
      { name: "F50 Module", quantity: 1 },
      { name: "Cables", quantity: 1 },
      { name: "Power supply", quantity: 1 },
      { name: "Manual", quantity: 1 },
    ],
    videoPreview: undefined,
    soundDemo: undefined,
    specsHighlight: [
      { label: "Sons", value: "937" },
      { label: "Pads", value: "9" },
      { label: "Faixas", value: "4" },
      { label: "Módulo", value: "F50" },
    ],
    highlights: [
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-3.png", title: "Módulo F50.", description: "O poder e a força de um módulo altamente tecnológico, moderno e profissional." },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest1.png", title: "Novo pé de bumbo Odery.", description: "Estrutura sólida que proporciona estabilidade e segurança. Pode ser usado na âncora ou na borracha (com troca rápida).", objectFit: "cover" as const, objectPosition: "top" },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-4.png", title: "Ferragens Odery Eyedentity.", description: "Canoas, bases e extensores Odery Eyedentity com visual contemporâneo e minimalista. Extremamente sólido e confiável." },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-5.png", title: "Minimalismo em cada detalhe.", description: "Rack tubular curvo e com cabos ocultos (internos). Fácil de montar, visual limpo e organizado sem cabos passando por toda a bateria." },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-6.png", title: "Acabamentos refinados.", description: "Cores discretas mas de beleza ímpar que faz da EF5 uma bateria de estilo único e forte identidade." },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-7.png", title: "Pensada em cada detalhe.", description: "Plaquinha de identificação como a cereja do bolo afinal, cada detalhe importa. Cada detalhe eleva o nível de percepção de qualidade e-Force.", objectFit: "contain" as const },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-8.png", title: "Rack único.", description: "Rack curvo tubular e que oculta os cabos. Design único, prático, fácil de montar, praticamente Plug & Play." },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-9.png", title: "Detalhes e detalhes.", description: "Aqui você vê o detalhe da borracha de acabamento do casco de madeira. Mais uma vez demonstrando a preocupação com a qualidade e visual em cada detalhe." },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-10.png", title: "Construção.", description: "Cascos de madeira com todos os itens de tecnologia interna de forma organizada, limpa e bem estruturada." },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-11.png", title: "Pratos Full Cover.", description: "Pratos top de linha com toque sensível e suave, além de um visual moderno e com funções completas para atender o mais exigente baterista." },
    ],
    editorialHeadline: "Construído para durar.",
    editorialBody: "Cada detalhe do EF5 V2 foi pensado para o músico que não aceita compromissos. Hardware cromado de precisão, shell com textura exclusiva e rack reforçado que suporta sessões intensas.",
    editorialVerticalImage: "/assets/images/kits/ef5v2/ef5v2-editorial-vertical.png",
    editorialHorizontalImage: "/assets/images/kits/ef5v2/ef5v2-editorial-horizontal.png",
    galleryImages: [
      "/assets/images/kits/ef5v2/ef5v2-hero.jpg",
      "/assets/images/kits/ef5v2/ef5v2-dramatic.jpg",
      "/assets/images/kits/ef5v2/ef5v2-front.jpg",
      "/assets/images/kits/ef5v2/ef5v2-aerial.jpg",
    ],
    techTabs: [],
  },
  {
    id: "ef7eye",
    slug: "ef7-eye-hybrid",
    name: "Odery Eyedentity Hybrid",
    price: "R$ 23,527",
    priceValue: 23527,
    tagline: "O topo. A declaração.",
    description:
      "Onde a forma acústica e a capacidade eletrônica se unem sem concessões. A experiência E-Force definitiva.",
    module: "F50",
    badge: "Flagship",
    heroImage: "/assets/images/kits/ef7eye/ef7eye-hero.jpg",
    finishes: [
      { id: "teal-pearl", name: "Teal Pearl", color: "#1a7a7a", image: "/assets/images/kits/ef7eye/ef7eye-hero.jpg" },
      { id: "black", name: "Midnight Black", color: "#1a1a2e", image: "/assets/images/kits/ef7eye/ef7eye-hero.jpg" },
      { id: "burst", name: "Tobacco Burst", color: "#6b3a1f", image: "/assets/images/kits/ef7eye/ef7eye-hero.jpg" },
    ],
    inTheBox: [],
    videoPreview: undefined,
    soundDemo: undefined,
    specsHighlight: [
      { label: "Sons", value: "937" },
      { label: "Pads", value: "10" },
      { label: "Faixas", value: "4" },
      { label: "Módulo", value: "F50" },
    ],
    highlights: [],
    editorialHeadline: undefined,
    editorialBody: undefined,
    galleryImages: [
      "/assets/images/kits/ef7eye/ef7eye-hero.jpg",
    ],
    techTabs: [],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAdjacentProducts(product: Product): { prev: Product | null; next: Product | null } {
  const sorted = [...products].sort((a, b) => a.priceValue - b.priceValue);
  const index = sorted.findIndex((p) => p.id === product.id);
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}
