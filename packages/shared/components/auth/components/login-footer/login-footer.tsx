import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { Link } from "react-router-dom";
import GVButton from "shared/components/gv-button";

const LoginFooter: React.FC<ILoginFooterProps & WithTranslation> = ({
  t,
  ROUTE
}) => (
  <>
    <span>{t("auth.login.footer-text")}</span>
    <Link to={ROUTE} className="auth-footer__desc">
      <GVButton color="secondary" variant="outlined">
        {t("auth.signup.title")}
      </GVButton>
    </Link>
  </>
);

export interface ILoginFooterProps {
  ROUTE: string;
}

export default translate()(React.memo(LoginFooter));
