import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { WALLET_PAGE_ROUTE } from "shared/components/wallet/wallet-total-page";

const DashboardGetStarted = ({ t }) => {
  return (
    <div className="get-started">
      <h1>
        {t(
          `${process.env.REACT_APP_PLATFORM}.dashboard-page.get-started.title`
        )}
      </h1>
      <div className="get-started__text">
        <div>
          {t(
            `${
              process.env.REACT_APP_PLATFORM
            }.dashboard-page.get-started.text-1`
          )}
        </div>
        <div>
          {t(
            `${
              process.env.REACT_APP_PLATFORM
            }.dashboard-page.get-started.text-2`
          )}
        </div>
      </div>
      <div className="get-started__deposit">
        <Link to={WALLET_PAGE_ROUTE}>
          <GVButton
            id="signUpFormSubmit"
            className="invest-form__submit-button"
          >
            {t(
              `${
                process.env.REACT_APP_PLATFORM
              }.dashboard-page.get-started.deposit`
            )}
          </GVButton>
        </Link>
      </div>
    </div>
  );
};

export default translate()(DashboardGetStarted);
