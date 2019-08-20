import { PlatformCurrency } from "gv-api-web";
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

import {
  FundProfitChartDataType,
  fundProfitChartSelector
} from "../../../reducers/profit-chart.reducer";
import { getProfitChart } from "../../../services/fund-details.service";
import FundProfitChartElements from "./fund-profit-chart-elements";

const _FundProfitChartSection: React.FC<Props> = ({
  setStatisticCurrency,
  chartCurrencies,
  service: { getProfitChart },
  id,
  period,
  profitChart,
  onPeriodChange
}) => {
  const [selectedCurrencies, setSelectedCurrencies] = useState<
    TChartCurrency[]
  >([...chartCurrencies.filter(chartCurrency => chartCurrency.mandatory)]);
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
      setStatisticCurrency(selectedCurrencies[0].name);
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
      getProfitChart({
        id,
        period,
        currencies: selectedCurrencies.map(({ name }) => name)
      });
    },
    [period, id, selectedCurrencies]
  );
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
      period={period}
      onPeriodChange={onPeriodChange}
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { getProfitChart },
    dispatch
  )
});

const convertToChartCurrency = (defaultCurrency: CurrencyEnum) => ({
  name,
  color
}: PlatformCurrency): TChartCurrency => ({
  name: name as CurrencyEnum,
  color,
  mandatory: name === defaultCurrency
});

const chartCurrenciesSelector = createSelector<
  RootState,
  PlatformCurrency[],
  CurrencyEnum,
  TChartCurrency[]
>(
  state => platformCurrenciesSelector(state),
  state => currencySelector(state),
  (currencies, globalCurrency) =>
    currencies.map(convertToChartCurrency(globalCurrency))
);

const mapStateToProps = (state: RootState): StateProps => ({
  profitChart: fundProfitChartSelector(state),
  globalCurrency: currencySelector(state),
  currencyValues: currenciesSelector(state) as CurrencyEnum[],
  chartCurrencies: chartCurrenciesSelector(state)
});

interface ServiceThunks extends ActionCreatorsMapObject {
  getProfitChart: typeof getProfitChart;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface StateProps {
  profitChart?: FundProfitChartDataType;
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

const FundProfitChartSection = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_FundProfitChartSection);
export default FundProfitChartSection;
