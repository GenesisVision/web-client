import * as React from "react";
import ProfileLayout from "shared/components/profile/profile-layout";

import SocialLinksContainer from "./components/social-links.container";

const SocialLinksPage: React.FC = () => (
  <ProfileLayout route="social-links">
    <SocialLinksContainer />
  </ProfileLayout>
);

export default SocialLinksPage;
