import { GVButton } from "gv-react-components";
import { SIGNUP_ROUTE } from "pages/auth/signup/signup.routes";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

const LoginFooter = ({ t }) => (
  <div className="login-footer">
    <span className={"login-footer__desc"}>{t("auth.login.footer-text")}</span>
    <Link to={SIGNUP_ROUTE} className="auth-footer__desc">
      <GVButton color="secondary" variant="outlined">
        {t("auth.signup.title")}
      </GVButton>
    </Link>
  </div>
);

export default translate()(LoginFooter);
