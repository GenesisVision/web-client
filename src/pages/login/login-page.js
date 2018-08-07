import "./login.scss";

import { GVButton, GVTab, GVTabs } from "gv-react-components";
import LoginContainer from "modules/login/components/login-container/login-container";
import { HOME_ROUTE } from "pages/root.routes";
import { REGISTER_ROUTE } from "pages/signup/signup";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

const LoginPage = ({ t, location }) => {
  const { from } = location.state || { from: { pathname: HOME_ROUTE } };
  return (
    <Fragment>
      <div className="login__header">
        <h1>{t("login-page.header")}</h1>
        <GVTabs value={"investor"}>
          <GVTab value={"investor"} label={t("login-page.tabs.investor")} />
          <GVTab
            value={"manager"}
            label={
              <a href={process.env.REACT_APP_MANAGER_PORTAL_URL}>
                {t("login-page.tabs.manager")}
              </a>
            }
          />
        </GVTabs>
      </div>

      <LoginContainer from={from} />

      <div className="sign-up">
        <Link to={REGISTER_ROUTE} className="sign-up__desc">
          {t("login-page.signup.text")}
        </Link>
      </div>
    </Fragment>
  );
};

export default translate()(LoginPage);
