import * as React from "react";
import ProfileLayout from "shared/components/profile/profile-layout";
import ProfileContainer from "shared/modules/profile/profile-container";

const ProfilePage: React.FC = React.memo(() => (
  <ProfileLayout route="details">
    <ProfileContainer />
  </ProfileLayout>
));

export default ProfilePage;
