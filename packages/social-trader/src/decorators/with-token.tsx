import { AppType } from "next/dist/next-server/lib/utils";
import React, { Component } from "react";
import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";
import { AppWithReduxContext, NextPageWithReduxContext } from "utils/types";

const withToken = (WrappedComponent: AppType | any) => {
  return class extends Component {
    static async getInitialProps(ctx: AppWithReduxContext) {
      const token = Token.create((ctx as unknown) as NextPageWithReduxContext);

      if (token.isExpiring()) {
        try {
          const newToken = await api.auth(token).updateAuthToken();
          token.restore(newToken);
        } catch (e) {
          token.restore("");
        }
      }

      const isTokenExist = token.isExist();

      ctx.token = token;

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return {
        ...componentProps,
        isTokenExist
      };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withToken;
