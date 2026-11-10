import PageShell from '@/components/PageShell';
import Hero from '@/components/Hero';
import HomeIndex from '@/components/HomeIndex';
import HomeWork from '@/components/HomeWork';

export default function Home() {
  return (
    <PageShell page="home">
      <Hero />
      <HomeWork />
      <HomeIndex />
    </PageShell>
  );
}
