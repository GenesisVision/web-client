import { NextPage, NextPageContext } from "next";
import React from "react";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";
import LoginPage from "shared/components/auth/signin/login/login.page";
import withAuthLayout from "shared/decorators/with-auth-layout";
import { HOME_ROUTE, SIGNUP_ROUTE } from "shared/routes/app.routes";

const Login: NextPage<Props> = ({ redirectFrom }) => {
  return <LoginPage redirectFrom={redirectFrom} />;
};

Login.getInitialProps = async (ctx: NextPageContext) => {
  let redirectFrom = HOME_ROUTE;
  if (ctx.req) {
    let t = 1;
  }
  debugger;
  if (!ctx.req && window.history.state.from) {
    console.log(window.history.state);
    redirectFrom = window.history.state.from;
  }
  console.log(ctx);

  return {
    redirectFrom
  };
};

interface Props {
  redirectFrom: string;
}

export default withAuthLayout({
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter,
  titleKey: "auth.login.title"
})(Login);
