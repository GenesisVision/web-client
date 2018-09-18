import StatisticItem from "components/statistic-item/statistic-item";
import React from "react";
import { translate } from "react-i18next";

const DashboardPortfolioChartStat = ({
  t,
  currency,
  value,
  valueCurrency,
  changePercent,
  changeValue,
  changeValueCurrency
}) => {
  return (
    <div className="dashboard-portfolio-chart-stat">
      <StatisticItem
        heading={"Value"}
        value={value}
        equivalent={valueCurrency}
        currency={currency}
        className="dashboard-portfolio-chart-stat__statistic-item"
      />
      <StatisticItem
        heading={"Change"}
        value={changeValue}
        equivalent={changeValueCurrency}
        currency={currency}
        className="dashboard-portfolio-chart-stat__statistic-item"
      />
    </div>
  );
};

export default translate()(DashboardPortfolioChartStat);
