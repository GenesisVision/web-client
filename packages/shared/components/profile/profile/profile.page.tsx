import React from "react";
import ProfileLayout from "shared/components/profile/profile-layout";
import ProfileContainer from "shared/modules/profile/profile-container";

const _ProfilePage: React.FC = () => (
  <ProfileLayout route="details">
    <ProfileContainer />
  </ProfileLayout>
);

const ProfilePage = React.memo(_ProfilePage);
export default ProfilePage;
