import NumberFormat from "react-number-format";
import React from "react";

import "./ti-statisctic.css";

const TIStatistic = ({ trader }) => {
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
            prefix="$"
          />
        </div>
        <div className="tis-item__label">Total Profit</div>
      </div>
    </div>
  );
};

export default TIStatistic;
