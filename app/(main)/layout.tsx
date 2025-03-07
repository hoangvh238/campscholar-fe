import MainLayout from "@/components/core/layouts/MainLayout";

function HomepageRootLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}

export default HomepageRootLayout;
