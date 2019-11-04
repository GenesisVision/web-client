import "shared/components/dashboard/dashboard.scss";

import React from "react";
import { useTranslation } from "react-i18next";
import Page from "shared/components/page/page";

import DashboardTradingContainer from "./components/dashboard-trading/dashboard-trading.container";

const _TradingPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page title={t(`social-trader.dashboard-page.title`)}>
      <div>
        <DashboardTradingContainer />
      </div>
    </Page>
  );
};

const TradingPage = React.memo(_TradingPage);
export default TradingPage;
