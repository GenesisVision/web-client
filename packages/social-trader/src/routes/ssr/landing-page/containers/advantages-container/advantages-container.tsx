import "./advantages-container.scss";

import React from "react";
import AdvantagesList from "routes/ssr/landing-page/components/advantages-list/advantages-list";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import TradersList from "routes/ssr/landing-page/components/traders/traders-list";
import { advantagesItems } from "routes/ssr/landing-page/static-data/advantages";

const AdvantagesContainer: React.FC = () => (
  <div className="advantages-container">
    <h2 className="advantages-container__title">Our advantages</h2>
    <AdvantagesList
      advantagesItems={advantagesItems}
      className="advantages-container__list"
    />
  </div>
);

export default AdvantagesContainer;
