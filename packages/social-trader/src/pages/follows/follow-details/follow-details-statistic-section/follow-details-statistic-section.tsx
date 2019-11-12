import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import * as React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import DetailsStatisticSection from "shared/components/details/details-statistic-section/details-statistic-section";
import ProgramBalanceChart from "shared/components/programs/program-details/program-details-statistic-section/program-details-chart-section/program-balance-chart-section/program-balance-chart";
import ProgramProfitChart from "shared/components/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-chart";
import { formatCurrencyValue } from "shared/utils/formatter";

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
      balanceChartSelector={followBalanceChartSelector}
      profitChartSelector={followProfitChartSelector}
      statisticCurrencySelector={statisticCurrencySelector}
      useChartStateValues={useFollowChartStateValues}
      useChartPeriod={useChartPeriod}
      renderProfitValue={({ statistic }) => (
        <NumberFormat
          value={formatCurrencyValue(
            "profit" in statistic ? statistic.profit : 0,
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
