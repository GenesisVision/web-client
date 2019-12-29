import { DashboardChartValue } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import DashboardInRequestsContainer from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-in-requests-container";
import { inRequestsLoaderData } from "shared/components/dashboard/dashboard.loaders-data";
import Profitability from "shared/components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "shared/components/profitability/profitability.helper";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

import { dashboardInRequestsSelector } from "../../reducers/dashboard-in-requests.reducer";
import { cancelRequest } from "../../services/dashboard-in-requests.service";

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
> = ({ data: portfolioChartData, currency }) => {
  const [t] = useTranslation();
  const inRequests = useSelector(dashboardInRequestsSelector);
  return (
    <div className="dashboard-portfolio-chart-stat__block">
      <div className="dashboard-portfolio-chart-stat">
        <StatisticItem
          big
          accent
          label={t("investor.dashboard-page.chart-section.stats.value")}
          equivalent={
            +formatCurrencyValue(portfolioChartData.valueCurrency, currency)
          }
          equivalentCurrency={currency}
        >
          <NumberFormat
            value={formatCurrencyValue(portfolioChartData.value, "GVT")}
            thousandSeparator={" "}
            displayType="text"
            suffix={" GVT"}
          />
        </StatisticItem>
        <StatisticItem
          label={t("investor.dashboard-page.chart-section.stats.change")}
          equivalent={
            +formatCurrencyValue(
              portfolioChartData.changeValueCurrency,
              currency
            )
          }
          equivalentCurrency={currency}
          big
        >
          <Change
            changeValue={portfolioChartData.changeValue}
            changePercent={portfolioChartData.changePercent}
          />
        </StatisticItem>
      </div>
      <DashboardInRequestsContainer
        loaderData={inRequestsLoaderData}
        data={inRequests!}
        cancelRequest={cancelRequest}
      />
    </div>
  );
};

interface IDashboardPortfolioChartStatProps {
  currency: CurrencyEnum;
  data: DashboardChartValue;
}

const DashboardPortfolioChartStat = React.memo(
  withBlurLoader(_DashboardPortfolioChartStat)
);
export default DashboardPortfolioChartStat;
