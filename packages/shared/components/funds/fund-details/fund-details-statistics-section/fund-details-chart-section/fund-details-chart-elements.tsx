import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useTab from "shared/hooks/tab.hook";

import FundBalanceChartSection from "./fund-balance-chart-section/fund-balance-chart-section";
import FundProfitChartSection from "./fund-profit-chart-section/fund-profit-chart-section";

const _FundDetailsChartSection: React.FC<Props> = ({ t }) => {
  const { tab, setTab } = useTab<TABS>(TABS.PROFIT);
  return (
    <>
      <GVTabs value={tab} onChange={setTab}>
        <GVTab
          value={TABS.PROFIT}
          label={t("fund-details-page.chart.tabs.profit")}
        />
        <GVTab
          value={TABS.BALANCE}
          label={t("fund-details-page.chart.tabs.balance")}
        />
      </GVTabs>
      {tab === TABS.PROFIT && <FundProfitChartSection />}
      {tab === TABS.BALANCE && <FundBalanceChartSection />}
    </>
  );
};

enum TABS {
  PROFIT = "profit",
  BALANCE = "balance"
}

interface OwnProps {}

interface Props extends WithTranslation, OwnProps {}

const FundDetailsChartElements = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  React.memo
)(_FundDetailsChartSection);
export default FundDetailsChartElements;
