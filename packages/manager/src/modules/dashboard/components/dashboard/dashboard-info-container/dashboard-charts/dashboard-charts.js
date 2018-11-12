import React from "react";
import DashboardFundChart from "./dashboard-fund-chart";
import DashboardProfitChart from "./dashboard-profit-chart";
import "./dashboard-charts.css";

const DashboardCharts = ({ fundChart, profitChart }) => {
  const fundChartData = fundChart.map(x => {
    let data = {
      title: x.title,
      managerFund: x.managerFund,
      investorFund: x.investorFund
    };
    if (x.profit >= 0) {
      data.profit = x.profit;
    } else {
      data.loss = x.profit;
    }
    return data;
  });
  return (
    <div className="dashboard-charts">
      <div className="dashboard-subheader">Analytics</div>
      <div className="dashboard-charts__charts">
        <div className="dashboard-charts__chart">
          <div className="dashboard-charts__chart-header">Fund</div>
          <DashboardFundChart data={fundChartData} />
        </div>
        <div className="dashboard-charts__chart">
          <div className="dashboard-charts__chart-header">Profit</div>
          <DashboardProfitChart data={profitChart} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
