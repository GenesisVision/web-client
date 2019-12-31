import { Push } from "components/link/link";
import { normalizeUrlString } from "components/link/link.helper";
import { NextPage, NextPageContext } from "next";
import nextCookie from "next-cookies";
import qs from "qs";
import React, { Component } from "react";
import { HOME_ROUTE, LOGIN_ROUTE } from "routes/app.routes";
import { getTokenName } from "utils/get-token-name";

const withPrivateRoute = (WrappedComponent: NextPage<any>): any =>
  class extends Component {
    static async getInitialProps(ctx: NextPageContext) {
      const tokenName = getTokenName();
      const token = nextCookie(ctx)[tokenName];
      if (ctx.req && ctx.res && !token) {
        const redirectUrl = `${LOGIN_ROUTE}?from=${qs.stringify(
          ctx.req.url || HOME_ROUTE
        )}`;
        ctx.res.writeHead(302, { Location: normalizeUrlString(redirectUrl) });
        ctx.res.end();
        return;
      }

      if (!token) {
        Push(LOGIN_ROUTE, undefined, { from: ctx.pathname });
        return;
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
