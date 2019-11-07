import "shared/components/dashboard/dashboard.scss";

import DashboardFollowThem from "pages/dashboard/components/dashboard-trading/dashboard-follow-them";
import DashboardPrivate from "pages/dashboard/components/dashboard-trading/dashboard-pirvate";
import DashboardPublic from "pages/dashboard/components/dashboard-trading/dashboard-public";
import DashboardTradingTotalContainer from "pages/dashboard/components/dashboard-trading/dashboard-trading-total.container";
import React from "react";
import { useTranslation } from "react-i18next";
import Page from "shared/components/page/page";

const _TradingPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page title={t(`social-trader.dashboard-page.title`)}>
      <div>
        <DashboardTradingTotalContainer />
      </div>
      <div>
        <DashboardPublic />
      </div>
      <div>{/*<DashboardPrivate />*/}</div>
      <div>{/*<DashboardFollowThem />*/}</div>
    </Page>
  );
};

const TradingPage = React.memo(_TradingPage);
export default TradingPage;
