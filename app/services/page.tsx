import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Services from '@/components/Services';

export const metadata: Metadata = { title: 'Services — Agency Name', description: 'Engineering, experience, data and security: four pillars, one build.' };

export default function Page() {
  return (
    <PageShell page="services">
      <Services />
    </PageShell>
  );
}
