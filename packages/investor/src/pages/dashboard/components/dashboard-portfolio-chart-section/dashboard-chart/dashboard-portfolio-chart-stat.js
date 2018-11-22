import React, { Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

import { formatValue } from "shared/utils/formatter";
import DetailsStatisticItem from "shared/components/details-statistic-item/details-statistic-item";
import Profitability from "shared/components/profitability/profitability";

const DashboardPortfolioChartStat = ({
  t,
  currency,
  value,
  valueCurrency,
  changePercent,
  changeValue,
  changeValueCurrency
}) => {
  const renderValue = () => (
    <Fragment>
      <NumberFormat
        value={formatValue(value)}
        thousandSeparator={" "}
        displayType="text"
        suffix={" GVT"}
      />
    </Fragment>
  );

  const renderChange = () => (
    <Fragment>
      <NumberFormat
        value={formatValue(changeValue)}
        thousandSeparator={" "}
        displayType="text"
        suffix={" GVT"}
      />
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
    </Fragment>
  );

  return (
    <div className="dashboard-portfolio-chart-stat">
      <DetailsStatisticItem
        big
        accent
        label={"Value"}
        equivalent={formatValue(valueCurrency)}
        equivalentCurrency={currency}
      >
        {renderValue()}
      </DetailsStatisticItem>
      <DetailsStatisticItem
        label={"Change"}
        equivalent={formatValue(changeValueCurrency)}
        equivalentCurrency={currency}
        big
      >
        {renderChange()}
      </DetailsStatisticItem>
    </div>
  );
};

export default translate()(DashboardPortfolioChartStat);
