import * as React from "react";
import { useSelector } from "react-redux";
import { ChartValuePeriodLoader } from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";

import { fundProfitChartSelector } from "../../../reducers/profit-chart.reducer";
import { useFundChartStateValues } from "../fund-details-chart.helpers";
import FundProfitChartElements from "./fund-profit-chart-elements";

const _FundProfitChartSection: React.FC = () => {
  const {
    addCurrency,
    removeCurrency,
    changeCurrency,
    selectedCurrencies,
    selectCurrencies
  } = useFundChartStateValues();
  const profitChart = useSelector(fundProfitChartSelector);
  return (
    <FundProfitChartElements
      condition={!!profitChart}
      loader={<ChartValuePeriodLoader />}
      selectedCurrencies={selectedCurrencies}
      profitChart={profitChart!}
      addCurrency={addCurrency}
      removeCurrency={removeCurrency}
      changeCurrency={changeCurrency}
      selectCurrencies={selectCurrencies}
    />
  );
};

const FundProfitChartSection = React.memo(_FundProfitChartSection);
export default FundProfitChartSection;
