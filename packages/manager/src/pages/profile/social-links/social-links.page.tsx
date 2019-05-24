import * as React from "react";
import ProfileLayout from "shared/components/profile/profile-layout";

import SocialLinks from "./components/social-links";

const SocialLinksPage: React.FC = () => (
  <ProfileLayout route="social-links">
    <SocialLinks />
  </ProfileLayout>
);

export default SocialLinksPage;
