import { DefaultBlock } from "components/default.block/default.block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import DetailsBlockTitleBox from "components/details/details-block-title-box";
import AbsoluteProfitChartSection, {
  IAbsoluteProfitChartSectionProps
} from "components/details/details-statistic-section/details-chart-section/absolute-profit-chart-section/absolute-profit-chart-section";
import { detailsBlockHorizontalPaddings } from "components/details/details.constants";
import GVTab from "components/gv-tabs/gv-tab";
import { Row } from "components/row/row";
import useTab from "hooks/tab.hook";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import { $paddingXsmall } from "utils/style/sizes";

import BalanceChartSection, {
  IBalanceChartSectionProps
} from "./balance-chart-section/balance-chart-section";
import ProfitChartSection, {
  IProfitChartSectionProps
} from "./profit-chart-section/profit-chart-section";

export enum DETAILS_CHART_TABS {
  ABSOLUTE_PROFIT = "absolute-profit",
  PROFIT = "profit",
  BALANCE = "balance"
}

const StyledBlock = styled(DefaultBlock)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100px;
  min-height: 400px;

  margin-bottom: ${$paddingXsmall}px;
  &:not(:last-child) {
    ${mediaBreakpointLandscapePhone(`margin-right: ${$paddingXsmall}px;`)}
  }
`;

const ChartContainer = styled(Row)`
  ${detailsBlockHorizontalPaddings};
  height: 490px;
`;

const _DetailsChart: React.FC<IDetailsChartProps> = ({
  renderAbsoluteProfitChart,
  absoluteProfitChartSelector,
  loaderData,
  useChartStateValues,
  useChartPeriod,
  balanceChartSelector,
  renderBalanceChart,
  renderProfitChart,
  profitChartSelector,
  renderProfitValue
}) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<DETAILS_CHART_TABS>(DETAILS_CHART_TABS.PROFIT);
  return (
    <StyledBlock horizontalOffsets={false} size={"large"} solid>
      <DetailsBlockTitleBox>
        <h3>{t("asset-details:chart.heading")}</h3>
      </DetailsBlockTitleBox>
      <Row>
        <DetailsBlockTabs value={tab} onChange={setTab}>
          <GVTab
            value={DETAILS_CHART_TABS.PROFIT}
            label={t("asset-details:chart.tabs.profit")}
          />
          <GVTab
            value={DETAILS_CHART_TABS.ABSOLUTE_PROFIT}
            label={t("asset-details:chart.tabs.absolute-profit")}
          />
          <GVTab
            value={DETAILS_CHART_TABS.BALANCE}
            label={t("asset-details:chart.tabs.balance")}
          />
        </DetailsBlockTabs>
      </Row>
      <ChartContainer onlyOffset>
        {tab === DETAILS_CHART_TABS.PROFIT && (
          <ProfitChartSection
            loaderData={loaderData}
            renderProfitChart={renderProfitChart}
            profitChartSelector={profitChartSelector}
            renderProfitValue={renderProfitValue}
            useChartStateValues={useChartStateValues}
            useChartPeriod={useChartPeriod}
          />
        )}
        {tab === DETAILS_CHART_TABS.ABSOLUTE_PROFIT && (
          <AbsoluteProfitChartSection
            loaderData={loaderData}
            renderAbsoluteProfitChart={renderAbsoluteProfitChart}
            absoluteProfitChartSelector={absoluteProfitChartSelector}
            renderProfitValue={renderProfitValue}
            useChartStateValues={useChartStateValues}
            useChartPeriod={useChartPeriod}
          />
        )}
        {tab === DETAILS_CHART_TABS.BALANCE && (
          <BalanceChartSection
            useChartStateValues={useChartStateValues}
            useChartPeriod={useChartPeriod}
            balanceChartSelector={balanceChartSelector}
            renderBalanceChart={renderBalanceChart}
          />
        )}
      </ChartContainer>
    </StyledBlock>
  );
};

export interface IDetailsChartProps
  extends IBalanceChartSectionProps,
    IProfitChartSectionProps,
    IAbsoluteProfitChartSectionProps {}

const DetailsChart = React.memo(_DetailsChart);
export default DetailsChart;
