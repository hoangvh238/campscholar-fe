import dynamic from "next/dynamic";

const GenerateResetPasswordTokenModule = dynamic(
  () => import("@/components/modules/GenerateResetPasswordTokenModule"),
  { ssr: false },
);
function GenerateResetPasswordTokenPage() {
  return <GenerateResetPasswordTokenModule />;
}

export default GenerateResetPasswordTokenPage;
