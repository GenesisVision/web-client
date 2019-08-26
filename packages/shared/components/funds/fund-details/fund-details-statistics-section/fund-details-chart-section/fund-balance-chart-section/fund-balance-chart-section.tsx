import * as React from "react";
import { useSelector } from "react-redux";
import { ChartValuePeriodLoader } from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";

import { fundBalanceChartSelector } from "../../../reducers/balance-chart.reducer";
import { useFundChartStateValues } from "../fund-details-chart.helpers";
import FundBalanceChartElements from "./fund-balance-chart-elements";

const _FundBalanceChartSection: React.FC = () => {
  const {
    addCurrency,
    removeCurrency,
    changeCurrency,
    selectedCurrencies,
    selectCurrencies
  } = useFundChartStateValues();
  const balanceChart = useSelector(fundBalanceChartSelector);
  return (
    <FundBalanceChartElements
      condition={!!balanceChart}
      loader={<ChartValuePeriodLoader />}
      selectedCurrencies={selectedCurrencies}
      balanceChart={balanceChart!}
      addCurrency={addCurrency}
      removeCurrency={removeCurrency}
      changeCurrency={changeCurrency}
      selectCurrencies={selectCurrencies}
    />
  );
};

const FundBalanceChartSection = React.memo(_FundBalanceChartSection);
export default FundBalanceChartSection;
