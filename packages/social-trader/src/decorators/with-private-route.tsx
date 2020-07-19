import { getHeader } from "components/header/services/header.service";
import { Push } from "components/link/link";
import { normalizeUrlString } from "components/link/link.helper";
import { NextPage } from "next";
import qs from "qs";
import React, { Component } from "react";
import { HOME_ROUTE, LOGIN_ROUTE } from "routes/app.routes";
import Token from "services/api-client/token";
import { getToken } from "services/auth-service";
import { NextPageWithTokenContext } from "utils/types";

const withPrivateRoute = (WrappedComponent: NextPage<any>): any =>
  class extends Component {
    static async getInitialProps(ctx: NextPageWithTokenContext) {
      const token = getToken(ctx);
      const tokenObject = Token.create(ctx);
      const isValidToken = await getHeader(tokenObject)
        .then(() => true)
        .catch(() => false);

      if (ctx.req && ctx.res && (!token || !isValidToken)) {
        const clearToken = !isValidToken;
        const params = {
          from: ctx.req.url || HOME_ROUTE,
          clearToken: clearToken ? true : undefined
        };
        const redirectUrl = `${LOGIN_ROUTE}?${qs.stringify(params)}`;
        ctx.res.writeHead(302, { Location: normalizeUrlString(redirectUrl) });
        ctx.res.end();
        return;
      }

      if (!token || !isValidToken) {
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
