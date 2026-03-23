import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SEO from '@/components/layout/SEO';

const milestones = [
  {
    year: '2000',
    title: 'Odery Drums is Founded',
    desc: 'In Curitiba, Brazil, Odery begins crafting acoustic drum kits with a focus on premium wood selection and innovative shell construction.',
  },
  {
    year: '2010',
    title: 'International Recognition',
    desc: 'Odery drums gain worldwide distribution, earning praise from professional drummers for their warm tone and exceptional build quality.',
  },
  {
    year: '2018',
    title: 'The Electronic Vision',
    desc: 'Odery identifies a gap in the electronic drum market — no brand combines acoustic craftsmanship with electronic innovation. The E-Force concept is born.',
  },
  {
    year: '2022',
    title: 'E-Force Launches',
    desc: 'The first E-Force electronic drum kits hit the market, featuring real wood-shell aesthetics, exclusive finish options, and the F10 module.',
  },
  {
    year: '2024',
    title: 'Global Expansion',
    desc: 'E-Force expands to international markets with the introduction of the F50 module, the EF7 Eye Hybrid, and distribution across South America, Europe, and Asia.',
  },
];

function TimelineMilestone({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className="relative pl-8"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      }}
    >
      {/* Dot */}
      <div className="absolute left-0 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-orange" />

      <span className="font-mono text-sm text-brand-orange">{milestone.year}</span>
      <h3 className="mt-1 font-display text-xl font-semibold text-white">{milestone.title}</h3>
      <p className="mt-2 font-body leading-relaxed text-[rgba(255,255,255,0.5)]">{milestone.desc}</p>
    </div>
  );
}

export default function StoryPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang ?? 'en';

  const { ref: philosophyRef, isVisible: philosophyVisible } = useScrollReveal(0.1);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal(0.1);

  return (
    <>
      <SEO
        title="Our Story | E-Force"
        description="Discover how Odery Drums Brazil's decades of acoustic mastery gave birth to E-Force — a new standard in electronic drums."
        lang={currentLang}
        path="story"
      />

      {/* SECTION 1 — Hero */}
      <section className="bg-[#0a0a0a] pt-24 pb-20 pt-32 md:pt-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#ff4a1c" }}
            className="inline-block"
          >
            OUR STORY
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 font-display font-bold leading-tight text-white"
            style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)", lineHeight: 0.92, letterSpacing: "-0.04em" }}
          >
            {t('odery.headline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl font-body"
            style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.5)" }}
          >
            {t('odery.p1')}
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      {/* SECTION 2 — Timeline */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="relative mx-auto max-w-4xl px-6">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-6 top-0 w-px bg-[rgba(255,255,255,0.08)]" />

          <div className="flex flex-col gap-12">
            {milestones.map((milestone, index) => (
              <TimelineMilestone key={milestone.year} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      {/* SECTION 3 — Philosophy */}
      <section className="bg-[#111] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left — Image placeholder */}
            <div className="flex aspect-[4/5] items-center justify-center rounded-xl bg-[#1a1a1a]">
              <span className="font-display text-2xl text-[rgba(255,255,255,0.25)]">
                Odery Workshop
              </span>
            </div>

            {/* Right — Text */}
            <div
              ref={philosophyRef}
              style={{
                opacity: philosophyVisible ? 1 : 0,
                transform: philosophyVisible ? 'translateX(0)' : 'translateX(40px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#ff4a1c" }}>
                PHILOSOPHY
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-white">
                Where acoustic soul meets electronic precision.
              </h2>
              <p className="mt-4 font-body leading-relaxed text-[rgba(255,255,255,0.5)]">
                Every E-Force instrument begins with a question: what would happen if decades of
                acoustic drum expertise were channeled into electronic design?
              </p>
              <p className="mt-4 font-body leading-relaxed text-[rgba(255,255,255,0.5)]">
                The answer is in every detail — the curve of each shell, the weight of each pad, the
                response of each trigger. These aren&apos;t design choices made by engineers alone.
                They&apos;re informed by luthiers, drummers, and acoustic specialists.
              </p>
              <p className="mt-4 font-body leading-relaxed text-[rgba(255,255,255,0.5)]">
                This is what sets E-Force apart. Not just technology. Not just aesthetics. A genuine
                understanding of what makes a drummer feel connected to their instrument.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      {/* SECTION 4 — CTA */}
      <section className="bg-[#0a0a0a] py-24">
        <div
          ref={ctaRef}
          className="mx-auto max-w-2xl px-6 text-center"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <h2 className="font-display text-3xl font-bold text-white">
            Experience the difference.
          </h2>
          <p className="mt-4 font-body text-[rgba(255,255,255,0.5)]">
            Explore the full E-Force line and find the kit that speaks to you.
          </p>
          <Link
            to={`/${currentLang}/line`}
            className="mt-8 inline-block rounded-md bg-brand-orange px-8 py-4 font-display font-semibold text-white transition-colors hover:bg-brand-orange-hover"
          >
            Explore the Line
          </Link>
        </div>
      </section>
    </>
  );
}
