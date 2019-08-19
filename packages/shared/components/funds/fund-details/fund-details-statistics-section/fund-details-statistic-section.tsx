import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import * as React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import {
  FundProfitChartDataType,
  fundProfitChartSelector
} from "../reducers/profit-chart.reducer";
import FundDetailsChart from "./fund-details-chart-section/fund-details-chart";
import FundDetailsStatistics from "./fund-details-statistics/fund-details-statistics";

const _FundDetailsStatisticSection: React.FC<Props> = ({
  id,
  globalCurrency,
  profitChart
}) => {
  const [period, setPeriod] = useState<ChartDefaultPeriod>(DEFAULT_PERIOD);
  const [statisticCurrency, setStatisticCurrency] = useState(globalCurrency);
  return (
    <div className="details-statistic-section">
      <div className="details-statistic-section__statistic">
        <FundDetailsStatistics
          statisticCurrency={statisticCurrency}
          condition={!!profitChart}
          statistic={profitChart && profitChart[0]}
          period={period}
        />
      </div>
      <div className="details-statistic-section__chart">
        <FundDetailsChart
          setStatisticCurrency={setStatisticCurrency}
          id={id}
          period={period}
          onPeriodChange={setPeriod}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  globalCurrency: currencySelector(state),
  profitChart: fundProfitChartSelector(state)
});

interface StateProps {
  globalCurrency: CurrencyEnum;
  profitChart?: FundProfitChartDataType;
}

interface OwnProps {
  id: string;
}

interface Props extends OwnProps, StateProps {}

const FundDetailsStatisticSection = compose<React.ComponentType<OwnProps>>(
  connect(mapStateToProps),
  React.memo
)(_FundDetailsStatisticSection);
export default FundDetailsStatisticSection;
