import NumberFormat from "react-number-format";
import React from "react";

import "./dashboard-statistic.css";

const DashboardStatistic = ({
  hasPrograms,
  profitFromPrograms,
  investedAmount
}) => {
  if (!hasPrograms) return null;
  return (
    <div className="dashboard-statistic">
      <div className="dashboard-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={profitFromPrograms}
              // decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">GVT</div>
          </div>
          <div className="metric__description">Profit</div>
        </div>
      </div>
      <div className="dashboard-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={investedAmount}
              // decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">GVT</div>
          </div>
          <div className="metric__description">Invested</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatistic;
