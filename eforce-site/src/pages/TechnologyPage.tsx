import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SEO from '@/components/layout/SEO';

interface ModuleSpec {
  name: string;
  value: string;
}

interface ModuleCardProps {
  code: string;
  codeSizeClass: string;
  title: string;
  subtitle: string;
  specs: ModuleSpec[];
  availableIn: string[];
  flagship?: boolean;
}

function ModuleCard({
  code,
  codeSizeClass,
  title,
  subtitle,
  specs,
  availableIn,
  flagship,
}: ModuleCardProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl border bg-[#111] p-10 ${
        flagship ? 'border-brand-orange/20' : 'border-[rgba(255,255,255,0.08)]'
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {flagship && (
        <span className="absolute right-6 top-6 rounded-full bg-brand-orange/10 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wider text-brand-orange">
          FLAGSHIP
        </span>
      )}

      <span
        className={`font-display font-bold text-brand-orange/30 ${codeSizeClass}`}
      >
        {code}
      </span>
      <h3 className="mt-4 font-display text-2xl font-bold text-white">{title}</h3>
      <p className="mt-2 font-body text-[rgba(255,255,255,0.5)]">{subtitle}</p>

      <div className="mt-8">
        {specs.map((spec) => (
          <div
            key={spec.name}
            className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] py-3"
          >
            <span className="font-body text-[rgba(255,255,255,0.5)]">{spec.name}</span>
            <span className="font-mono text-white">{spec.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <span className="font-body text-sm text-[rgba(255,255,255,0.5)]">Available in</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {availableIn.map((model) => (
            <span
              key={model}
              className="rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1 font-mono text-xs text-[rgba(255,255,255,0.5)]"
            >
              {model}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FeatureSectionProps {
  bg: 'black' | 'surface';
  label: string;
  title: string;
  desc: string;
  extra: string;
  reversed?: boolean;
  placeholderLabel: string;
}

function FeatureSection({
  bg,
  label,
  title,
  desc,
  extra,
  reversed,
  placeholderLabel,
}: FeatureSectionProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  const bgClass = bg === 'black' ? 'bg-[#0a0a0a]' : 'bg-[#111]';
  const placeholderBg = bg === 'black' ? 'bg-[#111]' : 'bg-[#1a1a1a]';

  const imagePlaceholder = (
    <div
      className={`flex aspect-square items-center justify-center rounded-xl ${placeholderBg}`}
    >
      <span className="font-display text-2xl text-[rgba(255,255,255,0.25)]">
        {placeholderLabel}
      </span>
    </div>
  );

  const textContent = (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateX(0)'
          : reversed
            ? 'translateX(-40px)'
            : 'translateX(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#ff4a1c" }}>
        {label}
      </span>
      <h2 className="mt-3 font-display text-3xl font-bold text-white">{title}</h2>
      <p className="mt-4 font-body leading-relaxed text-[rgba(255,255,255,0.5)]">{desc}</p>
      <p className="mt-4 font-body leading-relaxed text-[rgba(255,255,255,0.5)]">{extra}</p>
    </div>
  );

  return (
    <section className={`${bgClass} py-24`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {reversed ? (
            <>
              {textContent}
              {imagePlaceholder}
            </>
          ) : (
            <>
              {imagePlaceholder}
              {textContent}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

const f10Specs: ModuleSpec[] = [
  { name: 'Display', value: '2.8" Color LCD' },
  { name: 'Sounds', value: '184' },
  { name: 'Factory Kits', value: '40' },
  { name: 'User Kits', value: '50' },
  { name: 'Play-Along', value: '30 tracks' },
];

const f50Specs: ModuleSpec[] = [
  { name: 'Display', value: '4.3" Color Touch LCD' },
  { name: 'Sounds', value: '937' },
  { name: 'Factory Kits', value: '80' },
  { name: 'User Kits', value: '100' },
  { name: 'Play-Along', value: '60 tracks' },
];

export default function TechnologyPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang ?? 'en';

  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal(0.1);

  return (
    <>
      <SEO
        title="Technology | E-Force"
        description="Explore the technology behind E-Force electronic drums — the F10 and F50 modules, Bluetooth MIDI, OTG recording, USB-C power, and premium build quality."
        lang={currentLang}
        path="technology"
      />

      {/* SECTION 1 — Hero */}
      <section className="bg-[#0a0a0a] pt-24 pb-16 pt-32 md:pt-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#ff4a1c" }}
            className="inline-block"
          >
            {t('tech.label')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 font-display font-bold leading-tight text-white"
            style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)", lineHeight: 0.92, letterSpacing: "-0.04em" }}
          >
            {t('tech.headline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl font-body"
            style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.5)" }}
          >
            Two powerful modules. One philosophy: give drummers complete control over their sound.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      {/* SECTION 2 — Module Comparison */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ModuleCard
              code="F10"
              codeSizeClass="text-5xl"
              title="F10 Module"
              subtitle="The essential toolkit"
              specs={f10Specs}
              availableIn={['EF2 V1', 'V2', 'V3', 'V4', 'EF6']}
            />
            <ModuleCard
              code="F50"
              codeSizeClass="text-6xl"
              title="F50 Module"
              subtitle="The professional powerhouse"
              specs={f50Specs}
              availableIn={['EF5 V2', 'EF7 Eye Hybrid']}
              flagship
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 — Feature Deep-Dives */}
      <FeatureSection
        bg="surface"
        label="WIRELESS"
        title={t('tech.bluetooth.title')}
        desc={t('tech.bluetooth.desc')}
        extra="Stream your favorite backing tracks directly to the module. Connect your Bluetooth headphones for silent practice. Send MIDI data wirelessly to your DAW for recording. All without a single cable."
        placeholderLabel="Bluetooth"
      />

      <FeatureSection
        bg="black"
        label="RECORDING"
        title={t('tech.otg.title')}
        desc={t('tech.otg.desc')}
        extra="Simply connect your phone via USB OTG cable and start recording instantly. The module appears as a USB audio interface — compatible with any recording app on iOS or Android."
        reversed
        placeholderLabel="OTG Recording"
      />

      <FeatureSection
        bg="surface"
        label="POWER"
        title={t('tech.usbc.title')}
        desc={t('tech.usbc.desc')}
        extra="No more bulky power adapters. The E-Force module runs on standard USB-C power, meaning any power bank, laptop, or USB charger can keep you playing. Perfect for outdoor gigs, busking, or practice on the go."
        placeholderLabel="USB-C Power"
      />

      <FeatureSection
        bg="black"
        label="CRAFTSMANSHIP"
        title="Built to perform. Built to last."
        desc="Every E-Force kit is constructed with the same attention to detail that defines Odery's acoustic instruments. Reinforced racks, professional-grade hardware, and mesh heads designed for thousands of hours of play."
        extra=""
        reversed
        placeholderLabel="Build Quality"
      />

      {/* SECTION 4 — CTA */}
      <section className="bg-[#111] py-24">
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
            Ready to experience the difference?
          </h2>
          <p className="mt-4 font-body text-[rgba(255,255,255,0.5)]">
            Explore the full E-Force line and find the kit that defines your performance.
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
