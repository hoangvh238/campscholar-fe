import ClassroomLayout from "@/components/core/layouts/ClassroomLayout";

function ClassroomRootLayout({ children }: { children: React.ReactNode }) {
  return <ClassroomLayout>{children}</ClassroomLayout>;
}

export default ClassroomRootLayout;
