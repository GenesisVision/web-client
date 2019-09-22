import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import * as React from "react";
import NumberFormat from "react-number-format";
import DetailsStatisticsTextLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-statistic.txt-loader";
import DetailsStatisticSection from "shared/components/details/details-statistic-section/details-statistic-section";

import { fundBalanceChartSelector } from "../reducers/balance-chart.reducer";
import { fundProfitChartSelector } from "../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../reducers/statistic-currency.reducer";
import FundBalanceChart from "./fund-details-chart-section/fund-balance-chart-section/fund-balance-chart";
import {
  useChartPeriod,
  useFundChartStateValues
} from "./fund-details-chart-section/fund-details-chart.helpers";
import FundProfitChart from "./fund-details-chart-section/fund-profit-chart-section/fund-profit-chart";
import FundDetailsStatisticsElements, {
  IFundStatisticData
} from "./fund-details-statistics/fund-details-statistics-elements";

const _FundDetailsStatisticSection: React.FC = () => (
  <DetailsStatisticSection
    balanceChartSelector={fundBalanceChartSelector}
    profitChartSelector={fundProfitChartSelector}
    statisticCurrencySelector={statisticCurrencySelector}
    useChartStateValues={useFundChartStateValues}
    useChartPeriod={useChartPeriod}
    renderProfitValue={({ chart }) => (
      <NumberFormat
        value={"profitPercent" in chart ? chart.profitPercent : 0}
        thousandSeparator={" "}
        displayType="text"
        suffix={" %"}
      />
    )}
    renderBalanceChart={({ currency, color, balanceChart }) => (
      <FundBalanceChart
        balanceChart={balanceChart}
        currency={currency}
        color={color}
      />
    )}
    renderProfitChart={({ profitChart, chartCurrencies }) => (
      <FundProfitChart
        profitChart={profitChart}
        chartCurrencies={chartCurrencies}
      />
    )}
    renderDetailsStatisticsElements={({ period, statisticData }) => (
      <FundDetailsStatisticsElements
        condition={!!statisticData}
        loader={<DetailsStatisticsTextLoader />}
        period={period}
        statisticData={statisticData! as IFundStatisticData}
      />
    )}
  />
);

const FundDetailsStatisticSection = React.memo(_FundDetailsStatisticSection);
export default FundDetailsStatisticSection;
