import React from "react";
import DSFund from "./ds-fund/ds-fund";
import DSProfit from "./ds-profit/ds-profit";
import DSPeriodEnd from "./ds-period-end/ds-period-end";
import DSInvestors from "./ds-investors/ds-investors";

import "./dashboard-statistic.css";

const DashboardStatistic = ({ dashboard }) => {
  return (
    <div className="dashboard-statistic">
      <div className="dashboard-card card">
        <DSFund funds={dashboard.programBalances} />
      </div>
      <div className="dashboard-card card">
        <DSInvestors
          investorsCount={dashboard.investorsCount}
          investorsFund={dashboard.investorsFund}
        />
      </div>
      {dashboard.endOfNextPeriod && (
        <div className="dashboard-card card">
          <DSPeriodEnd periodEnd={dashboard.endOfNextPeriod} />
        </div>
      )}
      <div className="dashboard-card card">
        <DSProfit profit={dashboard.totalProfit} />
      </div>
    </div>
  );
};

export default DashboardStatistic;
