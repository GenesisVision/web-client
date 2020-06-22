import withAuthLayout from "decorators/with-auth-layout";
import { NextPage } from "next";
import SignUpFooter from "pages/auth/components/signup-footer/signup-footer";
import SignUpPage from "pages/auth/signup/signup.page";
import { getRefCode, getReferrer, getUtm } from "pages/landing-page/utils";
import React from "react";
import { LOGIN_ROUTE } from "routes/app.routes";

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

export default withAuthLayout({
  footerAuthRoute: LOGIN_ROUTE,
  Footer: SignUpFooter,
  titleKey: "auth.signup.title"
})(Page);

interface Props {
  referrer?: string;
  referralCode?: string;
  utmSource?: string;
}
