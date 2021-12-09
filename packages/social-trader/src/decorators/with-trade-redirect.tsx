import { AppType, NextPageContext } from "next/dist/next-server/lib/utils";
import qs from "qs";
import { Component } from "react";
import { HOME_ROUTE, LOGIN_ROUTE } from "routes/app.routes";
import { redirect } from "routes/redirect.helper";

export const withTradeRedirect = (WrappedComponent: AppType | any) =>
  class extends Component {
    static async getInitialProps(ctx: NextPageContext) {
      const componentProps =
        WrappedComponent.getInitialProps &&
        // @ts-ignore
        (await WrappedComponent.getInitialProps(ctx));

      const redirectParams = { from: ctx?.req?.url || HOME_ROUTE };

      redirect(
        ctx,
        componentProps.exchangeAccountId &&
          !componentProps.reduxStore.getState().authData.isAuthenticated,
        `${LOGIN_ROUTE}?${qs.stringify(redirectParams)}`
      );

      return { ...componentProps };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
