import { NextPage } from "next";
import React from "react";
import SignUpFooter from "shared/components/auth/components/signup-footer/signup-footer";
import SignUpPage from "shared/components/auth/signup/signup.page";
import withAuthLayout from "shared/decorators/with-auth-layout";
import { LOGIN_ROUTE } from "shared/routes/app.routes";

const SignUp: NextPage = () => {
  return <SignUpPage />;
};

export default withAuthLayout({
  footerAuthRoute: LOGIN_ROUTE,
  Footer: SignUpFooter,
  titleKey: "auth.signup.title"
})(SignUp);
