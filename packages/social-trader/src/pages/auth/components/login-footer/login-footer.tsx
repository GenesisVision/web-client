import { Button } from "components/button/button";
import Link from "components/link/link";
import React from "react";
import { useTranslation } from "react-i18next";

const LoginFooter: React.FC<ILoginFooterProps> = ({ ROUTE }) => {
  const [t] = useTranslation();
  return (
    <>
      <span>{t("auth:login.footer-text")}</span>
      <Link to={ROUTE}>
        <Button color="secondary" variant="outlined">
          {t("auth:signup.title")}
        </Button>
      </Link>
    </>
  );
};

export interface ILoginFooterProps {
  ROUTE: string;
}

export default React.memo(LoginFooter);
