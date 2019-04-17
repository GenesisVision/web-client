import "./dashboard-portfolio-event-logo.scss";

import * as React from "react";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import { ASSET } from "shared/constants/constants";
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
import {
  composeFundsDetailsUrl,
  composeProgramDetailsUrl
} from "shared/utils/compose-url";

import { EVENT_LOGO_TYPE } from "./dashboard-portfolio-event-logo.helper";

export const EvenLogoIcon: React.FC<{ type: EVENT_LOGO_TYPE }> = ({ type }) => {
  switch (type) {
    case EVENT_LOGO_TYPE.PROFIT:
      return <img src={EventProfitIconGreen} alt="profit" />;
    case EVENT_LOGO_TYPE.LOSS:
      return <img src={EventLossIconRed} alt="loss" />;
    case EVENT_LOGO_TYPE.REINVEST:
      return <img src={EventReinvestIcon} alt="reinvest" />;
    case EVENT_LOGO_TYPE.ENDED:
      return <img src={EventEndedIcon} alt="ended" />;
    case EVENT_LOGO_TYPE.ENDED_RED:
      return <img src={EventEndedRedIcon} alt="ended" />;
    case EVENT_LOGO_TYPE.WITHDRAW:
      return <img src={EventWithdrawIcon} alt="withdraw" />;
    case EVENT_LOGO_TYPE.INVEST:
      return <img src={EventInvestIcon} alt="invest" />;
    case EVENT_LOGO_TYPE.CANCELLED:
      return <img src={EventCancelledIcon} alt="cancelled" />;
    case EVENT_LOGO_TYPE.CANCELLED_RED:
      return <img src={EventCancelledIconRed} alt="cancelled" />;
    case EVENT_LOGO_TYPE.STARTED:
      return <img src={EventStartedIcon} alt="started" />;
    case EVENT_LOGO_TYPE.ASSET_STARTED:
      return <img src={EventAssetStarted} alt="Asset Started" />;
    case EVENT_LOGO_TYPE.ASSET_FINISHED:
      return <img src={EventAssetFinished} alt="Asset Finished" />;
    case EVENT_LOGO_TYPE.PROGRAM_PREIOD_STARTS:
      return <img src={EventPeriodStarts} alt="Period Starts" />;
    case EVENT_LOGO_TYPE.PROGRAM_PREIOD_ENDS:
      return <img src={EventPeriodEnds} alt="Period ends" />;
    case EVENT_LOGO_TYPE.INVESTOR_INVEST:
    case EVENT_LOGO_TYPE.MANAGER_INVEST:
      return <img src={EventInvestIcon} alt="Invest" />;
    case EVENT_LOGO_TYPE.INVESTOR_WITHDRAW:
    case EVENT_LOGO_TYPE.MANAGER_WITHDRAW:
      return <img src={EventWithdrawIcon} alt="withdraw" />;
    default:
      return null;
  }
};

const PortfolioEventLogo: React.FC<Props> = ({
  type,
  logo,
  color,
  url = undefined,
  assetType = undefined
}) => {
  const to = {
    pathname:
      assetType === ASSET.PROGRAM
        ? composeProgramDetailsUrl(url || "")
        : composeFundsDetailsUrl(url || ""),
    state: `/ ${type}`
  };
  return (
    <div className="portfolio-event-logo">
      {(url && (
        <Link to={to} className="portfolio-event-logo__photo">
          <AssetAvatar
            url={logo}
            alt={type}
            className="portfolio-event-logo__logo"
            color={color}
          />
        </Link>
      )) || (
        <div className="portfolio-event-logo__photo">
          <AssetAvatar
            url={logo}
            alt={type}
            className="portfolio-event-logo__logo"
            color={color}
          />
        </div>
      )}
      <div className={"portfolio-event-logo__type"}>
        <EvenLogoIcon type={type} />
      </div>
    </div>
  );
};

interface Props {
  type: EVENT_LOGO_TYPE;
  logo: string;
  color: string;
  url?: string;
  assetType?: ASSET;
}

export default React.memo(PortfolioEventLogo);
