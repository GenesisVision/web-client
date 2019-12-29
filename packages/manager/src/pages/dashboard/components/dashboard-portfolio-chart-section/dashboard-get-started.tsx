import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import GVButton from "shared/components/gv-button";
import Surface from "shared/components/surface/surface";
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";
import useRole from "shared/hooks/use-role.hook";

const _DashboardGetStarted: React.FC = () => {
  const [t] = useTranslation();
  const role = useRole();
  return (
    <Surface className="dashboard-portfolio-chart-section">
      <div className="get-started">
        <h1>
          {t(`${role ? `${role}.` : ""}dashboard-page.get-started.title`)}
        </h1>
        <div className="get-started__text">
          <div>
            {t(`${role ? `${role}.` : ""}dashboard-page.get-started.text-1`)}
          </div>
          <div>
            {t(`${role ? `${role}.` : ""}dashboard-page.get-started.text-2`)}
          </div>
        </div>
        <div className="get-started__deposit">
          <Link to={WALLET_TOTAL_PAGE_ROUTE}>
            <GVButton
              id="signUpFormSubmit"
              className="invest-form__submit-button"
            >
              {t(`${role ? `${role}.` : ""}dashboard-page.get-started.deposit`)}
            </GVButton>
          </Link>
        </div>
      </div>
    </Surface>
  );
};

const DashboardGetStarted = React.memo(_DashboardGetStarted);
export default DashboardGetStarted;
