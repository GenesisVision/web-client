import "components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import DetailsStatisticSection from "components/details/details-statistic-section/details-statistic-section";
import { followAbsoluteProfitChartSelector } from "pages/follows/follow-details/reducers/absolute-profit-chart.reducer";
import ProgramAbsoluteProfitChart from "pages/programs/program-details/program-details-statistic-section/program-details-chart-section/program-absolute-profit-chart-section/program-absolute-profit-chart";
import ProgramBalanceChart from "pages/programs/program-details/program-details-statistic-section/program-details-chart-section/program-balance-chart-section/program-balance-chart";
import ProgramProfitChart from "pages/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-chart";
import * as React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { formatCurrencyValue } from "utils/formatter";

import { statisticDataLoaderData } from "../follow-details.loader-data";
import { followBalanceChartSelector } from "../reducers/balance-chart.reducer";
import { followStatusSelector } from "../reducers/description.reducer";
import { followProfitChartSelector } from "../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../reducers/statistic-currency.reducer";
import FollowDetailsStatisticsElements, {
  IFollowStatisticData
} from "./follow-details-statistics/follow-details-statistics-elements";
import {
  useChartPeriod,
  useFollowChartStateValues
} from "./follow-details.chart.helpers";

const _ProgramDetailsStatisticSection: React.FC = () => {
  const status = useSelector(followStatusSelector);
  const statisticCurrency = useSelector(statisticCurrencySelector);
  return (
    <DetailsStatisticSection
      absoluteProfitChartSelector={followAbsoluteProfitChartSelector}
      balanceChartSelector={followBalanceChartSelector}
      profitChartSelector={followProfitChartSelector}
      statisticCurrencySelector={statisticCurrencySelector}
      useChartStateValues={useFollowChartStateValues}
      useChartPeriod={useChartPeriod}
      renderProfitValue={({ statistic }) => (
        <NumberFormat
          value={formatCurrencyValue(
            "profitPercent" in statistic ? statistic.profitPercent : 0,
            statisticCurrency
          )}
          thousandSeparator={" "}
          displayType="text"
          suffix={` ${statisticCurrency}`}
        />
      )}
      renderBalanceChart={({ color, currency, balanceChart }) => (
        <ProgramBalanceChart
          color={color}
          balanceChart={balanceChart}
          currency={currency}
        />
      )}
      renderAbsoluteProfitChart={({ color, currency, chart }) => (
        <ProgramAbsoluteProfitChart
          color={color}
          chart={chart}
          currency={currency}
        />
      )}
      renderProfitChart={({ profitChart, chartCurrencies }) => (
        <ProgramProfitChart charts={profitChart} colors={chartCurrencies} />
      )}
      renderDetailsStatisticsElements={({ period, statisticData }) => (
        <FollowDetailsStatisticsElements
          loaderData={statisticDataLoaderData}
          status={status}
          data={statisticData! as IFollowStatisticData}
          period={period}
        />
      )}
    />
  );
};

const FollowDetailsStatisticSection = React.memo(
  _ProgramDetailsStatisticSection
);
export default FollowDetailsStatisticSection;
