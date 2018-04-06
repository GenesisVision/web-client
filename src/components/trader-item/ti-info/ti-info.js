import { Link } from "react-router-dom";
import React from "react";

import DaysLeftWidget from "../../days-left-widget/days-left-widget";
import replaceParams from "../../../utils/replace-params";
import TokensWidget from "../../tokens-widget/tokens-widget";
import TraderAvatar from "../../trader-avatar/trader-avatar";

import "./ti-info.css";
import { TRADER_ROUTE } from "../../../modules/trader/trader.constants";

const TIInfo = ({ idx, trader }) => {
  const renderDaysLeft = () => {
    if (trader.isEnabled) {
      return (
        <DaysLeftWidget
          start={trader.startOfPeriod}
          duration={trader.periodDuration}
        />
      );
    }

    return <div>The program is not enabled</div>;
  };

  const renderTokens = () => {
    if (trader.isEnabled) {
      return (
        <TokensWidget
          invested={trader.freeTokens.investorsTokens}
          requested={trader.freeTokens.requestsTokens}
          total={trader.freeTokens.total}
        />
      );
    }

    return null;
  };

  const traderRoute = replaceParams(TRADER_ROUTE, {
    ":traderId": trader.id
  });
  return (
    <div className="ti-info">
      <div className="ti-info__order">{idx}</div>
      <Link className="ti-info__image" to={traderRoute}>
        <TraderAvatar imgUrl={trader.logo} level={trader.level} />
      </Link>
      <div className="ti-info__name ti-name">
        <Link className="ti-name__title" to={traderRoute}>
          {trader.title}
        </Link>
        <div className="ti-name__description">{trader.description}</div>
        <div className="ti-name__eop">{renderDaysLeft()}</div>
        <div className="ti-name__eop">{renderTokens()}</div>
      </div>
    </div>
  );
};

export default TIInfo;
