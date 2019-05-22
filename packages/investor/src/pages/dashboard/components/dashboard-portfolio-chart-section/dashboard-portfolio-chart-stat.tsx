import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "shared/components/profitability/profitability.helper";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const Change: React.FC<IChangeProps> = React.memo(
  ({ changeValue, changePercent }) => (
    <>
      <NumberFormat
        value={formatCurrencyValue(changeValue, "GVT")}
        thousandSeparator={" "}
        displayType="text"
        suffix={" GVT"}
      />
      <Profitability
        condition={!!changePercent}
        prefix={PROFITABILITY_PREFIX.ARROW}
        variant={PROFITABILITY_VARIANT.CHIPS}
        value={changePercent ? formatValue(changePercent, 2) : ""}
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
    </>
  )
);

interface IChangeProps {
  changeValue: number;
  changePercent: number;
}

const _DashboardPortfolioChartStat: React.FC<
  IDashboardPortfolioChartStatProps
> = ({
  t,
  currency,
  value,
  valueCurrency,
  changePercent,
  changeValue,
  changeValueCurrency
}) => (
  <div className="dashboard-portfolio-chart-stat">
    <StatisticItem
      big
      accent
      label={t("investor.dashboard-page.chart-section.stats.value")}
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
      label={t("investor.dashboard-page.chart-section.stats.change")}
      equivalent={formatCurrencyValue(changeValueCurrency, currency)}
      equivalentCurrency={currency}
      big
    >
      <Change changeValue={changeValue} changePercent={changePercent} />
    </StatisticItem>
  </div>
);

interface IDashboardPortfolioChartStatProps extends InjectedTranslateProps {
  currency: CurrencyEnum;
  value: number;
  valueCurrency: number;
  changePercent: number;
  changeValue: number;
  changeValueCurrency: number;
}

const DashboardPortfolioChartStat = React.memo(
  translate()(_DashboardPortfolioChartStat)
);
export default DashboardPortfolioChartStat;
