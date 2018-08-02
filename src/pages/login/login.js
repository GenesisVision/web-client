import "./login.scss";

import GvBrand from "components/gv-brand/gv-brand";
import GvLogo from "components/gv-logo/gv-logo";
import Page from "components/page/page";
import { GVButton, GVTab, GVTabs } from "gv-react-components";
import LoginRoutes from "pages/login/login.routes";
import React from "react";
import { translate } from "react-i18next";

const Login = ({ t }) => {
  return (
    <Page className={"login"} title={"Login"}>
      <div className="login__left">
        <div className="login__logo">
          <GvLogo />
          <GvBrand />
        </div>
        <h2 className="login__description">{t("login-page.desc")}</h2>
      </div>
      <div className="login__right">
        <div className="login__content">
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

          <LoginRoutes />

          <div className="sign-up">
            <span className="sign-up__desc">{t("login-page.signup.desc")}</span>
            <GVButton variant="outlined" color="secondary">
              {t("login-page.signup.title")}
            </GVButton>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default translate()(Login);
