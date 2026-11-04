'use client';
import StagePlates from './StagePlates';
import StageFrame from './StageFrame';

export type StagePage = 'home' | 'services' | 'work' | 'process' | 'studio' | 'contact';

/** Home keeps the original four-plate hero collage; other pages use the project-image wipe frame. */
export default function Stage({ page }: { page: StagePage }) {
  return page === 'home' ? <StagePlates page={page} /> : <StageFrame page={page} />;
}
