import { GVButton } from "gv-react-components";
import { SIGNUP_ROUTE } from "pages/signup/signup.routes";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

const ForgotPasswordFooter = ({ t }) => (
  <div className="forgot-password-footer">
    <span className="forgot-password-footer__desc">
      {t("auth.login.footer-text")}
    </span>
    <Link to={SIGNUP_ROUTE}>
      <GVButton variant="outlined" color="secondary">
        {t("auth.signup.title")}
      </GVButton>
    </Link>
  </div>
);

export default translate()(ForgotPasswordFooter);
