import "./social-container.scss";

import React from "react";
import IconList from "routes/ssr/landing-page/components/icon-list/icon-list";
import { socialLinks } from "routes/ssr/landing-page/static-data/social-links";

const SocialContainer: React.FC = () => (
  <div className="social-container">
    <div className="social-container__item">
      <h2 className="social-container__title">
        Join the Genesis Vision
        <br /> Community
      </h2>
      <IconList items={socialLinks} className="social-container__list" />
    </div>
  </div>
);

export default SocialContainer;
