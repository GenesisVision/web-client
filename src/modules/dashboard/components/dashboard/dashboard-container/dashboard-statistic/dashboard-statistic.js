import React from "react";
import "./dashboard-statistic.css";

const DashboardStatistic = ({ profitFromPrograms, investedAmount }) => {
  return (
    <div className="dashboard-statistic">
      <div className="dashboard-statistic__cell">
        <div className="metric">
          <div className="metric__value">{+profitFromPrograms.toFixed(2)}</div>
          <div className="metric__description">Profit GVT</div>
        </div>
      </div>
      <div className="dashboard-statistic__cell">
        <div className="metric">
          <div className="metric__value">{investedAmount}</div>
          <div className="metric__description">Invested GVT</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatistic;
