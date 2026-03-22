import HeroSection from '@/components/home/HeroSection';
import ManifestoSection from '@/components/home/ManifestoSection';
import ProductShowcase from '@/components/home/ProductShowcase';
import FinishShowcase from '@/components/home/FinishShowcase';
import OderyStory from '@/components/home/OderyStory';
import TechPillars from '@/components/home/TechPillars';
import VideoSection from '@/components/home/VideoSection';
import SocialProof from '@/components/home/SocialProof';
import DealerCTA from '@/components/home/DealerCTA';
import SEO from '@/components/layout/SEO';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

export default function HomePage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <>
      <SEO
        title="E-Force Electronic Drums"
        description={t('hero.sub')}
        lang={lang ?? 'en'}
        path=""
      />
      <HeroSection />
      <ManifestoSection />
      <ProductShowcase />
      <FinishShowcase />
      <OderyStory />
      <TechPillars />
      <VideoSection />
      <SocialProof />
      <DealerCTA />
    </>
  );
}
