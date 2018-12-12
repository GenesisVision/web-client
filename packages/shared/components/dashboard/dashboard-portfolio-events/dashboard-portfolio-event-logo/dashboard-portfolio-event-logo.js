import "./dashboard-portfolio-event-logo.scss";

import classnames from "classnames";
import React from "react";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import EventCancelledIconRed from "shared/media/event-cancelled-red.svg";
import EventCancelledIcon from "shared/media/event-cancelled.svg";
import EventEndedRedIcon from "shared/media/event-ended-red.svg";
import EventEndedIcon from "shared/media/event-ended.svg";
import EventInvestIcon from "shared/media/event-invest.svg";
import EventLossIconRed from "shared/media/event-loss-red.svg";
import EventAssetFinished from "shared/media/event-manager-asset-finished.svg";
import EventAssetStarted from "shared/media/event-manager-asset-started.svg";
import EventPeriodEnds from "shared/media/event-manager-period-end.svg";
import EventPeriodStarts from "shared/media/event-manager-period-start.svg";
import EventProfitIconGreen from "shared/media/event-profit-green.svg";
import EventReinvestIcon from "shared/media/event-reinvest.svg";
import EventStartedIcon from "shared/media/event-started.svg";
import EventWithdrawIcon from "shared/media/event-withdraw.svg";

import { EventLogoType } from "./dashboard-portfolio-event-logo.helper";

export const EvenLogoIcon = ({ type }) => {
  switch (type) {
    case EventLogoType.profit:
      return <img src={EventProfitIconGreen} alt="profit" />;
    case EventLogoType.loss:
      return <img src={EventLossIconRed} alt="loss" />;
    case EventLogoType.reinvest:
      return <img src={EventReinvestIcon} alt="reinvest" />;
    case EventLogoType.ended:
      return <img src={EventEndedIcon} alt="ended" />;
    case EventLogoType.endedRed:
      return <img src={EventEndedRedIcon} alt="ended" />;
    case EventLogoType.withdraw:
      return <img src={EventWithdrawIcon} alt="withdraw" />;
    case EventLogoType.invest:
      return <img src={EventInvestIcon} alt="invest" />;
    case EventLogoType.cancelled:
      return <img src={EventCancelledIcon} alt="cancelled" />;
    case EventLogoType.cancelledRed:
      return <img src={EventCancelledIconRed} alt="cancelled" />;
    case EventLogoType.started:
      return <img src={EventStartedIcon} alt="started" />;
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
