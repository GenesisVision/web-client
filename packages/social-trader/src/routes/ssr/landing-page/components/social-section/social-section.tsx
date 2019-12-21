import "./social-section.scss";

import * as React from "react";
import IconList from "routes/ssr/landing-page/components/icon-list/icon-list";
import { socialLinks } from "routes/ssr/landing-page/static-data/social-links";

const SocialSection: React.FC = () => (
  <div className="social-section">
    <div className="social-section__item">
      <h2 className="social-section__title">
        Join the Genesis Vision
        <br /> Community
      </h2>
      <IconList items={socialLinks} className="social-section__list" />
    </div>
  </div>
);

export default SocialSection;
