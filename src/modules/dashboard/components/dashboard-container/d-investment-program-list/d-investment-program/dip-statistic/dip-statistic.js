import { Link } from "react-router-dom";
import React from "react";

import replaceParams from "../../../../../../../utils/replace-params";

import {
  DASHBOARD_ROUTE,
  DASHBOARD_DEPOSIT_ROUTE,
  DASHBOARD_WITHDRAW_ROUTE
} from "../../../../../dashboard.constants";

const DIPStatistic = ({ program }) => {
  const buttons = () => {
    return (
      <div className="col-2">
        {program.isInvestEnable ? (
          <Link
            to={{
              pathname: traderDepositUrl,
              state: { from: DASHBOARD_ROUTE }
            }}
            className="btn btn-outline-primary"
          >
            Buy tokens
          </Link>
        ) : (
          <span>Can not invest</span>
        )}
        {program.isWithdrawEnable ? (
          <Link
            to={{
              pathname: traderWithdrawUrl,
              state: { from: DASHBOARD_ROUTE }
            }}
            className="btn btn-outline-secondary mt-4"
          >
            Sell tokens
          </Link>
        ) : (
          <span>Can not withdraw</span>
        )}
      </div>
    );
  };
  const traderDepositUrl = replaceParams(DASHBOARD_DEPOSIT_ROUTE, {
    ":traderId": program.id
  });
  const traderWithdrawUrl = replaceParams(DASHBOARD_WITHDRAW_ROUTE, {
    ":traderId": program.id
  });
  return (
    <div className="row">
      <div className="col-4">
        <p>Invested: {program.investedTokens} GVT</p>
        <p>EOP: {/*program.endOfPeriod*/}</p>
        <p>Last Period Prfit: {program.profitForLastPeriod} GVT</p>
      </div>
      <div className="col-3">
        <p>Total profit: {program.profitTotal} GVT</p>
        <p>Avg profit: {program.profitAvg} GVT</p>
        <p>Balance: {program.balance} GVT</p>
      </div>
      <div className="col-3">
        <p>Avaible Investments: {program.availableInvestment} GVT</p>
        <p>Trades: {program.tradesCount}</p>
        <p>Investors: {program.investorsCount}</p>
      </div>
      {buttons()}
    </div>
  );
};

export default DIPStatistic;
