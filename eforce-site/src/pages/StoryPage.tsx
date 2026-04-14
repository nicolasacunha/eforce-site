import { useParams } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import SEO from '@/components/layout/SEO';
import { GlowCard } from '@/components/ui/spotlight-card';
import { ModelsCTA } from '@/components/product/ModelsCTA';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const viewport = { once: true, margin: "-80px" };

export default function StoryPage() {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang ?? 'en';
  const isEN = currentLang === 'en';

  const timelineItemsPT = [
    { year: "1991", text: "Em Campinas, Brasil, Mr. Odery começa a construir baterias no fundo da própria casa — cortando madeira no serrote, peça por peça. Ali nascia o que se tornaria uma das marcas mais respeitadas da percussão mundial." },
    { year: "2002", text: "A Odery cruza o Atlântico e se apresenta pela primeira vez numa feira internacional — a MusikMesse Frankfurt, na Alemanha. O resultado: destaque na Modern Drummer, uma das mais influentes publicações de bateria do mundo." },
    { year: "2007", text: "A Odery expande sua operação e passa a fabricar sua linha de série na China e em Taiwan, consolidando sua estrutura de produção global sem abrir mão dos padrões que a tornaram referência." },
    { year: "2011", text: "Lançamento da série Eyedentity — um marco. O modelo conquista o mercado mundial e eleva a Odery a um novo patamar de qualidade, design e posicionamento internacional." },
    { year: "2018", text: "A Odery lança seu catálogo mais icônico: baterias Custom Hand Made in Brazil. A linha avança com força no mercado americano e chinês, reafirmando o DNA artesanal que diferencia a marca." },
    { year: "2021", text: "A fábrica parceira da Odery na China começa a desenvolver baterias eletrônicas, de olho no crescimento acelerado deste mercado no mundo todo." },
    { year: "2025", text: "A fábrica convida a Odery para uma joint venture. O objetivo: desenvolver baterias eletrônicas com o mesmo nível de exigência em funcionamento e design que 35 anos de Odery Drums representam. A parceria é aceita." },
    { year: "2026", text: "A E-Force é lançada. Um produto diferenciado, de identidade inconfundível — é apenas o começo de uma nova história." },
  ];

  const timelineItemsEN = [
    { year: "1991", text: "In Campinas, Brazil, Mr. Odery begins building drums in the backyard of his own home — cutting wood by hand, piece by piece. That was the beginning of what would become one of the most respected drum brands in the world." },
    { year: "2002", text: "Odery crosses the Atlantic and appears for the first time at an international trade fair — Musikmesse Frankfurt, Germany. The result: a feature in Modern Drummer, one of the most influential drum publications in the world." },
    { year: "2007", text: "Odery expands its operations and begins manufacturing its series line in China and Taiwan, consolidating its global production structure without compromising on the standards that made it a reference." },
    { year: "2011", text: "Launch of the Eyedentity series — a milestone. The model conquers the global market and elevates Odery to a new level of quality, design, and international positioning." },
    { year: "2018", text: "Odery launches its most iconic catalog: Custom Hand Made in Brazil drums. The line pushes forward in the American and Chinese markets, reaffirming the artisanal DNA that sets the brand apart." },
    { year: "2021", text: "Odery's partner factory in China begins developing electronic drums, eyeing the accelerated growth of this market worldwide." },
    { year: "2025", text: "The factory invites Odery into a joint venture. The goal: develop electronic drums with the same level of performance and design standards that 35 years of Odery Drums represent. The partnership is accepted." },
    { year: "2026", text: "E-Force launches. A distinctive product with an unmistakable identity — this is just the beginning of a new story." },
  ];

  const timelineItems = isEN ? timelineItemsEN : timelineItemsPT;

  return (
    <>
      <SEO
        title={isEN ? "Story & Brand | E-Force" : "A História & A Marca | E-Force"}
        description={isEN ? "Discover the anatomy of the E-Force brand — a visual identity built on innovation, power, and modernity." : "Conheça a anatomia da marca E-Force — a identidade visual construída sobre inovação, poder e modernidade."}
        lang={currentLang}
        path="story"
      />

      {/* SECTION — Anatomia da Marca */}
      <section style={{ background: "#0a0a0a", padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "start",
          }} className="max-md:!grid-cols-1">

            {/* Coluna esquerda */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              <motion.img
                variants={fadeIn}
                src="/assets/images/brand/logo-anatomia.webp"
                alt="Logo anatomy grid"
                loading="lazy"
                style={{ width: "100%", display: "block", borderRadius: "4px", marginBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}
              />
              <motion.p
                variants={fadeLeft}
                style={{ fontSize: "clamp(1rem, 1.6vw, 1.5rem)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8500A", margin: "0 0 clamp(1rem, 2vh, 1.5rem) 0", lineHeight: 1 }}
              >
                {isEN ? "BRAND ANATOMY" : "ANATOMIA DA MARCA"}
              </motion.p>
              <div style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.7)", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <motion.p variants={fadeUp} style={{ margin: 0 }}>
                  {isEN ? "The E-Force logotype was created to visually communicate the brand's identity as an electronic drum manufacturer built on innovation, power, and modernity. The central element features an inverted triangle with three horizontal lines — an abstract representation of the letter \"e\", a direct reference to the concept of \"electronic\". This geometric shape symbolizes energy and direction, evoking the dynamic nature of electronic music." : "O Logotipo da E-Force foi criado para comunicar visualmente a identidade da marca como fabricante de baterias eletrônicas construída sobre inovação, poder e modernidade. O elemento central apresenta um triângulo invertido com três linhas horizontais — uma representação abstrata da letra \"e\", referência direta ao conceito de \"eletrônico\". Esta forma geométrica simboliza energia e direção, evocando a natureza dinâmica da música eletrônica."}
                </motion.p>
                <motion.p variants={fadeUp} style={{ margin: 0 }}>
                  {isEN ? "The letter \"F\" represents Force — the acoustic expertise, craftsmanship, and determination that Odery has built over 35 years, now channeled into every electronic kit we create. Next comes the Play symbol: the most universal icon in music, present in every drummer's daily life on the planet — and now, at the heart of E-Force." : "A letra \"F\" representa a Força — a expertise acústica, o artesanato e a determinação que a Odery construiu ao longo de 35 anos, agora canalizados em cada kit eletrônico que criamos. Na sequência vem o símbolo do Play: o ícone mais universal da música, presente no dia a dia de cada baterista no planeta — e agora, no coração da E-Force."}
                </motion.p>
                <motion.p variants={fadeUp} style={{ margin: 0 }}>
                  {isEN ? "To complete it, a perfect circle connects all elements, symbolizing unity, infinity, and the harmonious integration of technology. A reminder that with E-Force, the possibilities in sound creation are infinite." : "Para completar, um círculo perfeito conecta todos os elementos, simbolizando unidade, infinidade e a integração harmoniosa da tecnologia. Um lembrete de que com a E-Force, as possibilidades na criação sonora são infinitas."}
                </motion.p>
              </div>
            </motion.div>

            {/* Coluna direita — rascunho grande */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              style={{ position: "sticky", top: "6rem" }}
            >
              <img
                src="/assets/images/brand/logo-rascunho.webp"
                alt="E-Force logo sketch"
                loading="lazy"
                style={{ width: "100%", display: "block", borderRadius: "4px" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION — Vídeo da Marca */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        style={{ background: "#0a0a0a", padding: "0 0 clamp(4rem, 8vh, 7rem)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 6vw, 5rem)" }}>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "12px" }}>
            <iframe
              src="https://www.youtube.com/embed/wcPBaeA1k9M"
              title="E-Force — A História"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </div>
      </motion.section>

      {/* SECTION — Timeline */}
      <section style={{ background: "#0a0a0a", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative" }}>
          {/* Linha vertical */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewport}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "1px", background: "rgba(255,255,255,0.08)", transformOrigin: "top" }}
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            style={{ display: "flex", flexDirection: "column", gap: "clamp(2.5rem, 5vh, 4rem)" }}
          >
            {timelineItems.map(({ year, text }) => (
              <motion.div
                key={year}
                variants={fadeLeft}
                style={{ paddingLeft: "clamp(1.5rem, 4vw, 3rem)", position: "relative" }}
              >
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={viewport}
                  transition={{ duration: 0.4, delay: 0.2, ease: "backOut" }}
                  style={{ position: "absolute", left: "-5px", top: "6px", width: "10px", height: "10px", borderRadius: "50%", background: year === "2026" ? "#E8500A" : "rgba(255,255,255,0.25)", border: year === "2026" ? "none" : "1px solid rgba(255,255,255,0.4)" }}
                />
                <span style={{ fontFamily: "monospace", fontSize: "clamp(0.75rem, 0.9vw, 0.85rem)", color: "#E8500A", fontWeight: 600, letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>{year}</span>
                <p style={{ margin: 0, fontSize: "clamp(0.9rem, 1.05vw, 1rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.65)" }}>{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION — Filosofia */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        style={{ background: "#0a0a0a", padding: "0 clamp(1.5rem, 6vw, 5rem) clamp(4rem, 8vh, 7rem)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <GlowCard
            glowColor="orange"
            customSize
            style={{ width: "100%", padding: "clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3.5rem)" }}
          >
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E8500A", marginBottom: "1.2rem" }}>
                {isEN ? "PHILOSOPHY" : "FILOSOFIA"}
              </p>
              <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 400, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}>
                {isEN ? "Where acoustic soul meets electronic precision." : "Onde a alma acústica encontra a precisão eletrônica."}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "clamp(0.9rem, 1.05vw, 1rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}>
                <p style={{ margin: 0 }}>{isEN ? "Every E-Force instrument starts with a question: what would happen if decades of acoustic drum expertise were channeled into electronic design?" : "Todo instrumento e-Force começa com uma pergunta: o que aconteceria se décadas de expertise em baterias acústicas fossem canalizadas para o design eletrônico?"}</p>
                <p style={{ margin: 0 }}>{isEN ? "The answer is in every detail. The shells are made of wood — because a brand that understands wood builds no other way. The triggers are high-sensitivity, the heads deliver the real response of an acoustic drum, and the design carries the same visual language that made Odery recognizable on stages around the world." : "A resposta está em cada detalhe. Os cascos são de madeira — porque uma marca que entende de madeira não constrói de outra forma. Os triggers são de alta sensibilidade, as peles entregam a resposta real de uma bateria acústica, e o design carrega a mesma linguagem visual que tornou a Odery reconhecível em palcos ao redor do mundo."}</p>
                <p style={{ margin: 0 }}>{isEN ? "That's what sets E-Force apart. Not just technology. Not just aesthetics. It's a genuine understanding of what makes a drummer feel truly connected to their instrument." : "Isso é o que diferencia a e-Force. Não é só tecnologia. Não é só estética. É uma compreensão genuína do que faz um baterista se sentir verdadeiramente conectado ao seu instrumento."}</p>
              </div>
            </div>
          </GlowCard>
        </div>
      </motion.section>

      <ModelsCTA />
    </>
  );
}
