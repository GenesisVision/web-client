import { Button } from "components/button/button";
import Link from "components/link/link";
import React from "react";
import { useTranslation } from "react-i18next";

const _SignUpFooter: React.FC<Props> = ({ ROUTE }) => {
  const [t] = useTranslation();
  return (
    <>
      <span>{t("auth:signup.footer-text")}</span>
      <Link to={ROUTE}>
        <Button variant="outlined" color="secondary">
          {t("auth:login.title")}
        </Button>
      </Link>
    </>
  );
};

interface Props {
  ROUTE: string;
}

const SignUpFooter = React.memo(_SignUpFooter);
export default SignUpFooter;
