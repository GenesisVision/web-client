import * as React from "react";
import { useSelector } from "react-redux";

import { ChartValuePeriodLoader } from "../../../details-description-section/details-statistic-section/details-loader/details-chart-loader";
import {
  TProfitChartSelector,
  TUseChartPeriod,
  TUseChartStateValues
} from "../../details.chart.helpers";
import ProfitChartElements, {
  TRenderProfitChart
} from "./profit-chart-elements";

const _ProfitChartSection: React.FC<IProfitChartSectionProps> = ({
  profitValue,
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
  } = useChartStateValues();
  const profitChart = useSelector(profitChartSelector);
  return (
    <ProfitChartElements
      condition={!!profitChart}
      loader={<ChartValuePeriodLoader />}
      profitValue={profitValue}
      renderProfitChart={renderProfitChart}
      period={period}
      setPeriod={setPeriod}
      selectedCurrencies={selectedCurrencies}
      profitChart={profitChart! as any}
      addCurrency={addCurrency}
      removeCurrency={removeCurrency}
      changeCurrency={changeCurrency}
      selectCurrencies={selectCurrencies}
    />
  );
};

export interface IProfitChartSectionProps {
  useChartStateValues: TUseChartStateValues;
  useChartPeriod: TUseChartPeriod;
  renderProfitChart: TRenderProfitChart;
  profitChartSelector: TProfitChartSelector;
  profitValue: JSX.Element;
}

const ProfitChartSection = React.memo(_ProfitChartSection);
export default ProfitChartSection;
