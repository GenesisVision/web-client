import Profile from "modules/profile/profile";
import ProfileContainer from "shared/modules/profile/profile-container";
import React from "react";

import ProfileLayout from "shared/components/profile/profile-layout";

const ProfilePage = () => {
  return (
    <ProfileLayout route="details">
      <ProfileContainer>
        <Profile />
      </ProfileContainer>
    </ProfileLayout>
  );
};

export default ProfilePage;
