import dynamic from "next/dynamic";

const ProfileModule = dynamic(
  () => import("@/components/modules/ProfileModule"),
  { ssr: false },
);
function Profile() {
  return <ProfileModule />;
}

export default Profile;
