import * as React from "react";
import { useSelector } from "react-redux";
import { ChartValuePeriodLoader } from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";

import BalanceChartElements, {
  TRenderBalanceChart
} from "./balance-chart-elements";
import { TUseChartPeriod } from "../../details.chart.helpers";
import { TFundBalanceChartSelector } from "../../../../funds/fund-details/reducers/balance-chart.reducer";
import { TUseFundChartStateValues } from "../../../../funds/fund-details/fund-details-statistics-section/fund-details-chart-section/fund-details-chart.helpers";

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
  } = useChartStateValues();
  const balanceChart = useSelector(balanceChartSelector);
  return (
    <BalanceChartElements
      condition={!!balanceChart}
      loader={<ChartValuePeriodLoader />}
      renderBalanceChart={renderBalanceChart}
      period={period}
      setPeriod={setPeriod}
      selectedCurrencies={selectedCurrencies}
      balanceChart={balanceChart!}
      addCurrency={addCurrency}
      removeCurrency={removeCurrency}
      changeCurrency={changeCurrency}
      selectCurrencies={selectCurrencies}
    />
  );
};

export interface IBalanceChartSectionProps {
  useChartStateValues: TUseFundChartStateValues;
  balanceChartSelector: TFundBalanceChartSelector;
  useChartPeriod: TUseChartPeriod;
  renderBalanceChart: TRenderBalanceChart;
}

const BalanceChartSection = React.memo(_BalanceChartSection);
export default BalanceChartSection;
