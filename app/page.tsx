import PageShell from '@/components/PageShell';
import Hero from '@/components/Hero';
import HomeIndex from '@/components/HomeIndex';

export default function Home() {
  return (
    <PageShell page="home">
      <Hero />
      <HomeIndex />
    </PageShell>
  );
}
