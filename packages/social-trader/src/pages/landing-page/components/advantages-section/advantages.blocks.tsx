import "./advantages-section.scss";

import classNames from "classnames";
import AdvantagesList from "pages/landing-page/components/advantages-list/advantages-list";
import LPButton from "pages/landing-page/components/lp-button/lp-button";
import { advantagesItems } from "pages/landing-page/static-data/advantages";
import React from "react";
import { TRADE_ROUTE } from "routes/trade.routes";

export const AdvantagesListContainer: React.FC<{
  animation?: boolean;
}> = ({ animation }) => {
  return (
    <div className="home__container">
      <div className="advantages-section">
        <h2 className="advantages-section__title">Our advantages</h2>
        <AdvantagesList
          advantagesItems={advantagesItems}
          className={classNames("advantages-section__list", {
            "advantages-section__list--animation": animation
          })}
          lastItem={<LPButton href={TRADE_ROUTE}>Join</LPButton>}
        />
      </div>
    </div>
  );
};
