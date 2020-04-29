import PersonalDetailsContainer from "components/profile/components/personal-details/personal-details.container";
import ProfileLayout from "components/profile/profile-layout";
import React from "react";

import { PERSONAL_DETAILS } from "../profile.constants";

const PersonalDetailsPage: React.FC = React.memo(() => (
  <ProfileLayout route={PERSONAL_DETAILS}>
    <PersonalDetailsContainer />
  </ProfileLayout>
));

export default PersonalDetailsPage;
