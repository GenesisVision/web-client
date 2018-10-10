import "./dashboard-portfolio-event-logo.scss";

import classnames from "classnames";
import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import { WalletIcon } from "components/icon/wallet-icon";
import React from "react";

import icons from "./icons";

export const logoTypes = {
  PROFIT: "PROFIT",
  LOSE: "LOSE",
  REINVEST: "REINVEST"
};

const getTypeSVG = type => {
  switch (type) {
    case logoTypes.PROFIT:
      return icons.EventProfitIcon;
    case logoTypes.LOSE:
      return icons.EventLoseIcon;
    case logoTypes.REINVEST:
      return icons.EventReinvestIcon;
    default:
      return null;
  }
};

const getLogoSVG = (type, logo) => {
  if (logo !== undefined)
    return (
      <AssetAvatar
        url={logo}
        alt={type}
        className="portfolio-event-logo__logo"
      />
    );
  return <WalletIcon className="portfolio-event-logo__wallet" />;
};

const PortfolioEventLogo = ({ isPositive, type, logo }) => {
  const className = classnames("portfolio-event-logo", {
    "portfolio-event-logo--positive": isPositive,
    "portfolio-event-logo--negative": !isPositive
  });

  const TypeSVG = getTypeSVG(type);

  return (
    <div className={className}>
      <div className="portfolio-event-logo__photo">
        {getLogoSVG(type, logo)}
      </div>
      <div className={"portfolio-event-logo__type"}>
        <TypeSVG />
      </div>
    </div>
  );
};

export default PortfolioEventLogo;
