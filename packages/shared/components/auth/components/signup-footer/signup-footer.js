import { GVButton } from "gv-react-components";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

const SignUpFooter = ({ t, ROUTE }) => (
  <Fragment>
    <span className="signup-footer__desc">{t("auth.signup.footer-text")}</span>
    <Link to={ROUTE}>
      <GVButton variant="outlined" color="secondary">
        {t("auth.login.title")}
      </GVButton>
    </Link>
  </Fragment>
);

export default translate()(SignUpFooter);
