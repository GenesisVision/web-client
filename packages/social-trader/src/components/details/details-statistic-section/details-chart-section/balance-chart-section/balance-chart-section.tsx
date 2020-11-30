import {
  TBalanceChartSelector,
  TUseChartPeriod,
  TUseChartStateValues
} from "components/details/details-statistic-section/details.chart.types";
import * as React from "react";
import { useSelector } from "react-redux";

import { DETAILS_CHART_TABS } from "../details-chart";
import BalanceChartElements, {
  TRenderBalanceChart
} from "./balance-chart-elements";

export interface IBalanceChartSectionProps {
  useChartStateValues: TUseChartStateValues;
  balanceChartSelector: TBalanceChartSelector;
  useChartPeriod: TUseChartPeriod;
  renderBalanceChart: TRenderBalanceChart;
}

const _BalanceChartSection: React.FC<IBalanceChartSectionProps> = ({
  useChartPeriod,
  renderBalanceChart,
  balanceChartSelector,
  useChartStateValues
}) => {
  const { period, setPeriod } = useChartPeriod();
  const {
    addCurrency,
    removeCurrency,
    changeCurrency,
    selectedCurrencies,
    selectCurrencies
  } = useChartStateValues(DETAILS_CHART_TABS.BALANCE);
  const chart = useSelector(balanceChartSelector);
  return (
    <BalanceChartElements
      condition={!!chart && !!selectedCurrencies.length}
      renderBalanceChart={renderBalanceChart}
      period={period}
      setPeriod={setPeriod}
      selectedCurrencies={selectedCurrencies}
      balanceChart={chart!}
      addCurrency={addCurrency}
      removeCurrency={removeCurrency}
      changeCurrency={changeCurrency}
      selectCurrencies={selectCurrencies}
    />
  );
};

const BalanceChartSection = React.memo(_BalanceChartSection);
export default BalanceChartSection;
