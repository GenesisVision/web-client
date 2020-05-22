import GVButton from "components/gv-button";
import Link from "components/link/link";
import React from "react";
import { useTranslation } from "react-i18next";

const _SignUpFooter: React.FC<Props> = ({ ROUTE }) => {
  const [t] = useTranslation();
  return (
    <>
      <span>{t("auth.signup.footer-text")}</span>
      <Link to={ROUTE}>
        <GVButton variant="outlined" color="secondary">
          {t("auth.login.title")}
        </GVButton>
      </Link>
    </>
  );
};

interface Props {
  ROUTE: string;
}

const SignUpFooter = React.memo(_SignUpFooter);
export default SignUpFooter;
