import Profitability from "components/profitability/profitability";
import StatisticItem from "components/statistic-item/statistic-item";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatValue } from "../../../../../utils/formatter";

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
        value={formatValue(value)}
        equivalent={valueCurrency}
        currency={currency}
        className="dashboard-portfolio-chart-stat__statistic-item"
      />
      <StatisticItem
        heading={"Change"}
        value={formatValue(changeValue)}
        adornment={
          <Profitability
            prefix="arrow"
            variant="chips"
            value={changePercent && formatValue(changePercent, 2)}
            className="dashboard-portfolio-chart-stat__adornment"
          >
            <NumberFormat
              value={formatValue(changePercent, 2, true)}
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
