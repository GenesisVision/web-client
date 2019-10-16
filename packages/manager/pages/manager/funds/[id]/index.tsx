import FundDetailsPage from "pages/funds/fund-details/fund-details.page";
import React from "react";
import { compose } from "redux";
import { statisticCurrencyAction } from "shared/components/funds/fund-details/actions/fund-details.actions";
import {
  dispatchFundDescription,
  dispatchFundId
} from "shared/components/funds/fund-details/services/fund-details.service";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { NextPageWithRedux } from "shared/utils/types";

const FundDetails: NextPageWithRedux<{}> = () => {
  return <FundDetailsPage />;
};

FundDetails.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const {
    accountSettings: { currency }
  } = ctx.reduxStore.getState();
  await Promise.all([
    ctx.reduxStore.dispatch(dispatch =>
      dispatch(statisticCurrencyAction(currency))
    ),
    ctx.reduxStore.dispatch(dispatchFundId(id as string)),
    ctx.reduxStore.dispatch(dispatchFundDescription(ctx))
  ]);
  return {};
};

export default compose(withDefaultLayout)(FundDetails);
