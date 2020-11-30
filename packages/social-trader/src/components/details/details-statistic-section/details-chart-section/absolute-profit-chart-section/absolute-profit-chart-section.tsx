import { TRenderProfitValue } from "components/details/details-statistic-section/details-chart-section/profit-chart-section/profit-chart-elements";
import {
  ProfitChartDataType,
  TAbsoluteProfitChartSelector,
  TUseChartPeriod,
  TUseChartStateValues
} from "components/details/details-statistic-section/details.chart.types";
import { selectedCurrenciesLoaderData } from "pages/invest/programs/program-details/program-details.loader-data";
import * as React from "react";
import { useSelector } from "react-redux";

import { DETAILS_CHART_TABS } from "../details-chart";
import AbsoluteProfitChartElements, {
  TRenderAbsoluteProfitChart
} from "./absolute-profit-chart-elements";

export interface IAbsoluteProfitChartSectionProps {
  loaderData?: ProfitChartDataType;
  useChartStateValues: TUseChartStateValues;
  useChartPeriod: TUseChartPeriod;
  renderAbsoluteProfitChart: TRenderAbsoluteProfitChart;
  absoluteProfitChartSelector: TAbsoluteProfitChartSelector;
  renderProfitValue: TRenderProfitValue;
}

const _AbsoluteProfitChartSection: React.FC<IAbsoluteProfitChartSectionProps> = ({
  loaderData,
  renderAbsoluteProfitChart,
  useChartStateValues,
  absoluteProfitChartSelector,
  useChartPeriod,
  renderProfitValue
}) => {
  const { period, setPeriod } = useChartPeriod();
  const {
    addCurrency,
    removeCurrency,
    changeCurrency,
    selectedCurrencies,
    selectCurrencies
  } = useChartStateValues(DETAILS_CHART_TABS.ABSOLUTE_PROFIT);
  const chart = useSelector(absoluteProfitChartSelector);
  if (!chart) return null;
  return (
    <AbsoluteProfitChartElements
      loaderData={loaderData}
      renderValue={renderProfitValue}
      renderChart={renderAbsoluteProfitChart}
      period={period}
      setPeriod={setPeriod}
      selectedCurrencies={
        selectedCurrencies.length
          ? selectedCurrencies
          : selectedCurrenciesLoaderData
      }
      data={chart! as any}
      addCurrency={addCurrency}
      removeCurrency={removeCurrency}
      changeCurrency={changeCurrency}
      selectCurrencies={selectCurrencies}
    />
  );
};

const AbsoluteProfitChartSection = React.memo(_AbsoluteProfitChartSection);
export default AbsoluteProfitChartSection;
