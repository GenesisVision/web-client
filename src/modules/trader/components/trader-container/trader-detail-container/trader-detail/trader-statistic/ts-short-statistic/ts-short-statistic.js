import React from "react";
import NumberFormat from "react-number-format";
import "./ts-short-statistic.css";

const TSShortStatistic = ({ trader }) => {
  return (
    <div className="trader-statistic">
      <div className="trader-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.balance}
              // decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">{trader.currency}</div>
          </div>
          <div className="metric__description">Balance</div>
        </div>
      </div>
      <div className="trader-statistic__cell">
      <div className="metric">
        <div className="metric__value">
          <NumberFormat
            value={trader.ownBalance / trader.balance * 100}
            suffix="%"
            decimalScale={2}
            displayType="text"
          />
        </div>
        <div className="metric__description">Manager's Share</div>
      </div>
    </div>
      <div className="trader-statistic__cell">
        <div className="metric">
          <div className="metric__value">{trader.tradesCount}</div>
          <div className="metric__description">Trades</div>
        </div>
      </div>
      <div className="trader-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            {trader.periodDuration} <div className="metric__bubble">days</div>
          </div>
          <div className="metric__description">Period Duration</div>
        </div>
      </div>
      <div className="trader-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.feeManagement}
              suffix="%"
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">Management Fee</div>
        </div>
      </div>
      <div className="trader-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.feeSuccess}
              suffix="%"
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">Success Fee</div>
        </div>
      </div>
    </div>
  );
};

export default TSShortStatistic;
