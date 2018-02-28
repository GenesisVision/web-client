import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import React from "react";

import replaceParams from "../../../../../../../utils/replace-params";

import {
  TRADERS_DEPOSIT_ROUTE,
  TRADERS_WITHDRAW_ROUTE,
  TRADERS_ROUTE
} from "../../../../../traders.constants";

const TIStatistic = ({ trader }) => {
  const traderDepositUrl = replaceParams(TRADERS_DEPOSIT_ROUTE, {
    ":traderId": trader.id
  });
  const traderWithdrawUrl = replaceParams(TRADERS_WITHDRAW_ROUTE, {
    ":traderId": trader.id
  });
  return (
    <div className="row">
      <div className="col-4">
        <p>Balance: {trader.balance} GVT</p>
        <p>Trades: {trader.tradesCount}</p>
        <p>Investors: {trader.investorsCount}</p>
        <p>Total Profit: {trader.profitTotal} GVT</p>
        <p>Avg Profit: {trader.profitAvg} %</p>
      </div>
      <div className="col-6">
        <p>Period Duration: {trader.periodDuration}</p>
        <p>EOP: {/*trader.endOfPeriod*/}</p>
        <p>Fee Success: {trader.feeSuccess}</p>
        <p>Fee Management: {trader.feeManagement}</p>
      </div>
      <div className="col-2">
        <Link
          to={{
            pathname: traderDepositUrl,
            state: { from: TRADERS_ROUTE }
          }}
          className="btn btn-outline-primary"
        >
          Buy tokens
        </Link>
        <Link
          to={{
            pathname: traderWithdrawUrl,
            state: { from: TRADERS_ROUTE }
          }}
          className="btn btn-outline-secondary mt-4"
        >
          Sell tokens
        </Link>
      </div>
    </div>
  );
};

export default TIStatistic;
