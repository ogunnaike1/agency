import Nav from './Nav';
import Watermark from './Watermark';
import Stage, { type StagePage } from './Stage';
import Footer from './Footer';
import Reveals from './Reveals';

/** Shared chrome for every route: watermark, scroll-driven plates, nav, footer. */
export default function PageShell({ page, children }: { page: StagePage; children: React.ReactNode }) {
  return (
    <div id="top" className="relative overflow-x-clip">
      <Watermark />
      <Stage page={page} />
      <Nav />
      <main className={page === 'home' ? '' : 'pt-[clamp(56px,6vw,96px)]'}>{children}</main>
      <Footer />
      <Reveals />
    </div>
  );
}
