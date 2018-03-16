import React from "react";
import "./ts-short-statistic.css";

const TSShortStatistic = ({ trader }) => {
  return (
    <div className="trader-statistic">
      <div className="trader-statistic__cell">
        <div className="metric">
          <div className="metric__value">{trader.balance}</div>
          <div className="metric__description">Balance</div>
        </div>
      </div>
      <div className="trader-statistic__cell">
        <div className="metric">
          <div className="metric__value">{trader.ownBalance}</div>
          <div className="metric__description">Own Balance</div>
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
          <div className="metric__value">{trader.periodDuration}</div>
          <div className="metric__description">Period Duration</div>
        </div>
      </div>
      <div className="trader-statistic__cell">
        <div className="metric">
          <div className="metric__value">{trader.feeManagement}</div>
          <div className="metric__description">Management Fee</div>
        </div>
      </div>
      <div className="trader-statistic__cell">
        <div className="metric">
          <div className="metric__value">{trader.feeSuccess}</div>
          <div className="metric__description">Success Fee</div>
        </div>
      </div>
    </div>
  );
};

export default TSShortStatistic;
