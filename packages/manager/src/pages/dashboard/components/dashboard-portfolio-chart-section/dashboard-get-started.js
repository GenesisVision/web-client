import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { WALLET_PAGE_ROUTE } from "shared/components/wallet/wallet-page";

const DashboardGetStarted = ({ t }) => {
  return (
    <div className="get-started">
      <div className="get-started__title">
        {t("dashboard.get-started.title")}
      </div>
      <div className="get-started__text">
        <div>{t("dashboard.get-started.text-1")}</div>
        <div>{t("dashboard.get-started.text-2")}</div>
      </div>
      <div className="get-started__deposit">
        <Link to={WALLET_PAGE_ROUTE}>
          <GVButton
            id="signUpFormSubmit"
            className="invest-form__submit-button"
          >
            {t("dashboard.get-started.deposit")}
          </GVButton>
        </Link>
      </div>
    </div>
  );
};

export default translate()(DashboardGetStarted);
