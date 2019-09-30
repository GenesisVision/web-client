import cookie from "js-cookie";
import { NextPage, NextPageContext } from "next";
import nextCookie from "next-cookies";
import React from "react";
import SignUpFooter from "shared/components/auth/components/signup-footer/signup-footer";
import { REFERRAL_CODE } from "shared/components/auth/signup/signup.constants";
import SignUpPage from "shared/components/auth/signup/signup.page";
import withAuthLayout from "shared/decorators/with-auth-layout";
import { LOGIN_ROUTE } from "shared/routes/app.routes";

const SignUp: NextPage<Props> = ({ referralCode }) => {
  return <SignUpPage referralCode={referralCode} />;
};

SignUp.getInitialProps = async (ctx: NextPageContext) => {
  const referralCode = ctx.req
    ? nextCookie(ctx)[REFERRAL_CODE]
    : cookie.get(REFERRAL_CODE);

  return { referralCode };
};

export default withAuthLayout({
  footerAuthRoute: LOGIN_ROUTE,
  Footer: SignUpFooter,
  titleKey: "auth.signup.title"
})(SignUp);

interface Props {
  referralCode?: string;
}
