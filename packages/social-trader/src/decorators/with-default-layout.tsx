import platformActions from "actions/platform-actions";
import AppLayout from "components/app-layout/app-layout";
import ServerErrorPage from "components/server-error-page/server-error-page";
import { Currency, PlatformInfo } from "gv-api-web";
import { ErrorViewModel } from "gv-api-web";
import { ACCOUNT_CURRENCY_KEY } from "middlewares/update-account-settings-middleware/update-account-settings-middleware";
import { updateCurrency } from "modules/currency-select/services/currency-select.service";
import { NextPage } from "next";
import React, { Component } from "react";
import { Dispatch } from "redux";
import { getCookie } from "shared/utils/cookie";
import { NextPageWithReduxContext } from "utils/types";

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
      try {
        await ctx.reduxStore.dispatch(async (dispatch: Dispatch) => {
          await dispatch(platformActions.fetchPlatformSettings());
        });
      } catch (e) {
        componentProps = { e };
      }
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
