import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import React from "react";

import replaceParams from "../../../../../../../../utils/replace-params";

import "./ti-statisctic.css";

import {
  TRADERS_ROUTE,
  TRADER_DEPOSIT_ROUTE,
  TRADER_WITHDRAW_ROUTE
} from "../../../../../../traders.constants";

const TIStatistic = ({ trader }) => {
  const traderDepositUrl = replaceParams(TRADER_DEPOSIT_ROUTE, {
    ":traderId": trader.id
  });
  const traderWithdrawUrl = replaceParams(TRADER_WITHDRAW_ROUTE, {
    ":traderId": trader.id
  });
  return (
    <div className="ti-statistic">
      <div className="tis-item">
        <div className="tis-item__value">
          <NumberFormat
            value={trader.profitAvg}
            suffix=" %"
            decimalScale={2}
            displayType="text"
          />
        </div>
        <div className="tis-item__label">Avg Profit</div>
      </div>
      <div className="tis-item">
        <div className="tis-item__value">{trader.currency}</div>
        <div className="tis-item__label">currency</div>
      </div>
      <div className="tis-item">
        <div className="tis-item__value">{trader.tradesCount}</div>
        <div className="tis-item__label">Trades</div>
      </div>
      <div className="tis-item">
        <div className="tis-item__value">{trader.investorsCount}</div>
        <div className="tis-item__label">Investors</div>
      </div>
      <div className="tis-item">
        <div className="tis-item__value">
          <NumberFormat
            value={trader.balance}
            decimalScale={2}
            displayType="text"
          />
        </div>
        <div className="tis-item__label">Balance</div>
      </div>
      <div className="tis-item">
        <div className="tis-item__value">
          <NumberFormat
            value={trader.profitTotal}
            decimalScale={2}
            displayType="text"
          />
        </div>
        <div className="tis-item__label">Total Profit</div>
      </div>
    </div>
  );
};

export default TIStatistic;
