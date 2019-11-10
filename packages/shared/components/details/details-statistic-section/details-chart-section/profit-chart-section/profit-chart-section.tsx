import * as React from "react";
import { useSelector } from "react-redux";
import { selectedCurrenciesLoaderData } from "shared/components/programs/program-details/program-details.loader-data";

import {
  ProfitChartDataType,
  TProfitChartSelector,
  TUseChartPeriod,
  TUseChartStateValues
} from "../../details.chart.helpers";
import { DETAILS_CHART_TABS } from "../details-chart";
import ProfitChartElements, {
  TRenderProfitChart,
  TRenderProfitValue
} from "./profit-chart-elements";

const _ProfitChartSection: React.FC<IProfitChartSectionProps> = ({
  loaderData,
  renderProfitValue,
  useChartStateValues,
  profitChartSelector,
  useChartPeriod,
  renderProfitChart
}) => {
  const { period, setPeriod } = useChartPeriod();
  const {
    addCurrency,
    removeCurrency,
    changeCurrency,
    selectedCurrencies,
    selectCurrencies
  } = useChartStateValues(DETAILS_CHART_TABS.PROFIT);
  const profitChart = useSelector(profitChartSelector);
  if (!profitChart) return null;
  return (
    <ProfitChartElements
      loaderData={loaderData}
      renderProfitValue={renderProfitValue}
      renderProfitChart={renderProfitChart}
      period={period}
      setPeriod={setPeriod}
      selectedCurrencies={
        selectedCurrencies.length
          ? selectedCurrencies
          : selectedCurrenciesLoaderData
      }
      data={profitChart! as any}
      addCurrency={addCurrency}
      removeCurrency={removeCurrency}
      changeCurrency={changeCurrency}
      selectCurrencies={selectCurrencies}
    />
  );
};

export interface IProfitChartSectionProps {
  loaderData?: ProfitChartDataType;
  useChartStateValues: TUseChartStateValues;
  useChartPeriod: TUseChartPeriod;
  renderProfitChart: TRenderProfitChart;
  profitChartSelector: TProfitChartSelector;
  renderProfitValue: TRenderProfitValue;
}

const ProfitChartSection = React.memo(_ProfitChartSection);
export default ProfitChartSection;
