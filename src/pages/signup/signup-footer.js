import { GVButton } from "gv-react-components";
import { LOGIN_ROUTE } from "pages/login/login.routes";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

const signUpFooter = ({ t }) => (
  <div className="signup-footer">
    <span className="auth-footer__desc">{t("auth.signup.footer-text")}</span>
    <Link to={LOGIN_ROUTE}>
      <GVButton variant="outlined" color="secondary">
        {t("auth.login.title")}
      </GVButton>
    </Link>
  </div>
);

export default translate()(signUpFooter);
