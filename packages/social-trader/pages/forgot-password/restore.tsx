import LoginFooter from "components/auth/components/login-footer/login-footer";
import PasswordRestorePage from "components/auth/forgot-password/password-restore/password-restore.page";
import withAuthLayout from "decorators/with-auth-layout";
import { NextPage, NextPageContext } from "next";
import React from "react";
import { SIGNUP_ROUTE } from "routes/app.routes";
import { getParamsFromCtx } from "utils/ssr-helpers";

const Page: NextPage<Props> = ({ userId, code }) => {
  return <PasswordRestorePage userId={userId} code={code} />;
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  const { userId, code } = getParamsFromCtx(ctx);
  return { userId, code };
};

interface Props {
  userId: string;
  code: string;
}

export default withAuthLayout({
  titleKey: "auth.password-restore.title",
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter
})(Page);
