import ProfileContainer from "shared/modules/profile/profile-container";
import ProfileForm from "modules/profile/profile-form";
import React from "react";

import NavigationBackButton from "../../../modules/navigation-back-button/navigation-back-button";
import ProfileLayout from "shared/components/profile/profile-layout";

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
