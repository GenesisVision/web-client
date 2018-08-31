import "./login-footer.scss";

import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

import { SIGNUP_ROUTE } from "../../signup/signup.routes";

const LoginFooter = ({ t }) => (
  <div className="login-footer">
    <span>{t("auth.login.footer-text")}</span>
    <Link to={SIGNUP_ROUTE} className="auth-footer__desc">
      <GVButton color="secondary" variant="outlined">
        {t("auth.signup.title")}
      </GVButton>
    </Link>
  </div>
);

export default translate()(LoginFooter);
