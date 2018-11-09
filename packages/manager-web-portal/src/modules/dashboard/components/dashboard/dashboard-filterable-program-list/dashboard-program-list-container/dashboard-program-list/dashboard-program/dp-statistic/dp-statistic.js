import NumberFormat from "react-number-format";
import React from "react";

import DaysLeftWidget from "../../../../../../../../../components/days-left-widget/days-left-widget";

import "./dp-statistic.css";

const DPStatistic = ({ program }) => {
  return (
    <div className="dp-statistic">
      <div className="dp-statistic__value">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={program.profitCurrent}
              decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">{program.currency}</div>
          </div>
          <div className="metric__description">Current Profit</div>
        </div>
      </div>
      <div className="dp-statistic__value">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={program.balance}
              decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">{program.currency}</div>
          </div>
          <div className="metric__description">Balance</div>
        </div>
      </div>
      <div className="dp-statistic__value">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={program.profitTotalGvt}
              decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">GVT</div>
          </div>
          <div className="metric__description">Total Profit</div>
        </div>
      </div>
      <div className="dp-statistic__value">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat value={program.tradesCount} displayType="text" />
          </div>
          <div className="metric__description">Trades</div>
        </div>
      </div>
      <div className="dp-statistic__value">
        <div className="metric">
          {program.isEnabled && (
            <div className="metric__value dp-statistic__days-left">
              <DaysLeftWidget
                start={program.startOfPeriod}
                duration={program.periodDuration}
                className="days-left-widget--column"
              />
            </div>
          )}
          {!program.isEnabled && (
            <div className="metric__description">
              The program is not enabled
            </div>
          )}
        </div>
      </div>
      <div className="dp-statistic__value">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat value={program.investorsCount} displayType="text" />
          </div>
          <div className="metric__description">Investors</div>
        </div>
      </div>
    </div>
  );
};

export default DPStatistic;
