import * as React from "react";
import ProfileLayout from "shared/components/profile/profile-layout";
import ProfileContainer from "shared/modules/profile/profile-container";

import { PROFILE } from "../profile.constants";

const ProfilePage: React.FC = React.memo(() => (
  <ProfileLayout route={PROFILE}>
    <ProfileContainer />
  </ProfileLayout>
));

export default ProfilePage;
