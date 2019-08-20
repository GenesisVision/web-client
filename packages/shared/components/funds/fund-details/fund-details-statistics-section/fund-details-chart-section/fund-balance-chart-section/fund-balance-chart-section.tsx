import {
  FundBalanceChart as FundBalanceChartType,
  PlatformCurrency
} from "gv-api-web";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { createSelector } from "reselect";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { ChartValuePeriodLoader } from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";
import { ISelectChangeEvent } from "shared/components/select/select";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import {
  currenciesSelector,
  platformCurrenciesSelector
} from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum, HandlePeriodChangeType } from "shared/utils/types";

import { fundBalanceChartSelector } from "../../../reducers/balance-chart.reducer";
import {
  getBalanceChart,
  getProfitChart
} from "../../../services/fund-details.service";
import FundBalanceChartElements from "./fund-balance-chart-elements";

const _FundBalanceChartSection: React.FC<Props> = ({
  setStatisticCurrency,
  service: { getBalanceChart, getProfitChart },
  globalCurrency,
  chartCurrencies,
  id,
  balanceChart,
  period,
  onPeriodChange
}) => {
  const [selectedCurrencies, setSelectedCurrencies] = useState<
    TChartCurrency[]
  >([...chartCurrencies.filter(({ name }) => name === globalCurrency)]);
  const [selectCurrencies, setSelectCurrencies] = useState<TChartCurrency[]>(
    []
  );
  const addCurrency = useCallback(
    () => {
      setSelectedCurrencies([...selectedCurrencies, selectCurrencies[0]]);
    },
    [selectedCurrencies, selectCurrencies]
  );
  const removeCurrency = useCallback(
    (name: string) => {
      setSelectedCurrencies([
        ...selectedCurrencies.filter(item => item.name !== name)
      ]);
    },
    [selectedCurrencies]
  );
  const changeCurrency = useCallback(
    (i: number) => (event: ISelectChangeEvent) => {
      selectedCurrencies[i] = chartCurrencies.find(
        ({ name }) => name === event.target.value
      )!;
      setSelectedCurrencies([...selectedCurrencies]);
      setStatisticCurrency(event.target.value as CurrencyEnum);
    },
    [selectedCurrencies, chartCurrencies]
  );
  useEffect(
    () => {
      setSelectCurrencies(
        chartCurrencies.filter(
          ({ name }) =>
            !!!selectedCurrencies.find(currency => currency.name === name)
        )
      );
    },
    [chartCurrencies, selectedCurrencies]
  );
  useEffect(
    () => {
      const currencies = selectedCurrencies.map(({ name }) => name);
      const opts = {
        id,
        period,
        currencies
      };
      getBalanceChart(opts);
      getProfitChart(opts);
    },
    [period, id, selectedCurrencies]
  );
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
      period={period}
      onPeriodChange={onPeriodChange}
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { getBalanceChart, getProfitChart },
    dispatch
  )
});

const convertToChartCurrency = ({
  name,
  color
}: PlatformCurrency): TChartCurrency => ({
  name: name as CurrencyEnum,
  color
});

const chartCurrenciesSelector = createSelector<
  RootState,
  PlatformCurrency[],
  TChartCurrency[]
>(
  state => platformCurrenciesSelector(state),
  currencies => currencies.map(convertToChartCurrency)
);

const mapStateToProps = (state: RootState): StateProps => ({
  balanceChart: fundBalanceChartSelector(state),
  globalCurrency: currencySelector(state),
  currencyValues: currenciesSelector(state) as CurrencyEnum[],
  chartCurrencies: chartCurrenciesSelector(state)
});

interface ServiceThunks extends ActionCreatorsMapObject {
  getBalanceChart: typeof getBalanceChart;
  getProfitChart: typeof getProfitChart;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface StateProps {
  balanceChart?: FundBalanceChartType;
  globalCurrency: CurrencyEnum;
  currencyValues: CurrencyEnum[];
  chartCurrencies: TChartCurrency[];
}

interface OwnProps {
  setStatisticCurrency: (currency: CurrencyEnum) => void;
  id: string;
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

const FundBalanceChartSection = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_FundBalanceChartSection);
export default FundBalanceChartSection;
