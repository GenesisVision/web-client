import React from "react";
import ProfileLayout from "shared/components/profile/profile-layout";
import Profile from "shared/modules/profile/profile";
import ProfileContainer from "shared/modules/profile/profile-container";

const ProfilePage = ({ personal }) => {
  return (
    <ProfileLayout route="details">
      <ProfileContainer>
        <Profile personal={personal} />
      </ProfileContainer>
    </ProfileLayout>
  );
};

export default ProfilePage;
