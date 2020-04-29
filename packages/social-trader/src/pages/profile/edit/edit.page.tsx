import ProfileContainer from "components/profile/components/profile/profile-container";
import ProfileLayout from "components/profile/profile-layout";
import * as React from "react";

const _ProfileEditPage: React.FC = () => (
  <ProfileLayout route="details">
    <ProfileContainer />
  </ProfileLayout>
);

const ProfileEditPage = React.memo(_ProfileEditPage);
export default ProfileEditPage;
