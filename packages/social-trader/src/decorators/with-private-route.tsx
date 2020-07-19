import { Push } from "components/link/link";
import { normalizeUrlString } from "components/link/link.helper";
import { NextPage, NextPageContext } from "next";
import qs from "qs";
import React, { Component } from "react";
import { HOME_ROUTE, LOGIN_ROUTE } from "routes/app.routes";
import { getToken } from "services/auth-service";

const withPrivateRoute = (WrappedComponent: NextPage<any>): any =>
  class extends Component {
    static async getInitialProps(ctx: NextPageContext) {
      const token = getToken(ctx);
      if (ctx.req && ctx.res && !token) {
        const redirectUrl = `${LOGIN_ROUTE}?from=${ctx.req.url || HOME_ROUTE}`;
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
