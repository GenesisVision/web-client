import ProfileLayout from "components/profile/profile-layout";
import { SOCIAL_LINKS } from "components/profile/profile.constants";
import * as React from "react";

import SocialLinksContainer from "./components/social-links.container";

const SocialLinksPage: React.FC = () => (
  <ProfileLayout route={SOCIAL_LINKS}>
    <SocialLinksContainer />
  </ProfileLayout>
);

export default SocialLinksPage;
