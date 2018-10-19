import Profitability from "components/profitability/profitability";
import StatisticItem from "components/statistic-item/statistic-item";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

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
        adornment={
          <Profitability
            prefix="arrow"
            variant="chips"
            value={changePercent && changePercent.toFixed(2)}
            className="dashboard-portfolio-chart-stat__adornment"
          >
            <NumberFormat
              value={Number(Math.abs(changePercent).toFixed(2))}
              suffix="%"
              allowNegative={false}
              decimalScale={2}
              displayType="text"
            />
          </Profitability>
        }
        equivalent={changeValueCurrency}
        currency={currency}
        className="dashboard-portfolio-chart-stat__statistic-item"
      />
    </div>
  );
};

export default translate()(DashboardPortfolioChartStat);
