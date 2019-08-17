import * as React from "react";
import ProfileLayout from "shared/components/profile/profile-layout";
import { SOCIAL_LINKS } from "shared/components/profile/profile.constants";

import SocialLinksContainer from "./components/social-links.container";

const SocialLinksPage: React.FC = () => (
  <ProfileLayout route={SOCIAL_LINKS}>
    <SocialLinksContainer />
  </ProfileLayout>
);

export default SocialLinksPage;
