import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import AuthLayout from "shared/components/auth/components/auth-layout/auth-layout";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";
import ForgotPasswordPage from "shared/components/auth/forgot-password/forgot-password/forgot-password.page";
import { HOME_ROUTE, SIGNUP_ROUTE } from "shared/routes/app.routes";

const ForgotPassword: NextPage<Props> = ({ quoteNo }) => {
  const [t] = useTranslation();
  return (
    <AuthLayout
      Footer={LoginFooter}
      title={t("auth.password-restore.title")}
      SIGNUP_ROUTE={SIGNUP_ROUTE}
      quoteNo={quoteNo}
    >
      <ForgotPasswordPage />
    </AuthLayout>
  );
};

ForgotPassword.getInitialProps = async () => {
  const QUOTES_COUNT = 5;
  const quoteNo = Math.floor(Math.random() * QUOTES_COUNT + 1);
  return {
    quoteNo,
    redirectFrom: HOME_ROUTE,
    namespacesRequired: ["translation"]
  };
};

interface Props {
  quoteNo: number;
  redirectFrom: string;
}

export default ForgotPassword;
