import withDefaultLayout from "decorators/with-default-layout";
import { ACCOUNT_CURRENCY_KEY } from "middlewares/update-account-settings-middleware/update-account-settings-middleware";
import { statisticCurrencyAction } from "pages/funds/fund-details/actions/fund-details.actions";
import FundDetailsPage from "pages/funds/fund-details/fund-details.page";
import {
  dispatchFundDescription,
  dispatchFundId
} from "pages/funds/fund-details/services/fund-details.service";
import React from "react";
import { compose } from "redux";
import { getCookie } from "utils/cookie";
import { CurrencyEnum, NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <FundDetailsPage />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const {
    accountSettings: { currency }
  } = ctx.reduxStore.getState();
  const cookiesCurrency = getCookie(ACCOUNT_CURRENCY_KEY, ctx) as CurrencyEnum;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatch =>
      dispatch(statisticCurrencyAction(cookiesCurrency || currency))
    ),
    ctx.reduxStore.dispatch(dispatchFundId(id as string)),
    ctx.reduxStore.dispatch(
      dispatchFundDescription(ctx, cookiesCurrency || currency)
    )
  ]);
  return {};
};
export default compose(withDefaultLayout)(Page);
