import * as React from "react";
import styled from "styled-components";

import DetailsChart, {
  IDetailsChartProps
} from "./details-chart-section/details-chart";
import DetailsStatisticsContainer, {
  IDetailsStatisticsProps
} from "./details-statistics/details-statistics.container";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
`;

const _DetailsStatisticSection: React.FC<Props> = ({
  renderAbsoluteProfitChart,
  absoluteProfitChartSelector,
  loaderData,
  useChartStateValues,
  balanceChartSelector,
  renderBalanceChart,
  renderProfitChart,
  renderProfitValue,
  profitChartSelector,
  statisticCurrencySelector,
  useChartPeriod,
  renderDetailsStatisticsElements
}) => (
  <Container>
    <DetailsStatisticsContainer
      profitChartSelector={profitChartSelector}
      statisticCurrencySelector={statisticCurrencySelector}
      useChartPeriod={useChartPeriod}
      renderDetailsStatisticsElements={renderDetailsStatisticsElements}
    />
    <DetailsChart
      renderAbsoluteProfitChart={renderAbsoluteProfitChart}
      absoluteProfitChartSelector={absoluteProfitChartSelector}
      loaderData={loaderData}
      useChartStateValues={useChartStateValues}
      useChartPeriod={useChartPeriod}
      balanceChartSelector={balanceChartSelector}
      renderBalanceChart={renderBalanceChart}
      renderProfitChart={renderProfitChart}
      profitChartSelector={profitChartSelector}
      renderProfitValue={renderProfitValue}
    />
  </Container>
);

interface Props extends IDetailsStatisticsProps, IDetailsChartProps {}

const DetailsStatisticSection = React.memo(_DetailsStatisticSection);
export default DetailsStatisticSection;
