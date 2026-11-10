import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Work from '@/components/Work';

export const metadata: Metadata = { title: 'Work — Reforge', description: 'Selected member work across product engineering, AI, e-commerce, motion graphics and 3D visualisation.' };

export default function Page() {
  return (
    <PageShell page="work">
      <Work />
    </PageShell>
  );
}
