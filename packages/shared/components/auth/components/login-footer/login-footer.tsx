import React from "react";
import { useTranslation } from "react-i18next";
import GVButton from "shared/components/gv-button";
import Link from "shared/components/link/link";

const LoginFooter: React.FC<ILoginFooterProps> = ({ ROUTE }) => {
  const [t] = useTranslation();
  return (
    <>
      <span>{t("auth.login.footer-text")}</span>
      <Link to={ROUTE} className="auth-footer__desc">
        <GVButton color="secondary" variant="outlined">
          {t("auth.signup.title")}
        </GVButton>
      </Link>
    </>
  );
};

export interface ILoginFooterProps {
  ROUTE: string;
}

export default React.memo(LoginFooter);
