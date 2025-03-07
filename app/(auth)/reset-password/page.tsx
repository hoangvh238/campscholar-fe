import dynamic from "next/dynamic";

const ResetPasswordModule = dynamic(
  () => import("@/components/modules/ResetPasswordModule"),
  { ssr: false },
);
function ResetPasswordPage() {
  return <ResetPasswordModule />;
}

export default ResetPasswordPage;
