import {
  FundBalanceChart as FundBalanceChartType,
  PlatformCurrency
} from "gv-api-web";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { ResolveThunks, connect, useDispatch, useSelector } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { createSelector } from "reselect";
import { ChartValuePeriodLoader } from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";
import { ISelectChangeEvent } from "shared/components/select/select";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import {
  currenciesSelector,
  platformCurrenciesSelector
} from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import { statisticCurrencyAction } from "../../../actions/fund-details.actions";
import { fundBalanceChartSelector } from "../../../reducers/balance-chart.reducer";
import { statisticCurrencySelector } from "../../../reducers/statistic-currency.reducer";
import { statisticPeriodSelector } from "../../../reducers/statistic-period.reducer";
import {
  getBalanceChart,
  getProfitChart
} from "../../../services/fund-details.service";
import FundBalanceChartElements from "./fund-balance-chart-elements";
import { fundIdSelector } from "../../../reducers/description.reducer";

const _FundBalanceChartSection: React.FC<Props> = ({
  service: { getBalanceChart, getProfitChart },
  globalCurrency,
  platformCurrencies,
  balanceChart
}) => {
  const id = useSelector(fundIdSelector);
  const period = useSelector(statisticPeriodSelector);
  const statisticCurrency = useSelector(statisticCurrencySelector);
  const dispatch = useDispatch();
  const [selectedCurrencies, setSelectedCurrencies] = useState<
    TChartCurrency[]
  >([...platformCurrencies.filter(({ name }) => name === statisticCurrency)]);
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
      selectedCurrencies[i] = platformCurrencies.find(
        ({ name }) => name === event.target.value
      )!;
      setSelectedCurrencies([...selectedCurrencies]);
      dispatch(statisticCurrencyAction(event.target.value as CurrencyEnum));
    },
    [selectedCurrencies, platformCurrencies]
  );
  useEffect(
    () => {
      setSelectCurrencies(
        platformCurrencies.filter(
          ({ name }) =>
            !!!selectedCurrencies.find(currency => currency.name === name)
        )
      );
    },
    [platformCurrencies, selectedCurrencies]
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

const platformChartCurrenciesSelector = createSelector<
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
  platformCurrencies: platformChartCurrenciesSelector(state)
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
  platformCurrencies: TChartCurrency[];
}

interface OwnProps {}

interface Props extends OwnProps, StateProps, DispatchProps {}

const FundBalanceChartSection = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_FundBalanceChartSection);
export default FundBalanceChartSection;
