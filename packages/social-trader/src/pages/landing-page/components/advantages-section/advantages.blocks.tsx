import "./advantages-section.scss";

import classNames from "classnames";
import AdvantagesList from "pages/landing-page/components/advantages-list/advantages-list";
import { JoinButton } from "pages/landing-page/components/join-button";
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
          lastItem={<JoinButton href={TRADE_ROUTE}>Join</JoinButton>}
        />
      </div>
    </div>
  );
};
