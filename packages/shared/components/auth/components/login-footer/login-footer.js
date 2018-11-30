import { GVButton } from "gv-react-components";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

const LoginFooter = ({ t, ROUTE }) => (
  <Fragment>
    <span>{t("auth.login.footer-text")}</span>
    <Link to={ROUTE} className="auth-footer__desc">
      <GVButton color="secondary" variant="outlined">
        {t("auth.signup.title")}
      </GVButton>
    </Link>
  </Fragment>
);

export default translate()(LoginFooter);
