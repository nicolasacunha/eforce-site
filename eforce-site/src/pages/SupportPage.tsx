import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SEO from '@/components/layout/SEO';

const faqData = [
  {
    question: 'What makes E-Force different from other electronic drum brands?',
    answer: 'E-Force is developed in partnership with Odery Drums Brazil, combining over 20 years of acoustic drum craftsmanship with modern electronic innovation. Our kits feature real wood-shell aesthetics, exclusive finish options, and professional-grade modules — a combination no other brand offers.',
  },
  {
    question: 'What is the difference between the F10 and F50 modules?',
    answer: 'The F10 module features a 2.8" color LCD, 184 onboard sounds, 40 factory kits, and full Bluetooth MIDI/Audio connectivity. The F50 is our flagship module with a 4.3" color touch LCD, 937 sounds, 80 factory kits, 100 user kits, and 60 play-along tracks.',
  },
  {
    question: 'Can I power the module with a power bank?',
    answer: 'Yes. All E-Force modules use USB-C power, making them compatible with standard power banks, laptop USB ports, and USB-C chargers. This means you can practice anywhere without needing a wall outlet.',
  },
  {
    question: 'Are the mesh heads replaceable?',
    answer: 'Yes. All E-Force mesh heads are standard sizes and can be replaced with compatible mesh heads from most major manufacturers.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'E-Force is available through our authorized dealer network across South America, Europe, North America, and Asia. Visit our Dealers page to find a retailer near you.',
  },
  {
    question: 'What warranty do E-Force products come with?',
    answer: 'All E-Force electronic drum kits come with a 2-year manufacturer warranty covering defects in materials and workmanship. Contact your dealer or our support team for warranty claims.',
  },
  {
    question: 'Can I connect the module to a DAW?',
    answer: 'Absolutely. The module connects via USB-C as a class-compliant MIDI and audio device — no drivers needed. You can also use Bluetooth MIDI for wireless connection to your DAW, or record directly to your phone via OTG.',
  },
  {
    question: 'How do I update the module firmware?',
    answer: 'Firmware updates are available on our downloads page. Connect the module to your computer via USB-C and follow the update instructions included with each firmware release.',
  },
];

export default function SupportPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: faqRef, isVisible: faqVisible } = useScrollReveal(0.05);
  const { ref: contactRef, isVisible: contactVisible } = useScrollReveal();

  const currentLang = lang ?? 'en';

  return (
    <>
      <SEO
        title={`${t('nav.support')} | E-Force`}
        description="Get help with your E-Force electronic drums. FAQ, downloads, warranty information, and contact support."
        lang={currentLang}
        path="support"
      />

      {/* Hero */}
      <section className="bg-brand-black pt-24 pt-32 pb-16 md:pt-40">
        <div
          ref={heroRef}
          className="mx-auto max-w-4xl px-6 text-center"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
            {t('nav.support').toUpperCase()}
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-white md:text-6xl">
            How can we help?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-neutral-400">
            Find answers to common questions, download manuals and firmware, or get in touch with our team.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-black py-16">
        <div
          ref={faqRef}
          className="mx-auto max-w-3xl px-6"
          style={{
            opacity: faqVisible ? 1 : 0,
            transform: faqVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <h2 className="mb-8 font-display text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <div className="divide-y divide-neutral-800">
            {faqData.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="pr-4 font-display text-base font-medium text-white">
                    {item.question}
                  </span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-neutral-400 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 font-body text-sm leading-relaxed text-neutral-400">
                    {item.answer}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="bg-neutral-950 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-white">
            Downloads
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'F10 Module Manual', type: 'PDF', size: '2.4 MB' },
              { name: 'F50 Module Manual', type: 'PDF', size: '3.8 MB' },
              { name: 'F10 Firmware v2.1', type: 'ZIP', size: '12 MB' },
              { name: 'F50 Firmware v3.0', type: 'ZIP', size: '18 MB' },
              { name: 'Quick Start Guide', type: 'PDF', size: '1.1 MB' },
              { name: 'MIDI Implementation', type: 'PDF', size: '800 KB' },
            ].map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 p-5 transition-colors hover:border-brand-orange/30"
              >
                <div>
                  <p className="font-display text-sm font-semibold text-white">{file.name}</p>
                  <p className="mt-1 font-mono text-xs text-neutral-400">
                    {file.type} — {file.size}
                  </p>
                </div>
                <svg
                  className="h-5 w-5 flex-shrink-0 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-brand-black py-24">
        <div
          ref={contactRef}
          className="mx-auto max-w-2xl px-6"
          style={{
            opacity: contactVisible ? 1 : 0,
            transform: contactVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <h2 className="mb-2 text-center font-display text-2xl font-bold text-white">
            Contact Us
          </h2>
          <p className="mb-8 text-center font-body text-neutral-400">
            Can&apos;t find what you&apos;re looking for? Send us a message.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Name"
                className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 font-body text-sm text-white placeholder:text-neutral-600 focus:border-brand-orange/50 focus:outline-none focus:ring-1 focus:ring-brand-orange/50"
              />
              <input
                type="email"
                placeholder="Email"
                className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 font-body text-sm text-white placeholder:text-neutral-600 focus:border-brand-orange/50 focus:outline-none focus:ring-1 focus:ring-brand-orange/50"
              />
            </div>
            <select className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 font-body text-sm text-white focus:border-brand-orange/50 focus:outline-none focus:ring-1 focus:ring-brand-orange/50">
              <option value="">Select a topic</option>
              <option value="product">Product Question</option>
              <option value="warranty">Warranty Claim</option>
              <option value="dealer">Dealer Inquiry</option>
              <option value="other">Other</option>
            </select>
            <textarea
              rows={5}
              placeholder="Your message"
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 font-body text-sm text-white placeholder:text-neutral-600 focus:border-brand-orange/50 focus:outline-none focus:ring-1 focus:ring-brand-orange/50"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-brand-orange px-8 py-3.5 font-display text-sm font-semibold text-white transition-colors hover:bg-brand-orange-hover"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Warranty */}
      <section className="bg-neutral-950 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-white">Warranty</h2>
          <p className="mx-auto mt-4 max-w-xl font-body leading-relaxed text-neutral-400">
            All E-Force electronic drum kits are covered by a 2-year manufacturer warranty.
            This warranty covers defects in materials and workmanship under normal use conditions.
            For warranty claims, please contact your authorized dealer or use the form above.
          </p>
        </div>
      </section>
    </>
  );
}
