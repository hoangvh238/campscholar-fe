import dynamic from "next/dynamic";

const PracticeModule = dynamic(
  () => import("@/components/modules/PracticeAreaModule"),
  { ssr: false },
);
export default function Page() {
  return <PracticeModule />;
}
