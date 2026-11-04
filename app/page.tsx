import PageShell from '@/components/PageShell';
import Hero from '@/components/Hero';
import HomeIndex from '@/components/HomeIndex';
import HomeWork from '@/components/HomeWork';
import HomeTeam from '@/components/HomeTeam';

export default function Home() {
  return (
    <PageShell page="home">
      <Hero />
      <HomeWork />
      <HomeTeam />
      <HomeIndex />
    </PageShell>
  );
}
