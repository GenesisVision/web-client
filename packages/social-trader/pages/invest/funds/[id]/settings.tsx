import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { dispatchFundDescription, dispatchFundId } from "pages/invest/funds/fund-details/services/fund-details.service";
import FundSettingsPage from "pages/invest/funds/fund-settings/fund-settings.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<void> = () => {
  return <FundSettingsPage />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const {
    accountSettings: { currency }
  } = ctx.reduxStore.getState();
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchFundId(id as string)),
    ctx.reduxStore.dispatch(dispatchFundDescription(ctx, currency))
  ]).then(([id, description]) => {
    if (description.value.publicInfo.status === "Closed")
      throw "Fund is closed";
  });
};

export default compose(withDefaultLayout, withPrivateRoute)(Page);
