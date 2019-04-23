import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";
import { ROLE_ENV } from "shared/constants/constants";

const DashboardGetStarted = ({ t }) => {
  return (
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
  );
};

export default translate()(DashboardGetStarted);
