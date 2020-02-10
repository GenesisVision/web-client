import "./social-container.scss";

import IconList from "pages/landing-page/components/icon-list/icon-list";
import { socialLinks } from "pages/landing-page/static-data/social-links";
import React from "react";

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
