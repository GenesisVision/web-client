import SignUpFooter from "components/auth/components/signup-footer/signup-footer";
import { REFERRAL_CODE } from "components/auth/signup/signup.constants";
import SignUpPage from "components/auth/signup/signup.page";
import withAuthLayout from "decorators/with-auth-layout";
import cookie from "js-cookie";
import { NextPage, NextPageContext } from "next";
import nextCookie from "next-cookies";
import React from "react";
import { LOGIN_ROUTE } from "routes/app.routes";

const Page: NextPage<Props> = ({ referralCode }) => {
  return <SignUpPage referralCode={referralCode} />;
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  const referralCode = ctx.req
    ? nextCookie(ctx)[REFERRAL_CODE]
    : cookie.get(REFERRAL_CODE);

  return { referralCode };
};

export default withAuthLayout({
  footerAuthRoute: LOGIN_ROUTE,
  Footer: SignUpFooter,
  titleKey: "auth.signup.title"
})(Page);

interface Props {
  referralCode?: string;
}
