import DetailsStatisticSection from "components/details/details-statistic-section/details-statistic-section";
import dynamic from "next/dist/next-server/lib/dynamic";
import { programAbsoluteProfitChartSelector } from "pages/invest/programs/program-details/reducers/absolute-profit-chart.reducer";
import * as React from "react";
import { useCallback } from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { formatCurrencyValue } from "utils/formatter";

import { statisticDataLoaderData } from "../program-details.loader-data";
import { programBalanceChartSelector } from "../reducers/balance-chart.reducer";
import { programStatusSelector } from "../reducers/description.reducer";
import { programProfitChartSelector } from "../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../reducers/statistic-currency.reducer";
import {
  useChartPeriod,
  useProgramChartStateValues
} from "./program-details-chart-section/program-details.chart.helpers";
import ProgramDetailsStatisticsElements, {
  IProgramStatisticData
} from "./program-details-statistics/program-details-statistics-elements";

const ProgramBalanceChart = dynamic(() =>
  import(
    "./program-details-chart-section/program-balance-chart-section/program-balance-chart"
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

interface Props {
  showPeriod?: boolean;
}

const _ProgramDetailsStatisticSection: React.FC<Props> = ({ showPeriod }) => {
  const status = useSelector(programStatusSelector);
  const statisticCurrency = useSelector(statisticCurrencySelector);

  const renderProfitValue = useCallback(
    ({ statistic }) => {
      return (
        <NumberFormat
          value={formatCurrencyValue(
            "profitPercent" in statistic ? statistic.profitPercent : 0,
            statisticCurrency
          )}
          thousandSeparator={" "}
          displayType="text"
          suffix={` ${statisticCurrency}`}
        />
      );
    },
    [statisticCurrency]
  );
  const renderBalanceChart = useCallback(
    ({ color, currency, balanceChart }) => (
      <ProgramBalanceChart
        color={color}
        balanceChart={balanceChart}
        currency={currency}
      />
    ),
    []
  );
  const renderAbsoluteProfitChart = useCallback(
    ({ color, currency, chart }) => (
      <ProgramAbsoluteProfitChart
        color={color}
        chart={chart}
        currency={currency}
      />
    ),
    []
  );
  const renderProfitChart = useCallback(
    ({ profitChart, chartCurrencies }) => (
      <ProgramProfitChart charts={profitChart} colors={chartCurrencies} />
    ),
    []
  );
  const renderDetailsStatisticsElements = useCallback(
    ({ period, statisticData }) => {
      return (
        <ProgramDetailsStatisticsElements
          showPeriod={showPeriod}
          loaderData={statisticDataLoaderData}
          status={status}
          data={statisticData! as IProgramStatisticData}
          period={period}
        />
      );
    },
    [status]
  );
  return (
    <DetailsStatisticSection
      absoluteProfitChartSelector={programAbsoluteProfitChartSelector}
      balanceChartSelector={programBalanceChartSelector}
      profitChartSelector={programProfitChartSelector}
      statisticCurrencySelector={statisticCurrencySelector}
      useChartStateValues={useProgramChartStateValues}
      useChartPeriod={useChartPeriod}
      renderProfitValue={renderProfitValue}
      renderBalanceChart={renderBalanceChart}
      renderAbsoluteProfitChart={renderAbsoluteProfitChart}
      renderProfitChart={renderProfitChart}
      renderDetailsStatisticsElements={renderDetailsStatisticsElements}
    />
  );
};

const ProgramDetailsStatisticSection = React.memo(
  _ProgramDetailsStatisticSection
);
export default ProgramDetailsStatisticSection;
