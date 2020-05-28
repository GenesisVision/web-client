import GVButton from "components/gv-button";
import Link from "components/link/link";
import React from "react";
import { useTranslation } from "react-i18next";

const LoginFooter: React.FC<ILoginFooterProps> = ({ ROUTE }) => {
  const [t] = useTranslation();
  return (
    <>
      <span>{t("auth.login.footer-text")}</span>
      <Link to={ROUTE}>
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
