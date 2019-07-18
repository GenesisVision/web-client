import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import AuthLayout from "shared/components/auth/components/auth-layout/auth-layout";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";
import LoginPage from "shared/components/auth/signin/login/login.page";
import { HOME_ROUTE, SIGNUP_ROUTE } from "shared/routes/app.routes";

const Login: NextPage<Props> = ({ quoteNo, redirectFrom }) => {
  const [t] = useTranslation();
  return (
    <AuthLayout
      Footer={LoginFooter}
      title={t("auth.login.title")}
      SIGNUP_ROUTE={SIGNUP_ROUTE}
      quoteNo={quoteNo}
    >
      <LoginPage redirectFrom={redirectFrom} />
    </AuthLayout>
  );
};

Login.getInitialProps = async () => {
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

export default Login;
