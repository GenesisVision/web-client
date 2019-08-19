import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import { PlatformAsset } from "gv-api-web";
import * as React from "react";
import { useEffect, useState } from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { createSelector } from "reselect";
import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import { ISelectChangeEvent } from "shared/components/select/select";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";
import {
  currenciesSelector,
  fundAssetsSelector
} from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import {
  FundBalanceChartDataType,
  fundBalanceChartSelector
} from "../reducers/balance-chart.reducer";
import {
  FundProfitChartDataType,
  fundProfitChartSelector
} from "../reducers/profit-chart.reducer";
import {
  getBalanceChart,
  getProfitChart
} from "../services/fund-details.service";
import FundDetailsChart from "./fund-details-chart-section/fund-details-chart";
import FundDetailsStatistics from "./fund-details-statistics/fund-details-statistics";

const _FundDetailsStatisticSection: React.FC<Props> = ({
  currencyValues,
  chartCurrencies,
  balanceChart,
  profitChart,
  id,
  service: { getProfitChart, getBalanceChart }
}) => {
  const [period, setPeriod] = useState<ChartDefaultPeriod>(DEFAULT_PERIOD);
  const [currencies, setCurrencies] = useState<TChartCurrency[]>([
    ...chartCurrencies.filter(chartCurrency => chartCurrency.mandatory)
  ]);
  const addCurrency = () => {
    setCurrencies([
      ...currencies,
      chartCurrencies.find(({ asset }) => asset === currencyValues[0])!
    ]);
  };
  const removeCurrency = (id: string) => {
    setCurrencies([...currencies.filter(item => item.id !== id)]);
  };
  const changeCurrency = (i: number) => (event: ISelectChangeEvent) => {
    currencies[i] = chartCurrencies.find(
      ({ asset }) => asset === event.target.value
    )!;
    setCurrencies([...currencies]);
  };
  useEffect(
    () => {
      getBalanceChart({ id, period });
    },
    [period, id]
  );
  useEffect(
    () => {
      getProfitChart({
        id,
        period,
        currencies: currencies.map(({ asset }) => asset)
      });
    },
    [period, id, currencies]
  );
  return (
    <div className="details-statistic-section">
      <div className="details-statistic-section__statistic">
        <FundDetailsStatistics
          condition={!!profitChart}
          statistic={profitChart && profitChart[0]}
          period={period}
        />
      </div>
      <div className="details-statistic-section__chart">
        <FundDetailsChart
          chartCurrencies={currencies}
          addChartCurrency={addCurrency}
          removeChartCurrency={removeCurrency}
          changeChartCurrency={changeCurrency}
          profitChart={profitChart}
          balanceChart={balanceChart}
          period={period}
          onPeriodChange={setPeriod}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { getProfitChart, getBalanceChart },
    dispatch
  )
});

const convertToChartCurrency = ({
  id,
  asset,
  color
}: PlatformAsset): TChartCurrency => ({
  id,
  asset: asset as CurrencyEnum,
  color,
  mandatory: asset === "GVT"
});

const chartCurrenciesSelector = createSelector<
  RootState,
  PlatformAsset[],
  TChartCurrency[]
>(state => fundAssetsSelector(state), data => data.map(convertToChartCurrency));

const mapStateToProps = (state: RootState): StateProps => ({
  currencyValues: currenciesSelector(state) as CurrencyEnum[],
  chartCurrencies: chartCurrenciesSelector(state),
  profitChart: fundProfitChartSelector(state),
  balanceChart: fundBalanceChartSelector(state)
});

interface ServiceThunks extends ActionCreatorsMapObject {
  getProfitChart: typeof getProfitChart;
  getBalanceChart: typeof getBalanceChart;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface StateProps {
  currencyValues: CurrencyEnum[];
  chartCurrencies: TChartCurrency[];
  profitChart?: FundProfitChartDataType;
  balanceChart?: FundBalanceChartDataType;
}

interface OwnProps {
  id: string;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

const FundDetailsStatisticSection = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_FundDetailsStatisticSection);
export default FundDetailsStatisticSection;
