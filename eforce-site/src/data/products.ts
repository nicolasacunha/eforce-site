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
    tagline: "Your starting point.",
    description:
      "Accessible entry into the world of electronic drums, without compromising on visual quality or feel.",
    module: "F10",
    badge: null,
    heroImage: "/assets/images/kits/ef2v1/ef2v1-principal-nobg.png",
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
      { image: "/assets/images/kits/ef2v1/ef2v1-render-6.png", title: "Design.", description: "Estrutura compacta e funcional para quem está começando." },
      { image: "/assets/images/kits/ef2v1/ef2v1-render-7.png", title: "Módulo.", description: "Módulo F10 com 461 sons e conectividade USB-MIDI." },
      { image: "/assets/images/kits/ef2v1/ef2v1-render-8.png", title: "Trigger.", description: "Sistema de trigger preciso para resposta natural." },
      { image: "/assets/images/kits/ef2v1/ef2v1-render-11.png", title: "Estrutura.", description: "Rack em aço tubular resistente e estável." },
      { image: "/assets/images/kits/ef2v1/ef2v1-render-12.png", title: "Acabamento.", description: "Detalhes que fazem a diferença na experiência." },
      { image: "/assets/images/kits/ef2v1/ef2v1-render-14.png", title: "Precisão.", description: "Pads mesh com resposta sensível ao toque." },
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
    tagline: "The drummer's first choice.",
    description:
      "The best value in electronic drumming — wood-shell aesthetics, modern connectivity, and up to three exclusive finishes.",
    module: "F10",
    badge: "Best Seller",
    heroImage: "/assets/images/kits/ef2v2/ef2v2-hero-nobg.png",
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
      { image: "/assets/images/kits/ef2v2/ef2v2-render-8.png", title: "Design.", description: "Visual de bateria acústica com shells em madeira." },
      { image: "/assets/images/kits/ef2v2/ef2v2-render-9.png", title: "Shells.", description: "Acabamento premium que eleva a estética do kit." },
      { image: "/assets/images/kits/ef2v2/ef2v2-render-11.png", title: "Estrutura.", description: "Rack robusto em aço tubular para máxima estabilidade." },
      { image: "/assets/images/kits/ef2v2/ef2v2-render-17.png", title: "Conectividade.", description: "USB-MIDI para integração com DAWs e softwares." },
      { image: "/assets/images/kits/ef2v2/ef2v2-render-20.png", title: "Pedal.", description: "Kick pedal incluso para performance realista." },
      { image: "/assets/images/kits/ef2v2/ef2v2-render-21.png", title: "Pratos.", description: "Crash choke com resposta natural ao toque." },
      { image: "/assets/images/kits/ef2v2/ef2v2-render-22.png", title: "Precisão.", description: "Pads mesh dual-zone para dinâmica expressiva." },
    ],
    editorialHeadline: undefined,
    editorialBody: undefined,
    editorialVerticalImage: "/assets/images/kits/ef2v2/ef2v2-vertical-purple.png",
    editorialHorizontalImage: "/assets/images/kits/ef2v2/ef2v2-render-5.png",
    fullKitImage: "/assets/images/kits/ef2v2/ef2v2-full-kit.png",
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
    tagline: "The natural step up.",
    description:
      "Enhanced hardware and expanded features for drummers ready to take their practice further.",
    module: "F10",
    badge: null,
    heroImage: "/assets/images/kits/ef2v3/ef2v3-hero-nobg.png",
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
      { image: "/assets/images/kits/ef2v3/ef2v3-highlight-1.jpg", title: "Design.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
      { image: "/assets/images/kits/ef2v3/ef2v3-highlight-2.jpg", title: "Tecnologia.", description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { image: "/assets/images/kits/ef2v3/ef2v3-highlight-3.jpg", title: "Performance.", description: "Ut enim ad minim veniam, quis nostrud exercitation." },
      { image: "/assets/images/kits/ef2v3/ef2v3-highlight-4.jpg", title: "Acabamento.", description: "Duis aute irure dolor in reprehenderit in voluptate velit." },
      { image: "/assets/images/kits/ef2v3/ef2v3-highlight-5.jpg", title: "Precisão.", description: "Excepteur sint occaecat cupidatat non proident." },
      { image: "/assets/images/kits/ef2v3/ef2v3-highlight-6.jpg", title: "Durabilidade.", description: "Sunt in culpa qui officia deserunt mollit anim id est laborum." },
    ],
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
    tagline: "Premium mid-range performance.",
    description:
      "Refined hardware, expanded connectivity, and a commanding stage presence at a fraction of flagship pricing.",
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
      { image: "/assets/images/kits/ef2v4/ef2v4-render-6.png", title: "Design.", description: "Presença de palco com hardware profissional." },
      { image: "/assets/images/kits/ef2v4/ef2v4-render-9.png", title: "Hi-hat.", description: "Estante de hi-hat dedicada para feel acústico." },
      { image: "/assets/images/kits/ef2v4/ef2v4-render-15.png", title: "Pedal.", description: "Pedal Equalizer P-803 para máximo controle." },
      { image: "/assets/images/kits/ef2v4/ef2v4-render-18.png", title: "Rack.", description: "Rack profissional com braços de extensão CB-803EQ." },
      { image: "/assets/images/kits/ef2v4/ef2v4-render-25.png", title: "Acabamento.", description: "Shells com acabamento premium em cada detalhe." },
      { image: "/assets/images/kits/ef2v4/ef2v4-render-26.png", title: "Precisão.", description: "Snare stand S-803 para posicionamento ideal." },
    ],
    editorialHeadline: undefined,
    editorialBody: undefined,
    editorialVerticalImage: "/assets/images/kits/ef2v4/ef2v4-render-23.png",
    editorialHorizontalImage: "/assets/images/kits/ef2v4/ef2v4-render-14.png",
    fullKitImage: "/assets/images/kits/ef2v4/ef2v4-full-kit.png",
    galleryImages: [
      "/assets/images/kits/ef2v4/ef2v4-hero-nobg.png",
      "/assets/images/kits/ef2v4/ef2v4-numeros-nobg.png",
    ],
    techTabs: [],
  },
  {
    id: "ef6cafe",
    slug: "ef6-cafe-hybrid",
    name: "Odery Cafe Hybrid",
    price: "R$ 10,206",
    priceValue: 10206,
    tagline: "Compact by design. Full by nature.",
    description:
      "Maximum playability in minimal space. Engineered for apartments, home studios, and intimate stages.",
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
    tagline: "The professional's instrument.",
    description:
      "Studio-grade sound, expressive pad response, and the F50 module's 937-sound library. Built for serious drummers.",
    module: "F50",
    badge: null,
    heroImage: "/assets/images/kits/ef5v2/ef5v2-dramatic.jpg",
    menuImage: "/assets/images/kits/ef5v2/ef5v2-menu.png",
    showcaseImage: "/assets/images/kits/ef5v2/ef5v2-menu.png",
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
    highlights: [],
    editorialHeadline: undefined,
    editorialBody: undefined,
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
    tagline: "The pinnacle. The statement.",
    description:
      "Where acoustic form and electronic capability converge without compromise. The definitive E-Force experience.",
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
