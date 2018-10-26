import "./dashboard-portfolio-event-logo.scss";

import classnames from "classnames";
import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import React from "react";
import EventCancelledIcon from "shared/media/event-cancelled.svg";
import EventEndedIcon from "shared/media/event-ended.svg";
import EventInvestIcon from "shared/media/event-invest.svg";
import EventLossIcon from "shared/media/event-loss.svg";
import EventProfitIcon from "shared/media/event-profit.svg";
import EventReinvestIcon from "shared/media/event-reinvest.svg";
import EventWithdrawIcon from "shared/media/event-withdraw.svg";

import { EventLogoType } from "./dashboard-portfolio-event-logo.helper";

const EvenLogoIcon = ({ type }) => {
  if (type === EventLogoType.profit)
    return <img src={EventProfitIcon} alt="profit" />;
  if (type === EventLogoType.loss)
    return <img src={EventLossIcon} alt="loss" />;
  if (type === EventLogoType.reinvest)
    return <img src={EventReinvestIcon} alt="reinvest" />;
  if (type === EventLogoType.ended)
    return <img src={EventEndedIcon} alt="ended" />;
  if (type === EventLogoType.withdraw)
    return <img src={EventWithdrawIcon} alt="withdraw" />;
  if (type === EventLogoType.invest)
    return <img src={EventInvestIcon} alt="invest" />;
  if (type === EventLogoType.cancelled)
    return <img src={EventCancelledIcon} alt="cancelled" />;
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
