import dynamic from "next/dynamic";

const SignInModule = dynamic(
  () => import("@/components/modules/SignInModule"),
  { ssr: false },
);

const SignInPage = () => {
  return <SignInModule />;
};
export default SignInPage;
