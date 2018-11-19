import React from "react";
import ProfileLayout from "shared/components/profile/profile-layout";
import ProfileContainer from "shared/modules/profile/profile-container";
import ProfileForm from "shared/modules/profile/profile-form";

import NavigationBackButton from "../../../modules/navigation-back-button/navigation-back-button";

const ProfileEditPage = () => {
  return (
    <ProfileLayout route="details">
      <NavigationBackButton />
      <ProfileContainer>
        <ProfileForm />
      </ProfileContainer>
    </ProfileLayout>
  );
};

export default ProfileEditPage;
