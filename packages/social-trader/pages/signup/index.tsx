import withAuthLayout from "decorators/with-auth-layout";
import withReduxStore from "decorators/with-redux-store";
import { NextPage } from "next";
import SignUpFooter from "pages/auth/components/signup-footer/signup-footer";
import SignUpPage from "pages/auth/signup/signup.page";
import { getRefCode, getReferrer, getUtm } from "pages/landing-page/utils";
import React from "react";
import { compose } from "redux";
import { LOGIN_ROUTE } from "routes/app.routes";
import { initializeStore } from "store";

const Page: NextPage<Props> = ({ referralCode, utmSource, referrer }) => {
  return (
    <SignUpPage
      referralCode={referralCode}
      utmSource={utmSource}
      referrer={referrer}
    />
  );
};

Page.getInitialProps = async () => {
  const referralCode = getRefCode();
  const utmSource = getUtm();
  const referrer = getReferrer();

  return { namespacesRequired: ["auth"], referralCode, utmSource, referrer };
};

export default compose(
  withReduxStore(initializeStore),
  withAuthLayout({
    footerAuthRoute: LOGIN_ROUTE,
    Footer: SignUpFooter,
    titleKey: "auth:signup.title"
  })
)(Page);

interface Props {
  referrer?: string;
  referralCode?: string;
  utmSource?: string;
}
