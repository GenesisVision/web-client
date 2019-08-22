import { PlatformCurrency } from "gv-api-web";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { ResolveThunks, connect, useDispatch, useSelector } from "react-redux";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators, compose } from "redux";
import { createSelector } from "reselect";
import { ChartValuePeriodLoader } from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";
import { ISelectChangeEvent } from "shared/components/select/select";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { currenciesSelector, platformCurrenciesSelector } from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import { statisticCurrencyAction } from "../../../actions/fund-details.actions";
import { FundProfitChartDataType, fundProfitChartSelector } from "../../../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../../../reducers/statistic-currency.reducer";
import { statisticPeriodSelector } from "../../../reducers/statistic-period.reducer";
import { getProfitChart } from "../../../services/fund-details.service";
import FundProfitChartElements from "./fund-profit-chart-elements";

const _FundProfitChartSection: React.FC<Props> = ({
  globalCurrency,
  platformCurrencies,
  service: { getProfitChart },
  id,
  profitChart,
}) => {
  const period = useSelector(statisticPeriodSelector);
  const dispatch = useDispatch();
  const [selectedCurrencies, setSelectedCurrencies] = useState<
    TChartCurrency[]
  >([...platformCurrencies.filter(chartCurrency => chartCurrency.mandatory)]);
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
      const newSelectedCurrencies = selectedCurrencies.filter(
        ({ name }) => name !== event.target.value
      );
      newSelectedCurrencies[i] = platformCurrencies.find(
        ({ name }) => name === event.target.value
      )!;
      setSelectedCurrencies([...newSelectedCurrencies]);
      dispatch(statisticCurrencyAction(newSelectedCurrencies[0].name));
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

const platformChartCurrenciesSelector = createSelector<
  RootState,
  PlatformCurrency[],
  CurrencyEnum,
  TChartCurrency[]
>(
  state => platformCurrenciesSelector(state),
  state => statisticCurrencySelector(state),
  (currencies, statisticCurrency) =>
    currencies.map(convertToChartCurrency(statisticCurrency))
);

const mapStateToProps = (state: RootState): StateProps => ({
  profitChart: fundProfitChartSelector(state),
  globalCurrency: currencySelector(state),
  currencyValues: currenciesSelector(state) as CurrencyEnum[],
  platformCurrencies: platformChartCurrenciesSelector(state)
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
  platformCurrencies: TChartCurrency[];
}

interface OwnProps {
  id: string;
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
