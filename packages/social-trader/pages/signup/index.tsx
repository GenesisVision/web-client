import withAuthLayout from "decorators/with-auth-layout";
import cookie from "js-cookie";
import { NextPage, NextPageContext } from "next";
import nextCookie from "next-cookies";
import SignUpFooter from "pages/auth/components/signup-footer/signup-footer";
import { REFERRAL_CODE } from "pages/auth/signup/signup.constants";
import SignUpPage from "pages/auth/signup/signup.page";
import { getUtm } from "pages/landing-page/utils";
import React from "react";
import { LOGIN_ROUTE } from "routes/app.routes";

const Page: NextPage<Props> = ({ referralCode, utmSource }) => {
  return <SignUpPage referralCode={referralCode} utmSource={utmSource} />;
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  const referralCode = ctx.req
    ? nextCookie(ctx)[REFERRAL_CODE]
    : cookie.get(REFERRAL_CODE);
  const utmSource = getUtm();

  return { referralCode, utmSource };
};

export default withAuthLayout({
  footerAuthRoute: LOGIN_ROUTE,
  Footer: SignUpFooter,
  titleKey: "auth.signup.title"
})(Page);

interface Props {
  referralCode?: string;
  utmSource?: string;
}
