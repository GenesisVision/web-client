import * as React from "react";
import ProfileLayout from "shared/components/profile/profile-layout";
import ProfileContainer from "shared/modules/profile/profile-container";

const ProfilePage: React.FC<{ personal?: boolean }> = React.memo(
  ({ personal }) => (
    <ProfileLayout route="details">
      <ProfileContainer personal={personal} />
    </ProfileLayout>
  )
);

export default ProfilePage;
