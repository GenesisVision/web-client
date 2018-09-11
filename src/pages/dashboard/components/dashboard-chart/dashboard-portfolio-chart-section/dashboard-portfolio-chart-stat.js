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
      <div className="dashboard-portfolio-chart-stat__statistic-item">
        <div className="dashboard-portfolio-chart-stat__statistic-heading">
          {/* {t("wallet.available")} */}
          Value
        </div>
        <div className="dashboard-portfolio-chart-stat__statistic-value">
          <NumberFormat
            value={value}
            thousandSeparator={" "}
            displayType="text"
            suffix={" GVT"}
          />
        </div>
        <div className="dashboard-portfolio-chart-stat__statistic-equivalent">
          <NumberFormat
            value={valueCurrency}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${currency}`}
          />
        </div>
      </div>
    </div>
  );
};

export default translate()(DashboardPortfolioChartStat);
