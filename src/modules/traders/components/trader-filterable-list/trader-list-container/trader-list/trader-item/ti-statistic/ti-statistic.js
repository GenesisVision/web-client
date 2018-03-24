import NumberFormat from "react-number-format";
import React from "react";

import "./ti-statisctic.css";

const TIStatistic = ({ trader }) => {
  return (
    <div className="ti-statistic">
      <div className="tis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.profitAvgPercent}
              suffix=" %"
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">Avg Profit</div>
        </div>
      </div>
      <div className="tis-item">
        <div className="metric">
          <div className="metric__value">{trader.currency}</div>
          <div className="metric__description">Currency</div>
        </div>
      </div>
      <div className="tis-item">
        <div className="metric">
          <div className="metric__value">{trader.tradesCount}</div>
          <div className="metric__description">Trades</div>
        </div>
      </div>
      <div className="tis-item">
        <div className="metric">
          <div className="metric__value">{trader.investorsCount}</div>
          <div className="metric__description">Investors</div>
        </div>
      </div>
      <div className="tis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.balance}
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">Balance</div>
        </div>
      </div>
      <div className="tis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.profitTotal}
              decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">{trader.currency}</div>
          </div>
          <div className="metric__description">Total Profit</div>
        </div>
      </div>
    </div>
  );
};

export default TIStatistic;
