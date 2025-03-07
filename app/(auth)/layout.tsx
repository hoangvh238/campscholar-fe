function AuthRootLayout({ children }: { children: React.ReactElement }) {
  return (
    <main className="flex h-screen w-screen items-center justify-center overflow-hidden">
      {children}
    </main>
  );
}
export default AuthRootLayout;
