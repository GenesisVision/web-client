import * as React from "react";
import { useSelector } from "react-redux";
import { ChartValuePeriodLoader } from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";
import { TUseFundChartStateValues } from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-chart-section/fund-details-chart.helpers";
import { TFundProfitChartSelector } from "shared/components/funds/fund-details/reducers/profit-chart.reducer";

import { TUseChartPeriod } from "../../details.chart.helpers";
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
      profitChart={profitChart!}
      addCurrency={addCurrency}
      removeCurrency={removeCurrency}
      changeCurrency={changeCurrency}
      selectCurrencies={selectCurrencies}
    />
  );
};

export interface IProfitChartSectionProps {
  useChartStateValues: TUseFundChartStateValues;
  useChartPeriod: TUseChartPeriod;
  renderProfitChart: TRenderProfitChart;
  profitChartSelector: TFundProfitChartSelector;
  profitValue: JSX.Element;
}

const ProfitChartSection = React.memo(_ProfitChartSection);
export default ProfitChartSection;
