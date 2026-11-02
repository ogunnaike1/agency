import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Contact from '@/components/Contact';

export const metadata: Metadata = { title: 'Contact — Agency Name', description: 'Tell us what you are building.' };

export default function Page() {
  return (
    <PageShell page="contact">
      <Contact />
    </PageShell>
  );
}
