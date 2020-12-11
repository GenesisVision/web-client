import withAuthLayout from "decorators/with-auth-layout";
import withReduxStore from "decorators/with-redux-store";
import { NextPage, NextPageContext } from "next";
import LoginFooter from "pages/auth/components/login-footer/login-footer";
import PasswordRestorePage from "pages/auth/forgot-password/password-restore/password-restore.page";
import React from "react";
import { compose } from "redux";
import { SIGNUP_ROUTE } from "routes/app.routes";
import { initializeStore } from "store";
import { getParamsFromCtx } from "utils/ssr-helpers";

const Page: NextPage<Props> = ({ userId, code }) => {
  return <PasswordRestorePage userId={userId} code={code} />;
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  const { userId, code } = getParamsFromCtx(ctx);
  return { namespacesRequired: ["auth"], userId, code };
};

interface Props {
  userId: string;
  code: string;
}

export default compose(
  withReduxStore(initializeStore),
  withAuthLayout({
    titleKey: "auth:password-restore.title",
    footerAuthRoute: SIGNUP_ROUTE,
    Footer: LoginFooter
  })
)(Page);
