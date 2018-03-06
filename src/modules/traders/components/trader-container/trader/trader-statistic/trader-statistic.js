import React from "react";

import replaceParams from "../../../../../../utils/replace-params";
import TSCards from "./ts-cards/ts-cards";

import {
  TRADER_DEPOSIT_ROUTE,
  TRADER_WITHDRAW_ROUTE,
  TRADER_ROUTE
} from "../../../../traders.constants";
import { Link } from "react-router-dom";

const TraderStatistic = ({ trader }) => {
  const traderDepositUrl = replaceParams(TRADER_DEPOSIT_ROUTE, {
    ":traderId": trader.id
  });
  const traderWithdrawUrl = replaceParams(TRADER_WITHDRAW_ROUTE, {
    ":traderId": trader.id
  });
  const traderUrl = replaceParams(TRADER_ROUTE, {
    ":traderId": trader.id
  });
  const buttons = () => {
    return (
      <div className="col-1">
        {trader.isInvestEnable ? (
          <Link
            to={{
              pathname: traderDepositUrl,
              state: { from: traderUrl }
            }}
            className="btn btn-outline-primary"
          >
            Buy tokens
          </Link>
        ) : (
          <div>Can not invest</div>
        )}
        {trader.isWithdrawEnable ? (
          <Link
            to={{
              pathname: traderWithdrawUrl,
              state: { from: traderUrl }
            }}
            className="btn btn-outline-secondary mt-4"
          >
            Sell tokens
          </Link>
        ) : (
          <div>Can not withdraw</div>
        )}
      </div>
    );
  };
  return (
    <div>
      <TSCards
        totalProfit={trader.profitTotal}
        avgProfit={trader.profitAvg}
        investors={trader.investorsCount}
      />
      <div className="row mt-4">
        <div className="col-md-4">
          <p>Base Currency: {trader.currency}</p>
          <p>Balance: {trader.balance}</p>
          <p>Own Funds: {trader.ownFunds}</p>
          <p>Trades: {trader.tradesCount}</p>
        </div>
        <div className="col-md-4">
          <p>Period Duration: {trader.periodDuration}</p>
          <p>Management Fee: {trader.feeManagement} %</p>
          <p>Success Fee: {trader.feeSuccess} %</p>
        </div>
        {buttons()}
      </div>
    </div>
  );
};

export default TraderStatistic;
