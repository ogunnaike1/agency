import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Process from '@/components/Process';

export const metadata: Metadata = { title: 'Process — Reforge', description: 'How we work: discover, define, build, validate and deliver.' };

export default function Page() {
  return (
    <PageShell page="process">
      <Process />
    </PageShell>
  );
}
