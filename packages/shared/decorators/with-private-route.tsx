import { NextPage, NextPageContext } from "next";
import nextCookie from "next-cookies";
import Router from "next/router";
import React, { Component } from "react";
import { LOGIN_ROUTE } from "shared/routes/app.routes";
import { getTokenName } from "shared/utils/get-token-name";

const withPrivateRoute = (WrappedComponent: NextPage<any>): any =>
  class extends Component {
    static async getInitialProps(ctx: NextPageContext) {
      const tokenName = getTokenName();
      const token = nextCookie(ctx)[tokenName];
      if (ctx.res && !token) {
        ctx.res.writeHead(302, { Location: LOGIN_ROUTE });
        ctx.res.end();
        return;
      }

      if (!token) {
        Router.push(LOGIN_ROUTE);
      }

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withPrivateRoute;
