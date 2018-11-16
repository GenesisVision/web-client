import Profile from "shared/modules/profile/profile";
import ProfileContainer from "shared/modules/profile/profile-container";
import ProfileLayout from "shared/components/profile/profile-layout";
import React from "react";

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
