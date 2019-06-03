import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import GVButton from "shared/components/gv-button";
import Surface from "shared/components/surface/surface";
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";
import { ROLE_ENV } from "shared/constants/constants";

const _DashboardGetStarted: React.FC<InjectedTranslateProps> = ({ t }) => (
  <Surface className="dashboard-portfolio-chart-section">
    <div className="get-started">
      <h1>{t(`${ROLE_ENV}.dashboard-page.get-started.title`)}</h1>
      <div className="get-started__text">
        <div>{t(`${ROLE_ENV}.dashboard-page.get-started.text-1`)}</div>
        <div>{t(`${ROLE_ENV}.dashboard-page.get-started.text-2`)}</div>
      </div>
      <div className="get-started__deposit">
        <Link to={WALLET_TOTAL_PAGE_ROUTE}>
          <GVButton
            id="signUpFormSubmit"
            className="invest-form__submit-button"
          >
            {t(`${ROLE_ENV}.dashboard-page.get-started.deposit`)}
          </GVButton>
        </Link>
      </div>
    </div>
  </Surface>
);

const DashboardGetStarted = React.memo(translate()(_DashboardGetStarted));
export default DashboardGetStarted;
