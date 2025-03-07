function ContestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden w-full max-w-7xl space-y-6 px-10 py-10 md:block">
      <div className="flex">{children}</div>
    </div>
  );
}
export default ContestLayout;
