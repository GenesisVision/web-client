import React from "react";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";
import EmailPendingPage from "shared/components/auth/forgot-password/email-pending/email-pending.page";
import { Push } from "shared/components/link/link";
import { normalizeUrlString } from "shared/components/link/link.helper";
import withAuthLayout from "shared/decorators/with-auth-layout";
import { HOME_ROUTE, SIGNUP_ROUTE } from "shared/routes/app.routes";
import { PROGRAMS_ROUTE } from "shared/routes/programs.routes";
import { NextPageWithRedux } from "shared/utils/types";

const Page: NextPageWithRedux<any> = () => {
  return <EmailPendingPage />;
};

Page.getInitialProps = async ctx => {
  const { email } = ctx.reduxStore.getState().emailPending;
  if (ctx.req && ctx.res && email.length === 0) {
    ctx.res.writeHead(302, { Location: normalizeUrlString(PROGRAMS_ROUTE) });
    ctx.res.end();
    return;
  }

  if (email.length === 0) {
    Push(HOME_ROUTE);
    return;
  }
};

export const EmailPending = withAuthLayout({
  titleKey: "auth.password-restore.title",
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter
})(Page);
