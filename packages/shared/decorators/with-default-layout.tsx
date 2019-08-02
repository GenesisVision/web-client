import { AmountWithCurrencyCurrencyEnum, PlatformInfo } from "gv-api-web";
import { NextPage } from "next";
import React, { Component } from "react";
import { Dispatch } from "redux";
import platformActions from "shared/actions/platform-actions";
import AppLayout from "shared/components/app-layout/app-layout";
import { ACCOUNT_CURRENCY_KEY } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";
import { updateCurrency } from "shared/modules/currency-select/services/currency-select.service";
import { getCookie } from "shared/utils/cookie";
import { NextPageWithReduxContext } from "shared/utils/types";

const withDefaultLayout = (WrappedComponent: NextPage<any>) =>
  class extends Component<{
    info: PlatformInfo;
  }> {
    static async getInitialProps(ctx: NextPageWithReduxContext) {
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      await ctx.reduxStore.dispatch(async (dispatch: Dispatch) => {
        await dispatch(platformActions.fetchPlatformSettings());
      });
      const currencyFromCookie = getCookie(ACCOUNT_CURRENCY_KEY, ctx);
      if (currencyFromCookie) {
        ctx.reduxStore.dispatch(
          updateCurrency(currencyFromCookie as AmountWithCurrencyCurrencyEnum)
        );
      }

      return {
        namespacesRequired: ["translation"],
        ...componentProps
      };
    }
    render() {
      return (
        <AppLayout>
          <WrappedComponent {...this.props} />
        </AppLayout>
      );
    }
  };

export default withDefaultLayout;
