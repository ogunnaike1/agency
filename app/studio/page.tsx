import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Studio from '@/components/Studio';

export const metadata: Metadata = { title: 'Studio — Reforge', description: 'Meet the developers, product engineers and creative specialists behind our agency.' };

export default function Page() {
  return (
    <PageShell page="studio">
      <Studio />
    </PageShell>
  );
}
