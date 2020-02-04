import ProfileLayout from "components/profile/profile-layout";
import ProfileContainer from "modules/profile/profile-container";
import React from "react";

import { PROFILE } from "../profile.constants";

const ProfilePage: React.FC = React.memo(() => (
  <ProfileLayout route={PROFILE}>
    <ProfileContainer />
  </ProfileLayout>
));

export default ProfilePage;
