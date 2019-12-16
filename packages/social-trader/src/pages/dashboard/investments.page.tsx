import "./dashboard.scss";

import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "components/details/details-block";
import Page from "components/page/page";
import PublicSelect from "components/profile/settings/public-select/public-select";
import DashboardInvestingFunds from "pages/dashboard/components/dashboard-investing/dashboard-funds";
import DashboardInvestingTotalContainer from "pages/dashboard/components/dashboard-investing/dashboard-investing-total.container";
import DashboardInvestingMostProfitable from "pages/dashboard/components/dashboard-investing/dashboard-most-profitable";
import DashboardInvestingPrograms from "pages/dashboard/components/dashboard-investing/dashboard-programs";
import { PublicPageLink } from "pages/dashboard/components/dashboard-investing/public-page-link";
import { TitleContext } from "pages/dashboard/dashboard.constants";
import React from "react";
import { useTranslation } from "react-i18next";

const _InvestmentsPage: React.FC = () => {
  const [t] = useTranslation();
  const title = t(`dashboard-page.investing.title`);
  return (
    <TitleContext.Provider value={title}>
      <Page title={title}>
        <div>
          <DashboardInvestingTotalContainer />
        </div>
        <div>
          <DetailsBlock type={DETAILS_BLOCK_TYPE.TRANSPARENT}>
            <div className="dashboard__public-page-block">
              <PublicSelect />
              <PublicPageLink />
            </div>
          </DetailsBlock>
        </div>
        <div>
          <DashboardInvestingFunds />
        </div>
        <div>
          <DashboardInvestingPrograms />
        </div>
        <div>
          <DashboardInvestingMostProfitable />
        </div>
      </Page>
    </TitleContext.Provider>
  );
};

const InvestmentsPage = React.memo(_InvestmentsPage);
export default InvestmentsPage;
