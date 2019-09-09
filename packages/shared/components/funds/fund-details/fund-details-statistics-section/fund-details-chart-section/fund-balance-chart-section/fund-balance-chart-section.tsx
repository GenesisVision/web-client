import * as React from "react";
import { useSelector } from "react-redux";
import { ChartValuePeriodLoader } from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";

import { fundBalanceChartSelector } from "../../../reducers/balance-chart.reducer";
import {
  useChartPeriod,
  useFundChartStateValues
} from "../fund-details-chart.helpers";
import FundBalanceChartElements from "./fund-balance-chart-elements";

const _FundBalanceChartSection: React.FC = () => {
  const { period, setPeriod } = useChartPeriod();
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

const FundBalanceChartSection = React.memo(_FundBalanceChartSection);
export default FundBalanceChartSection;
