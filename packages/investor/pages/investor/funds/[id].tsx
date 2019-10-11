import FundDetailsPage from "pages/funds/fund-details/fund-details.page";
import React from "react";
import { compose } from "redux";
import {
  dispatchFundDescription,
  dispatchFundId
} from "shared/components/funds/fund-details/services/fund-details.service";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { CurrencyEnum, NextPageWithRedux } from "shared/utils/types";
import { statisticCurrencyAction } from "shared/components/funds/fund-details/actions/fund-details.actions";
import { getCookie } from "shared/utils/cookie";
import { ACCOUNT_CURRENCY_KEY } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";

const FundDetails: NextPageWithRedux<{}, {}> = () => {
  return <FundDetailsPage />;
};

FundDetails.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatch =>
      dispatch(statisticCurrencyAction(getCookie(ACCOUNT_CURRENCY_KEY, ctx)! as CurrencyEnum))
    ),
    ctx.reduxStore.dispatch(dispatchFundId(id as string)),
    ctx.reduxStore.dispatch(dispatchFundDescription(ctx))
  ]);
  return {};
};

export default compose(withDefaultLayout)(FundDetails);
