import { DefaultTableBlock } from "components/default.block/default-table.block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import Page from "components/page/page";
import PortfolioEventsTableModule from "components/portfolio-events-table/portfolio-events-table-module";
import { PORTFOLIO_EVENTS_COLUMNS } from "components/portfolio-events-table/portfolio-events-table.constants";
import useTab from "hooks/tab.hook";
import { EVENT_LOCATION } from "pages/invest/programs/program-details/service/program-details.service";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { assetTypeValuesSelector } from "reducers/platform-reducer";

import {
  fetchInvestmentHistory,
  fetchTradingHistory
} from "../../services/dashboard.service";

enum TABS {
  INVESTMENT_HISTORY = "Investment history",
  TRADING_HISTORY = "Trading history"
}

const _PortfolioEventsAllComponent: React.FC = () => {
  const { tab, setTab } = useTab<TABS>(TABS.INVESTMENT_HISTORY);
  const [t] = useTranslation();
  const assetTypeValues = useSelector(assetTypeValuesSelector);
  return (
    <Page title={t(`dashboard-page.portfolio-events.title`)}>
      <DefaultTableBlock>
        <DetailsBlockTabs value={tab} onChange={setTab}>
          <GVTab
            value={TABS.INVESTMENT_HISTORY}
            label={t(`dashboard-page.portfolio-events.investment-history`)}
          />
          <GVTab
            value={TABS.TRADING_HISTORY}
            label={t(`dashboard-page.portfolio-events.trading-history`)}
          />
        </DetailsBlockTabs>
        {tab === TABS.INVESTMENT_HISTORY && (
          <PortfolioEventsTableModule
            assetTypeValues={assetTypeValues.filter(
              ({ value }) => value.toLowerCase() !== "follow"
            )}
            historyType={"investmentHistory"}
            columns={PORTFOLIO_EVENTS_COLUMNS}
            getItems={fetchInvestmentHistory}
            eventLocation={EVENT_LOCATION.Dashboard}
            className="portfolio-events-all-table"
            dateRangeStartLabel={t("filters.date-range.account-creation")}
          />
        )}
        {tab === TABS.TRADING_HISTORY && (
          <PortfolioEventsTableModule
            assetTypeValues={assetTypeValues}
            historyType={"tradingHistory"}
            columns={PORTFOLIO_EVENTS_COLUMNS}
            getItems={fetchTradingHistory}
            eventLocation={EVENT_LOCATION.Dashboard}
            className="portfolio-events-all-table"
            dateRangeStartLabel={t("filters.date-range.account-creation")}
          />
        )}
      </DefaultTableBlock>
    </Page>
  );
};

const PortfolioEventsAllComponent = React.memo(_PortfolioEventsAllComponent);
export default PortfolioEventsAllComponent;
