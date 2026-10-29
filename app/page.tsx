import Nav from '@/components/Nav';
import Watermark from '@/components/Watermark';
import Stage from '@/components/Stage';
import Hero from '@/components/Hero';
import Capabilities from '@/components/Capabilities';
import Work from '@/components/Work';
import Process from '@/components/Process';
import Studio from '@/components/Studio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Reveals from '@/components/Reveals';

export default function Page() {
  return (
    <div className="relative overflow-x-clip">
      <Watermark />
      <Stage />
      <Nav />
      <main>
        <Hero />
        <Capabilities />
        <Work />
        <Process />
        <Studio />
        <Contact />
      </main>
      <Footer />
      <Reveals />
    </div>
  );
}
