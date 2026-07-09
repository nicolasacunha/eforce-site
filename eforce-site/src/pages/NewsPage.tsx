import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function NewsPage() {
  const { lang } = useParams<{ lang: string }>();
  useEffect(() => {
    window.location.replace(`/${lang ?? 'pt'}/news/`);
  }, [lang]);
  return null;
}
