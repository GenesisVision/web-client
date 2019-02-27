import React, { Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

const DashboardPortfolioChartStat = ({
  t,
  currency,
  value,
  valueCurrency,
  changePercent,
  changeValue,
  changeValueCurrency
}) => {
  const renderChange = () => (
    <Fragment>
      <NumberFormat
        value={formatCurrencyValue(changeValue, "GVT")}
        thousandSeparator={" "}
        displayType="text"
        suffix={" GVT"}
      />
      {!!changePercent && (
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
      )}
    </Fragment>
  );

  return (
    <div className="dashboard-portfolio-chart-stat">
      <StatisticItem
        big
        accent
        label={"Value"}
        equivalent={formatCurrencyValue(valueCurrency, currency)}
        equivalentCurrency={currency}
      >
        <NumberFormat
          value={formatCurrencyValue(value, "GVT")}
          thousandSeparator={" "}
          displayType="text"
          suffix={" GVT"}
        />
      </StatisticItem>
      <StatisticItem
        label={"Change"}
        equivalent={formatCurrencyValue(changeValueCurrency, currency)}
        equivalentCurrency={currency}
        big
      >
        {renderChange()}
      </StatisticItem>
    </div>
  );
};

export default translate()(DashboardPortfolioChartStat);
