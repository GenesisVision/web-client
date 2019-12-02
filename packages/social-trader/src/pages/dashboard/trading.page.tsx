import Page from "components/page/page";
import DashboardFollowThem from "pages/dashboard/components/dashboard-trading/dashboard-follow-them";
import DashboardPrivate from "pages/dashboard/components/dashboard-trading/dashboard-pirvate";
import DashboardPublic from "pages/dashboard/components/dashboard-trading/dashboard-public";
import DashboardTradingTotalContainer from "pages/dashboard/components/dashboard-trading/dashboard-trading-total.container";
import { TitleContext } from "pages/dashboard/dashboard.constants";
import React from "react";
import { useTranslation } from "react-i18next";

const _TradingPage: React.FC = () => {
  const [t] = useTranslation();
  const title = t(`dashboard-page.trading.title`);
  return (
    <TitleContext.Provider value={title}>
      <Page title={title}>
        <div>
          <DashboardTradingTotalContainer />
        </div>
        <div>
          <DashboardPublic />
        </div>
        <div>
          <DashboardPrivate />
        </div>
        <div>{/*<DashboardFollowThem />*/}</div>
      </Page>
    </TitleContext.Provider>
  );
};

const TradingPage = React.memo(_TradingPage);
export default TradingPage;
