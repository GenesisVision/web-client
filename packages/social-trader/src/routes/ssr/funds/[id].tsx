import withDefaultLayout from "decorators/with-default-layout";
import { ACCOUNT_CURRENCY_KEY } from "middlewares/update-account-settings-middleware/update-account-settings-middleware";
import { statisticCurrencyAction } from "pages/funds/fund-details/actions/fund-details.actions";
import {
  dispatchFundDescription,
  dispatchFundId
} from "pages/funds/fund-details/services/fund-details.service";
import React from "react";
import { compose } from "redux";
import { getCookie } from "utils/cookie";
import { CurrencyEnum, NextPageWithRedux } from "utils/types";

export const fundDetailsCreator = (Component: React.ComponentType) => {
  const Page: NextPageWithRedux<{}> = () => {
    return <Component />;
  };

  Page.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const {
      accountSettings: { currency }
    } = ctx.reduxStore.getState();
    const cookiesCurrency = getCookie(
      ACCOUNT_CURRENCY_KEY,
      ctx
    ) as CurrencyEnum;
    await Promise.all([
      ctx.reduxStore.dispatch(dispatch =>
        dispatch(statisticCurrencyAction(cookiesCurrency || currency))
      ),
      ctx.reduxStore.dispatch(dispatchFundId(id as string)),
      ctx.reduxStore.dispatch(dispatchFundDescription(ctx))
    ]);
    return {};
  };
  return compose(withDefaultLayout)(Page);
};
