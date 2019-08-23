import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ISelectChangeEvent } from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import ChartCurrencySelector, {
  TChartCurrency
} from "shared/modules/chart-currency-selector/chart-currency-selector";
import { platformCurrenciesSelector } from "shared/reducers/platform-reducer";
import { CurrencyEnum } from "shared/utils/types";

import { statisticPeriodAction } from "../../../actions/fund-details.actions";
import { FundProfitChartDataType } from "../../../reducers/profit-chart.reducer";
import { statisticPeriodSelector } from "../../../reducers/statistic-period.reducer";
import FundProfitChart from "./fund-profit-chart";

const _FundProfitChartElements: React.FC<Props> = ({
  profitChart,
  selectedCurrencies,
  addCurrency,
  removeCurrency,
  changeCurrency,
  selectCurrencies
}) => {
  const period = useSelector(statisticPeriodSelector);
  const dispatch = useDispatch();
  const onPeriodChange = useCallback(period => {
    dispatch(statisticPeriodAction(period));
  }, []);
  const platformCurrencies = useSelector(platformCurrenciesSelector);
  const [t] = useTranslation();
  const [chartData, setChartData] = useState<IProfitChartData>({
    profitChart,
    selectedCurrencies
  });
  useEffect(
    () => {
      setChartData({
        profitChart,
        selectedCurrencies: [...selectedCurrencies]
      });
    },
    [profitChart]
  );
  const chart = chartData.profitChart[0];
  return (
    <>
      <div className="details-chart__value">
        <StatisticItem label={t("fund-details-page.chart.value")} big accent>
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
        fullSelectCurrencies={platformCurrencies.map(
          ({ name }) => name as CurrencyEnum
        )}
        maxCharts={
          selectCurrencies.length + chartData.selectedCurrencies.length
        }
        selectCurrencies={selectCurrencies.map(({ name }) => name)}
        chartCurrencies={chartData.selectedCurrencies}
        onAdd={addCurrency}
        onRemove={removeCurrency}
        onChange={changeCurrency}
      />
      <div className="details-chart__profit">
        <FundProfitChart
          profitChart={chartData.profitChart}
          chartCurrencies={chartData.selectedCurrencies}
        />
      </div>
    </>
  );
};

interface IProfitChartData {
  profitChart: FundProfitChartDataType;
  selectedCurrencies: TChartCurrency[];
}

interface OwnProps {
  profitChart: FundProfitChartDataType;
  selectedCurrencies: TChartCurrency[];
  addCurrency: () => void;
  removeCurrency: (name: string) => void;
  changeCurrency: (i: number) => (event: ISelectChangeEvent) => void;
  selectCurrencies: TChartCurrency[];
}

interface Props extends OwnProps {}

const FundProfitChartElements = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  React.memo
)(_FundProfitChartElements);
export default FundProfitChartElements;
