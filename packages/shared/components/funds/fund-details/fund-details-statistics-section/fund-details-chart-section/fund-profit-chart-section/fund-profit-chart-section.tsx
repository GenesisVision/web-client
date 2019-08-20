import { PlatformCurrency } from "gv-api-web";
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
import { ChartValuePeriodLoader } from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";
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

import {
  FundProfitChartDataType,
  fundProfitChartSelector
} from "../../../reducers/profit-chart.reducer";
import { getProfitChart } from "../../../services/fund-details.service";
import FundProfitChart from "./fund-profit-chart";

const _FundProfitChartSection: React.FC<Props> = ({
  chartCurrencies,
  service: { getProfitChart },
  id,
  period,
  profitChart,
  onPeriodChange
}) => {
  const [t] = useTranslation();
  const equivalentCurrency = "USD";
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
  if (!profitChart) return <ChartValuePeriodLoader />;
  const chart = profitChart[0];
  return (
    <>
      <div className="details-chart__value">
        <StatisticItem
          label={t("fund-details-page.chart.value")}
          equivalent={
            +formatCurrencyValue(chart.timeframeUsdProfit, equivalentCurrency)
          }
          equivalentCurrency={equivalentCurrency}
          big
          accent
        >
          <NumberFormat
            value={chart.profitPercent}
            thousandSeparator={" "}
            displayType="text"
            suffix={" %"}
          />
        </StatisticItem>
      </div>
      <ChartPeriod onChange={onPeriodChange} period={period} />
      <ChartCurrencySelector
        selectCurrencies={selectCurrencies}
        chartCurrencies={selectedCurrencies}
        onAdd={addCurrency}
        onRemove={removeCurrency}
        onChange={changeCurrency}
      />
      <div className="details-chart__profit">
        <FundProfitChart
          profitChart={profitChart}
          chartCurrencies={selectedCurrencies}
        />
      </div>
    </>
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
