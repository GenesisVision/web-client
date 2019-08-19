import {
  FundBalanceChart as FundBalanceChartType,
  PlatformCurrency
} from "gv-api-web";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { createSelector } from "reselect";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { ISelectChangeEvent } from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import ChartCurrencySelector, {
  TChartCurrency
} from "shared/modules/chart-currency-selector/chart-currency-selector";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import {
  currenciesSelector,
  platformCurrenciesSelector
} from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum, HandlePeriodChangeType } from "shared/utils/types";

import { fundBalanceChartSelector } from "../../../reducers/balance-chart.reducer";
import {
  getBalanceChart,
  getProfitChart
} from "../../../services/fund-details.service";
import FundBalanceChart from "./fund-balance-chart";
import { ChartValuePeriodLoader } from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";

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
  const [t] = useTranslation();
  const equivalentCurrency = "USD";
  const [currencies, setCurrencies] = useState<TChartCurrency[]>([
    ...chartCurrencies.filter(({ name }) => name === globalCurrency)
  ]);
  const [selectCurrencies, setSelectCurrencies] = useState<TChartCurrency[]>(
    []
  );
  const addCurrency = useCallback(
    () => {
      setCurrencies([...currencies, selectCurrencies[0]]);
    },
    [currencies, selectCurrencies]
  );
  const removeCurrency = useCallback(
    (name: string) => {
      setCurrencies([...currencies.filter(item => item.name !== name)]);
    },
    [currencies]
  );
  const changeCurrency = useCallback(
    (i: number) => (event: ISelectChangeEvent) => {
      currencies[i] = chartCurrencies.find(
        ({ name }) => name === event.target.value
      )!;
      setCurrencies([...currencies]);
      setStatisticCurrency(event.target.value as CurrencyEnum);
    },
    [currencies, chartCurrencies]
  );
  useEffect(
    () => {
      setSelectCurrencies(
        chartCurrencies.filter(
          ({ name }) => !!!currencies.find(currency => currency.name === name)
        )
      );
    },
    [chartCurrencies, currencies]
  );
  useEffect(
    () => {
      const curr = currencies.map(({ name }) => name);
      getBalanceChart({
        id,
        period,
        currencies: curr
      });
      getProfitChart({
        id,
        period,
        currencies: curr
      });
    },
    [period, id, currencies]
  );
  if (!balanceChart) return <ChartValuePeriodLoader />;
  return (
    <>
      <div className="details-chart__value">
        <StatisticItem
          label={t("fund-details-page.chart.value")}
          equivalent={balanceChart.usdBalance}
          equivalentCurrency={equivalentCurrency}
          big
          accent
        >
          <NumberFormat
            value={formatCurrencyValue(balanceChart.gvtBalance, globalCurrency)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${globalCurrency}`}
          />
        </StatisticItem>
      </div>
      <ChartPeriod onChange={onPeriodChange} period={period} />
      <ChartCurrencySelector
        maxCharts={1}
        selectCurrencies={selectCurrencies}
        chartCurrencies={currencies}
        onAdd={addCurrency}
        onRemove={removeCurrency}
        onChange={changeCurrency}
      />
      <div className="details-chart__profit">
        <FundBalanceChart
          balanceChart={balanceChart.balanceChart}
          currency={currencies[0].name}
          color={currencies[0].color}
        />
      </div>
    </>
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
