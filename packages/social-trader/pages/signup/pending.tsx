import withAuthLayout from "decorators/with-auth-layout";
import withReduxStore from "decorators/with-redux-store";
import { useEmailPendingState } from "pages/auth/auth.service";
import SignUpFooter from "pages/auth/components/signup-footer/signup-footer";
import EmailPending from "pages/auth/signup/signup-email-pending/signup-email-pending.page";
import React from "react";
import { compose } from "redux";
import { LOGIN_ROUTE } from "routes/app.routes";
import { redirect } from "routes/redirect.helper";
import { initializeStore } from "store";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<any> = () => {
  return <EmailPending />;
};

Page.getInitialProps = async ctx => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getEmailPendingState } = useEmailPendingState(ctx);
  const { email } = getEmailPendingState();
  redirect(ctx, email.length === 0);
  return { namespacesRequired: ["auth"] };
};

export default compose(
  withReduxStore(initializeStore),
  withAuthLayout({
    footerAuthRoute: LOGIN_ROUTE,
    Footer: SignUpFooter,
    titleKey: "auth:signup.title"
  })
)(Page);
