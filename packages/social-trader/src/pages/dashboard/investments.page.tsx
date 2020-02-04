import "./dashboard.scss";

import Page from "components/page/page";
import DashboardInvestingFunds from "pages/dashboard/components/dashboard-investing/dashboard-funds";
import DashboardInvestingTotalContainer from "pages/dashboard/components/dashboard-investing/dashboard-investing-total.container";
import DashboardInvestingMostProfitableContainer from "pages/dashboard/components/dashboard-investing/dashboard-most-profitable.container";
import DashboardInvestingPrograms from "pages/dashboard/components/dashboard-investing/dashboard-programs";
import React from "react";
import { useTranslation } from "react-i18next";

const _InvestmentsPage: React.FC = () => {
  const [t] = useTranslation();
  const title = t(`dashboard-page.investing.title`);
  return (
    <Page title={title}>
      <div>
        <DashboardInvestingTotalContainer />
      </div>
      {/*<div>
        <DetailsBlock type={DETAILS_BLOCK_TYPE.TRANSPARENT}>
          <div className="dashboard__public-page-block">
            <div className="dashboard__public-page-select">
              <PublicSelect />
            </div>
            <PublicPageLink />
          </div>
        </DetailsBlock>
      </div>*/}
      <div>
        <DashboardInvestingFunds />
      </div>
      <div>
        <DashboardInvestingPrograms />
      </div>
      <div>
        <DashboardInvestingMostProfitableContainer />
      </div>
    </Page>
  );
};

const InvestmentsPage = React.memo(_InvestmentsPage);
export default InvestmentsPage;
