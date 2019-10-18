import React from "react";
import { compose } from "redux";
import { statisticCurrencyAction } from "shared/components/funds/fund-details/actions/fund-details.actions";
import {
  dispatchFundDescription,
  dispatchFundId
} from "shared/components/funds/fund-details/services/fund-details.service";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { CurrencyEnum, NextPageWithRedux } from "shared/utils/types";
import { getCookie } from "shared/utils/cookie";
import { ACCOUNT_CURRENCY_KEY } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";

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
