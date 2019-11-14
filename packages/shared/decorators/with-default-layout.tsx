import { Currency, PlatformInfo } from "gv-api-web";
import { ErrorViewModel } from "gv-api-web";
import { NextPage } from "next";
import React, { Component } from "react";
import { Dispatch } from "redux";
import platformActions from "shared/actions/platform-actions";
import AppLayout from "shared/components/app-layout/app-layout";
import ServerErrorPage from "shared/components/server-error-page/server-error-page";
import { ACCOUNT_CURRENCY_KEY } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";
import { updateCurrency } from "shared/modules/currency-select/services/currency-select.service";
import { getCookie } from "shared/utils/cookie";
import { NextPageWithReduxContext } from "shared/utils/types";

const withDefaultLayout = (WrappedComponent: NextPage<any>) =>
  class extends Component<{
    info: PlatformInfo;
    ex: ErrorViewModel;
  }> {
    static async getInitialProps(ctx: NextPageWithReduxContext) {
      let componentProps = {};
      try {
        componentProps =
          WrappedComponent.getInitialProps &&
          (await WrappedComponent.getInitialProps(ctx));
      } catch (ex) {
        componentProps = { ex };
      }
      await ctx.reduxStore.dispatch(async (dispatch: Dispatch) => {
        await dispatch(platformActions.fetchPlatformSettings());
      });
      const currencyFromCookie = getCookie(ACCOUNT_CURRENCY_KEY, ctx);
      if (currencyFromCookie) {
        ctx.reduxStore.dispatch(updateCurrency(currencyFromCookie as Currency));
      }

      return {
        namespacesRequired: ["translation"],
        ...componentProps
      };
    }
    render() {
      const { ex, ...others } = this.props;
      return (
        <AppLayout>
          {ex ? <ServerErrorPage ex={ex} /> : <WrappedComponent {...others} />}
        </AppLayout>
      );
    }
  };

export default withDefaultLayout;
