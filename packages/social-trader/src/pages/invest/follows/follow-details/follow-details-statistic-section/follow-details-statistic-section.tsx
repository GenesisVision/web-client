import DetailsStatisticSection from "components/details/details-statistic-section/details-statistic-section";
import dynamic from "next/dist/next-server/lib/dynamic";
import { followAbsoluteProfitChartSelector } from "pages/invest/follows/follow-details/reducers/absolute-profit-chart.reducer";
import ProgramDetailsStatisticsElements, {
  IProgramStatisticData
} from "pages/invest/programs/program-details/program-details-statistic-section/program-details-statistics/program-details-statistics-elements";
import * as React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { formatCurrencyValue } from "utils/formatter";

import { statisticDataLoaderData } from "../follow-details.loader-data";
import { followBalanceChartSelector } from "../reducers/balance-chart.reducer";
import { followStatusSelector } from "../reducers/description.reducer";
import { followProfitChartSelector } from "../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../reducers/statistic-currency.reducer";
import {
  useChartPeriod,
  useFollowChartStateValues
} from "./follow-details.chart.helpers";

const FollowBalanceChart = dynamic(() =>
  import(
    "pages/invest/follows/follow-details/follow-details-statistic-section/follow-balance-chart-section/follow-balance-chart"
  )
);
const ProgramAbsoluteProfitChart = dynamic(() =>
  import(
    "pages/invest/programs/program-details/program-details-statistic-section/program-details-chart-section/program-absolute-profit-chart-section/program-absolute-profit-chart"
  )
);
const ProgramProfitChart = dynamic(() =>
  import(
    "pages/invest/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-chart"
  )
);

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
        <FollowBalanceChart
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
        <ProgramDetailsStatisticsElements
          loaderData={statisticDataLoaderData}
          status={status}
          data={statisticData! as IProgramStatisticData}
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
