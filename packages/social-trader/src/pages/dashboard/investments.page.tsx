import Page from "components/page/page";
import DashboardInvestingFunds from "pages/dashboard/components/dashboard-investing/dashboard-funds";
import DashboardInvestingCoins from "pages/dashboard/components/dashboard-investing/dashboard-investing-coins";
import { DashboardInvestingContext } from "pages/dashboard/components/dashboard-investing/dashboard-investing-context";
import DashboardInvestingTotalContainer from "pages/dashboard/components/dashboard-investing/dashboard-investing-total.container";
import DashboardInvestingMostProfitableContainer from "pages/dashboard/components/dashboard-investing/dashboard-most-profitable.container";
import DashboardInvestingPrograms from "pages/dashboard/components/dashboard-investing/dashboard-programs";
import React from "react";
import { useTranslation } from "react-i18next";

const _InvestmentsPage: React.FC = () => {
  const [t] = useTranslation();
  const title = t(`dashboard-page:investing.title`);
  return (
    <Page title={title}>
      <DashboardInvestingContext>
        <div>
          <DashboardInvestingTotalContainer />
        </div>
        <div>
          <DashboardInvestingFunds />
        </div>
        <div>
          <DashboardInvestingPrograms />
        </div>
        <div>
          <DashboardInvestingCoins />
        </div>
        <div>
          <DashboardInvestingMostProfitableContainer />
        </div>
      </DashboardInvestingContext>
    </Page>
  );
};

const InvestmentsPage = React.memo(_InvestmentsPage);
export default InvestmentsPage;
