import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Work from '@/components/Work';
import { WORK_CATEGORIES } from '@/lib/data';

export const metadata: Metadata = { title: 'Work — Agency Name', description: 'Selected member work across product engineering, AI, e-commerce, motion graphics and 3D visualisation.' };

export default function Page({ searchParams }: { searchParams: { category?: string | string[] } }) {
  const category = WORK_CATEGORIES.find((filter) => filter.id === searchParams.category)?.id;
  return (
    <PageShell key={category ?? 'all'} page="work">
      <Work category={category} />
    </PageShell>
  );
}
