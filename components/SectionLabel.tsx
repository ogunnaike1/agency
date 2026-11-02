export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p data-reveal className="mb-7 flex items-center gap-3 text-[13px] uppercase tracking-[.06em]">
      <span className="block h-[9px] w-[9px] rounded-full bg-steel" />
      <span>{children}</span>
    </p>
  );
}
