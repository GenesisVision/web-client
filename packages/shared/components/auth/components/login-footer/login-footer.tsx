import { GVButton } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";

const LoginFooter: React.FC<ILoginFooterProps & InjectedTranslateProps> = ({
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

export default React.memo(translate()(LoginFooter));
