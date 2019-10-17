import React from "react";
import { compose } from "redux";
import { statisticCurrencyAction } from "shared/components/funds/fund-details/actions/fund-details.actions";
import {
  dispatchFundDescription,
  dispatchFundId
} from "shared/components/funds/fund-details/services/fund-details.service";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { NextPageWithRedux } from "shared/utils/types";

export const fundDetailsCreator = (Component: React.ComponentType) => {
  const Page: NextPageWithRedux<{}> = () => {
    return <Component />;
  };

  Page.getInitialProps = async ctx => {
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
  return compose(withDefaultLayout)(Page);
};
