import "./dashboard-portfolio-event-logo.scss";

import classnames from "classnames";
import React from "react";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import EventWithdrawIcon from "shared/media/event-loss.svg";
import EventAssetFinished from "shared/media/event-manager-asset-finished.svg";
import EventAssetStarted from "shared/media/event-manager-asset-started.svg";
import EventPeriodEnds from "shared/media/event-manager-period-end.svg";
import EventPeriodStarts from "shared/media/event-manager-period-start.svg";
import EventInvestIcon from "shared/media/event-profit.svg";

import { EventLogoType } from "./dashboard-portfolio-event-logo.helper";

export const EvenLogoIcon = ({ type }) => {
  switch (type) {
    case EventLogoType.assetStarted:
      return <img src={EventAssetStarted} alt="Asset Started" />;
    case EventLogoType.assetFinished:
      return <img src={EventAssetFinished} alt="Asset Finished" />;
    case EventLogoType.programPeriodStars:
      return <img src={EventPeriodStarts} alt="Period Starts" />;
    case EventLogoType.programPeriodEnds:
      return <img src={EventPeriodEnds} alt="Period ends" />;
    case EventLogoType.investorInvest:
    case EventLogoType.managerInvest:
      return <img src={EventInvestIcon} alt="Invest" />;
    case EventLogoType.investorWithdraw:
    case EventLogoType.managerWithdraw:
      return <img src={EventWithdrawIcon} alt="withdraw" />;
    default:
      return null;
  }
};

const PortfolioEventLogo = ({ type, logo, color }) => {
  const className = classnames("portfolio-event-logo");

  return (
    <div className={className}>
      <div className="portfolio-event-logo__photo">
        <AssetAvatar
          url={logo}
          alt={type}
          className="portfolio-event-logo__logo"
          color={color}
        />
      </div>
      <div className={"portfolio-event-logo__type"}>
        <EvenLogoIcon type={type} />
      </div>
    </div>
  );
};

export default PortfolioEventLogo;
