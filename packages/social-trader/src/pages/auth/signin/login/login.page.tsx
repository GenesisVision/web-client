import { PageSeoWrapper } from "components/page/page-seo-wrapper";
import React from "react";
import { useTranslation } from "react-i18next";

import SignInContainer from "../signin.container";
import LoginForm from "./login-form";

const _LoginPage: React.FC<Props> = ({ redirectFrom }) => {
  const [t] = useTranslation();
  return (
    <PageSeoWrapper title={t("auth.login.title")}>
      <SignInContainer
        redirectFrom={redirectFrom}
        renderForm={({ handle, errorMessage }) => (
          <LoginForm onSubmit={handle} errorMessage={errorMessage} />
        )}
      />
    </PageSeoWrapper>
  );
};

interface Props {
  redirectFrom: string;
}

const LoginPage = React.memo(_LoginPage);
export default LoginPage;
