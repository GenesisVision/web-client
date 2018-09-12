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
      />
      <StatisticItem
        heading={"Change"}
        value={changeValue}
        equivalent={changeValueCurrency}
        currency={currency}
      />
    </div>
  );
};

export default translate()(DashboardPortfolioChartStat);
