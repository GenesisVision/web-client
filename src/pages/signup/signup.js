import LoginLayout from "components/login-layout/login-layout";
import LoginTabs from "components/login-tabs/login-tabs";
import { GVButton } from "gv-react-components";
import RegisterContainer from "modules/register-form/components/register-container";
import { LOGIN_ROUTE } from "pages/login/login.routes";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

export const REGISTER_ROUTE = "/signup";

const SignupRoutes = ({ t }) => {
  return (
    <LoginLayout>
      <div className="login__header">
        <h1>{t("login-page.signup.title")}</h1>
        <LoginTabs />
      </div>

      <RegisterContainer />

      <div className="sign-up">
        <span className="sign-up__desc">{t("login-page.login.text")}</span>
        <Link to={LOGIN_ROUTE}>
          <GVButton variant="outlined" color="secondary">
            {t("login-page.login.title")}
          </GVButton>
        </Link>
      </div>
    </LoginLayout>
  );
};

export default translate()(SignupRoutes);
